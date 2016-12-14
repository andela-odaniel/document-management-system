import express from 'express';
import bunyan from 'bunyan';
import createUserRoutes from './server/users/router';
import createDocumentRoutes from './server/documents/router';


const logger = bunyan.createLogger({ name: 'dms-app' });
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

createUserRoutes(router);
createDocumentRoutes(router);

app.use('/', router);

app.use((req, res) => {
  res.send('tis a shame, tis an error, what you seek, was not found. Sorry. 404');
});


app.listen(PORT, () => {
  logger.info(`app started on port ${PORT}`);
});

export default app;
