import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number(),
      email: Yup.string().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { avatar_id, email } = req.body;

    /**
     * Validate email
     */
    const verifyEmail = await Deliveryman.findOne({
      where: { email },
    });

    if (verifyEmail) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    /**
     * Validate file
     */
    if (avatar_id) {
      const verifyFile = await File.findByPk(avatar_id);
      if (!verifyFile) {
        return res.status(400).json({ error: 'File does not exists.' });
      }
    }

    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async index(req, res) {
    try {
      const { name, page = 1, perPage = 5 } = req.query;
      const deliverymans = name
        ? await Deliveryman.findAndCountAll({
            where: { name: { [Op.iLike]: `%${name}%` }, active: 1 },
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
              },
            ],
            limit: 5,
            offset: (page - 1) * perPage,
            order: [
              ['name', 'ASC'],
            ],
          })
        : await Deliveryman.findAndCountAll({
            where: {
              active: 1,
            },
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['name', 'path', 'url'],
              },
            ],
            limit: 5,
            offset: (page - 1) * perPage,
            order: [
              ['name', 'ASC'],
            ],
          });

      res.header('X-Total-Count', deliverymans.count);

      return res.json(deliverymans.rows);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const schema = Yup.object().shape({
        id: Yup.number(),
      });

      await schema.validate(req.params).catch(err => {
        return res.status(400).json({ error: err.message });
      });

      const deliveryman = await Deliveryman.findOne({
        where: {
          id,
          active: 1,
        },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'name', 'path', 'url'],
          },
        ],
      });

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman not found.' });
      }

      return res.json(deliveryman);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const { email, avatar_id } = req.body;

    if (email && email !== deliveryman.email) {
      const verifyEmail = await Deliveryman.findOne({
        where: { email },
      });

      if (verifyEmail) {
        return res.status(400).json({
          error: `Email already exists. Email new: ${email}, old: ${deliveryman.email}`,
        });
      }
    }

    if (avatar_id) {
      const avatar = await File.findByPk(avatar_id);

      if (!avatar) {
        return res.status(400).json({ error: 'File not found.' });
      }
    }

    const response = await deliveryman.update(req.body);

    return res.json(response);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findOne({
      where: { id: req.params.id },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    deliveryman.active = 0;
    deliveryman.save();

    return res.json({ message: 'Deliveryman deleted successfully.' });
  }
}

export default new DeliverymanController();
