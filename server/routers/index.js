import roleRoutes from './roles.router';
import userRoutes from './users.router';
import documentRoutes from './documents.router';

/**
 * Adds the routes imported routes to the application
 * @param {any} router
 */
const routes = (router) => {
  roleRoutes(router);
  userRoutes(router);
  documentRoutes(router);
};


export default routes;
