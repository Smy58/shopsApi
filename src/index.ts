import express from 'express'
import bodyParser from 'body-parser';


const { PORT = 5000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const allowedCors = [
    'localhost:3000',
];
  
app.use((req, res, next) => {
    const { method } = req;
    const { origin } = req.headers;
  
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.status(200).send();
    }
  
    next();
});


app.use('/', require('./routes/shops'));
app.use('/', require('./routes/products'));
app.use('/', require('./routes/workers'));
app.use('/', require('./routes/contacts'));
app.use('/', require('./routes/mails'));
app.use('/', require('./routes/roles'));
app.use('/', require('./routes/clients'));
app.use('/', require('./routes/deliveries'));
app.use('/', require('./routes/statuses'));
app.use('/', require('./routes/shopProducts'));
app.use('/', require('./routes/groups'));
app.use('/', require('./routes/orders'));
app.use('/', require('./routes/orderPositions'));



app.listen(PORT, () => console.log(`Running on port ${PORT}`));