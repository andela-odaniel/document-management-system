import RoleController from '../controllers/role.controller';
import { isAuthorized, isAdmin } from '../controllers/auth.controller';

const RoleRouter = (router) => {
  router
    .route('/roles')
    .post(isAuthorized, isAdmin, RoleController.create);

  router
    .route('/roles')
    .get(isAuthorized, isAdmin, RoleController.getAll);

  router
    .route('/roles/:id')
    .get(isAuthorized, RoleController.get);

  router
    .route('/roles/:id')
    .delete(isAuthorized, isAdmin, RoleController.delete);
};

export default RoleRouter;
