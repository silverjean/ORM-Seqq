import Post from '../models/Post';

class PostController {
  async index(request, response) {
    try {
      const { limit, offset } = request.query;

      const result = await Post.findAll({
        limit,
        offset,
      });

      return response.json(result);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { uid } = request.params;

      const result = await Post.findOne({
        where: {
          uid,
        },
      });

      if (!result) {
        return response.status(400).json({ message: 'Post não encontrado' });
      }

      return response.json(result);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { uid } = request.params;
      const { content } = request.body;

      if (!content) {
        return response
          .status(400)
          .json({ message: 'Insira um conteúdo valido' });
      }

      const result = await Post.create({
        content,
        users_uid: uid,
      });

      return response.json(result);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async update(request, response) {
    try {
      const { uid } = request.params;
      const { content } = request.body;

      if (!content) {
        return response
          .status(400)
          .json({ message: 'Insira um conteúdo valido' });
      }

      const result = await Post.update(
        {
          content,
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
      await Post.destroy({ where: { uid } });

      return response.sendStatus(202);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new PostController();
