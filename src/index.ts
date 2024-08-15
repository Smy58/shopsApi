import express from 'express'
import bodyParser from 'body-parser';
import { celebrate, errors, Joi } from 'celebrate';

const {
  login, createClient
} = require('./controllers/clients');


const { PORT = 5000 } = process.env;
export const app = express();

const database = require('./dbconnection/dbpool');

database.initialize()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const allowedCors = [
    'localhost:3000',
    'http://localhost:8080',
];
  
app.use((req, res, next) => {
    const { method } = req;
    const { origin } = req.headers;
  
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  
    console.log(origin);
    
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.status(200);
    }
  
    next();
});

app.post('/login', celebrate({
  body: Joi.object().keys({
      login: Joi.string().min(2).max(30),
      password: Joi.string()
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      address: Joi.string(),
      phone: Joi.string(),
      mail: Joi.string(),
      password: Joi.string()
  }),
}), createClient);


app.use('/shops', require('./routes/shops'));
app.use('/products', require('./routes/products'));
app.use('/workers', require('./routes/workers'));
app.use('/contacts', require('./routes/contacts'));
app.use('/mails', require('./routes/mails'));
app.use('/roles', require('./routes/roles'));
app.use('/clients', require('./routes/clients'));
app.use('/deliveries', require('./routes/deliveries'));
app.use('/statuses', require('./routes/statuses'));
app.use('/shopProducts', require('./routes/shopProducts'));
app.use('/groups', require('./routes/groups'));
app.use('/orders', require('./routes/orders'));
app.use('/orderPositions', require('./routes/orderPositions'));

app.use(errors());

app.use((err, req, res, next) => {
  
  res.status(err.statusCode);
  res.send({ message: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

  process.on('SIGINT', async function () {
    console.log('Received kill signal, shutting down gracefully')
    server.close(() => {
      console.log('HTTP server closed')
      database.closePool()
    })
  })

}
// process.on('SIGTERM', closeServer)



