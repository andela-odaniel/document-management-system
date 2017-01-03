import Express from 'express';
import BodyParser from 'body-parser';
import routes from './server/routers';

const app = Express();
const router = Express.Router();

routes(router);
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use('/', router);

app.use((req, res) => {
  res.sendStatus(400);
});

export default app;
