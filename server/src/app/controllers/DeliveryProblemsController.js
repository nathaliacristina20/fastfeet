import * as Yup from 'yup';
import DeliveryProblems from '../models/DeliveryProblems';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import Queue from '../../lib/Queue';
import CancellationDeliveryMail from '../jobs/CancellationDeliveryMail';

class DeliveryProblemsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { id } = req.params;

    const delivery = await Delivery.findOne({ where: { id, active: 1 } });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const deliveryProblems = await DeliveryProblems.create({
      ...req.body,
      delivery_id: id,
    });

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveriesProblems = await DeliveryProblems.findAll({
      where: {
        delivery_id: id,
      },
    });
    return res.json(deliveriesProblems);
  }

  async index(req, res) {
    const { page = 1, perPage = 5 } = req.query;

    const deliveries = await DeliveryProblems.findAndCountAll({
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id'],
        },
      ],
      limit: 5,
      offset: (page - 1) * perPage,
    });

    res.header('X-Total-Count', deliveries.count);

    return res.json(deliveries.rows);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliveryProblems = await DeliveryProblems.findByPk(id);

    if (!deliveryProblems) {
      return res
        .status(400)
        .json({ error: 'Delivery problem does not exists.' });
    }

    const delivery = await Delivery.findOne({
      where: { id: deliveryProblems.delivery_id },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists.' });
    }

    if (delivery.canceled_at !== null) {
      return res.status(400).json({ error: 'This order has been canceled.' });
    }

    delivery.canceled_at = new Date();

    await Queue.add(CancellationDeliveryMail.key, {
      delivery: delivery.dataValues.id,
      reason: deliveryProblems.description,
      product: delivery.dataValues.product,
      deliveryman: delivery.dataValues.deliveryman.name,
      email: delivery.dataValues.deliveryman.email,
      recipient: delivery.dataValues.recipient.dataValues.name,
      street: delivery.dataValues.recipient.dataValues.street,
      number: delivery.dataValues.recipient.dataValues.number,
      complement: delivery.dataValues.recipient.dataValues.complement,
      city: delivery.dataValues.recipient.dataValues.city,
      state: delivery.dataValues.recipient.dataValues.state,
      zip_code: delivery.dataValues.recipient.dataValues.zip_code,
    });

    delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryProblemsController();
