import * as Yup from 'yup';
import User from '../models/user';
import File from '../models/File';

class UserController {
  async index(_, res) {
    const users = await User.findAll();
    const usersFormatted = users.map(({ id, name, email, provider }) => ({
      id,
      name,
      email,
      provider,
    }));
    return res.json(usersFormatted);
  }

  async store({ body }, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(body)))
      return res.status(400).json({ error: 'Validation is not valid' });

    const isUserExists = await User.findOne({ where: { email: body.email } });

    if (isUserExists)
      return res.status(400).json({ error: 'User already exist' });

    try {
      const { id, name, email, provider } = await User.create(body);

      return res.json({
        id,
        name,
        email,
        provider,
      });
    } catch (err) {
      return res.json(err);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation is not valid' });

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(401).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }

  async delete({ params }, res) {
    const user = await User.destroy({ where: { id: params.id } });
    return res.json({ message: 'User deleted', user });
  }
}

export default new UserController();
