import { Router } from 'express';

import PostController from '../controllers/PostController';

const routes = new Router();

// todos os posts de um usuário.
routes.get('/posts', PostController.index);

// add another post
routes.post('/posts/:uid', PostController.store);

// change content of a post
routes.put('/posts/:uid', PostController.update);

// requisição de um post especifico
routes.get('/posts/:uid', PostController.show);

routes.delete('/posts/:uid', PostController.delete);

export default routes;
