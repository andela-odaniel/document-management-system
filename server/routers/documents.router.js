import DocumentController from '../controllers/document.controller';
import { isAuthorized } from '../controllers/auth.controller';


const DocumentRouter = (router) => {
  router
    .route('/documents/:id')
    .get(isAuthorized, DocumentController.get);

  router
    .route('/documents')
    .get(isAuthorized, DocumentController.getAll);

  router
    .route('/documents/role/:roleName')
    .get(isAuthorized, DocumentController.getAllForRole);

  router
    .route('/documents')
    .post(isAuthorized, DocumentController.create);

  router
    .route('/documents/:id')
    .put(isAuthorized, DocumentController.edit);

  router
    .route('/documents/:id')
    .delete(isAuthorized, DocumentController.delete);
};

export default DocumentRouter;
