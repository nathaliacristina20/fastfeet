import * as Yup from 'yup';

import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    try {
      const { name, page = 1, perPage = 5 } = req.query;

      let recipients = '';

      if (name) {
        recipients = await Recipient.findAndCountAll({
          where: {
            active: 1,
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          limit: 5,
          offset: (page - 1) * perPage,
        });
      } else {
        recipients = await Recipient.findAndCountAll({
          where: {
            active: 1,
          },
          limit: 5,
          offset: (page - 1) * perPage,
        });
      }

      res.header('X-Total-Count', recipients.count);

      return res.json(recipients.rows);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      number: Yup.number().required(),
      street: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      number: Yup.number().required(),
      street: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const new_recipient = await recipient.update(req.body);

    return res.json(new_recipient);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exists.' });
    }

    recipient.active = 0;
    recipient.save();

    return res.json({ message: 'Record deleted successfully.' });
  }
}

export default new RecipientController();
