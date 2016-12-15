import express from 'express';
import createUserRoutes from './server/users/router';
import createDocumentRoutes from './server/documents/router';


const app = express();
const router = express.Router();

createUserRoutes(router);
createDocumentRoutes(router);

app.use('/', router);

app.use((req, res) => {
  res.sendStatus(400);
});

export default app;
