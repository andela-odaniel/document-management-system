import express from 'express';
import createUserRoutes from './server/routers/usersRouter';
import createDocumentRoutes from './server/routers/documentsRouter';


const app = express();
const router = express.Router();

createUserRoutes(router);
createDocumentRoutes(router);

app.use('/', router);

app.use((req, res) => {
  res.sendStatus(400);
});

export default app;
