import User from '../models/User';

import Post from '../models/Post';

class UserController {
  async index(request, response) {
    const { limit, offset } = request.query;

    try {
      const data = await User.findAll({ limit, offset });
      return response.json(data);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { uid } = request.params;

      const result = await User.findOne({
        where: {
          uid,
        },
      });

      if (!result) {
        return response.status(400).json({ message: 'Usuário não encontrado' });
      }

      return response.json(result);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { name, email } = request.body;

      if (!name || !email) {
        return response
          .status(400)
          .json({ message: 'Entre com valores validos!' });
      }

      const duplicateEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (duplicateEmail) {
        return response.status(400).json({ message: 'Email já cadastrado' });
      }

      const result = await User.create({
        name,
        email,
      });

      return response.json(result);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async update(request, response) {
    try {
      const { uid } = request.params;
      const { name, email } = request.body;

      if (!name || !email) {
        return response
          .status(400)
          .json({ message: 'Entre com valores validos!' });
      }

      const result = await User.update(
        {
          name,
          email,
        },
        {
          where: {
            uid,
          },
          returning: true,
        }
      );

      return response.json(result);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async delete(request, response) {
    try {
      const { uid } = request.params;

      await Post.destroy({ where: { users_uid: uid } });
      await User.destroy({ where: { uid } });

      return response.sendStatus(202);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new UserController();
