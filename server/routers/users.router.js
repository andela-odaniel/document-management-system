import UserController from '../controllers/user.controller';
import { isAuthorized, isAdmin } from '../controllers/auth.controller';


const UserRouter = (router) => {
  router
    .route('/users/:id')
    .get(isAuthorized, UserController.get);

  router
    .route('/users')
    .get(isAuthorized, isAdmin, UserController.getAll);

  router
    .route('/users')
    .post(UserController.create);

  router
    .route('/users/:id')
    .put(isAuthorized, UserController.edit);

  router
    .route('/users/:id')
    .delete(isAuthorized, isAdmin, UserController.delete);

  router
    .route('/users/login')
    .post(UserController.login);

  router
    .route('/users/:id/documents')
    .get(isAuthorized, UserController.documents);
};

export default UserRouter;
