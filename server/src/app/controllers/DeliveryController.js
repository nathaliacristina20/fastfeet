import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
  parseISO,
  setHours,
  startOfHour,
  isWithinInterval,
} from 'date-fns';
import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Constants from '../shared/constants';

import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/NewDeliveryMail';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { product, start_date, recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findOne({
      where: {
        id: recipient_id,
        active: 1,
      },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }

    const deliveryman = await Deliveryman.findOne({
      where: {
        id: deliveryman_id,
        active: 1,
      },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }

    if (start_date) {
      const currentDate = new Date();

      if (
        !isWithinInterval(currentDate, {
          start: startOfHour(setHours(currentDate, 8)),
          end: startOfHour(setHours(currentDate, 18)),
        })
      ) {
        return res.status(400).json({ error: 'Only hour comercial.' });
      }
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(NewDeliveryMail.key, {
      product,
      deliveryman: deliveryman.name,
      email: deliveryman.email,
      recipient: recipient.dataValues.name,
      street: recipient.dataValues.street,
      number: recipient.dataValues.number,
      complement: recipient.dataValues.complement,
      city: recipient.dataValues.city,
      state: recipient.dataValues.state,
      zip_code: recipient.dataValues.zip_code,
    });

    return res.json(delivery);
  }

  async index(req, res) {
    const { product, page = 1, perPage = 5 } = req.query;
    let deliveries;

    if (product) {
      deliveries = await Delivery.findAndCountAll({
        where: {
          active: 1,
          product: { [Op.iLike]: `%${product}%` },
        },
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'id',
              'name',
              'street',
              'number',
              'complement',
              'state',
              'city',
              'zip_code',
            ],
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email', 'name_initials'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
              },
            ],
          },
          {
            model: File,
            as: 'signature',
            attributes: ['name', 'path', 'url'],
          },
        ],
        limit: 5,
        offset: (page - 1) * perPage,
        order: [
          ['created_at', 'ASC'],
        ],
      });
    } else {
      deliveries = await Delivery.findAndCountAll({
        where: {
          active: 1,
        },
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'id',
              'name',
              'street',
              'number',
              'complement',
              'state',
              'city',
              'zip_code',
            ],
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email', 'name_initials'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
              },
            ],
          },
          {
            model: File,
            as: 'signature',
            attributes: ['name', 'path', 'url'],
          },
        ],
        limit: 5,
        offset: (page - 1) * perPage,
        order: [
          ['created_at', 'ASC'],
        ],
      });
    }

    res.header('X-Total-Count', deliveries.count);

    return res.json(deliveries.rows);
  }

  async show(req, res) {
    const { page = 1, perPage = 5, status } = req.query;

    const { id } = req.params;

    const deliveryman = await Deliveryman.findOne({ where: { id, active: 1 } });

    if (!deliveryman) {
      return res.status(400).json({ error: ' Deliveryman does not exists.' });
    }

    let where;

    if (status && status === Constants.STATUS.delivered.value) {
      where = {
        deliveryman_id: id,
        end_date: {
          [Op.not]: null,
        },
        active: 1,
      };
    } else {
      where = {
        deliveryman_id: id,
        end_date: null,
        canceled_at: null,
        active: 1,
      };
    }

    const deliveries = await Delivery.findAndCountAll({
      where,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    res.header('X-Total-Count', deliveries.count);
    res.header('X-Pages-Count', Math.ceil(deliveries.count / perPage));

    return res.json(deliveries.rows);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { deliveryman_id, delivery_id } = req.params;

    const deliveryman = await Deliveryman.findOne({
      where: { id: deliveryman_id, active: 1 },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }

    const delivery = await Delivery.findOne({
      where: { id: delivery_id, active: 1 },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists.' });
    }

    const { signature_id, start_date, product } = req.body;

    if (signature_id) {
      const verifySignature = await File.findByPk(signature_id);
      if (!verifySignature) {
        return res.status(400).json({ error: 'File does not exists.' });
      }
    }

    /**
     * Se existe o campo end_date quer dizer que se trata de uma
     * retirada de encomenda, portanto, vamos validar se o entregador
     * já execedeu o limite diário de retirada que são 5 encomendas.
     */
    if (start_date) {
      if (delivery.start_date) {
        return res
          .status(400)
          .json({ error: 'Delivery has already been delivered.' });
      }

      const parsedStart = parseISO(start_date);

      const deliveries = await Delivery.findAll({
        where: {
          start_date: {
            [Op.between]: [startOfDay(parsedStart), endOfDay(parsedStart)],
          },
          deliveryman_id,
          active: 1,
        },
      });

      if (deliveries.length >= 5) {
        return res
          .status(400)
          .json({ error: 'You only take 5 deliveries on the day.' });
      }

      delivery.start_date = req.body.start_date;
    }

    if (signature_id) {
      if (delivery.start_date === null) {
        return res
          .status(400)
          .json({ error: 'The order must be retired before delivery.' });
      }
      if (delivery.end_date) {
        return res
          .status(400)
          .json({ error: 'Delivery has already been delivered.' });
      }

      delivery.end_date = new Date();
      delivery.signature_id = req.body.signature_id;
    }

    delivery.product = product;

    delivery.save();

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not exists.' });
    }

    delivery.active = 0;
    delivery.save();

    return res.json({ message: 'Record deleted successfully.' });
  }
}

export default new DeliveryController();
