require('dotenv').config({ path: './.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const ccxt = require('ccxt');
const axios = require('axios');

// const connectDB = require('./configs/db');
const app = express();

const origin = "http://localhost:3000";
   
// const l = require('./common/logger');
const PORT = 8001;

// require('./models/product');
app.use(
  cors({
    origin,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api", require("./routes/crypto"));

app.use((err, _, res, __) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong, please try again.",
  });
});

const server = app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});



// const origin = 'http://127.0.0.1:5173';
// console.log(origin);

// // async function startServer() {
// //   app.use(
// //     cors({
// //       origin,
// //       methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
// //       credentials: true,
// //     }),
// //   );

// //   app.use(express.json({ limit: '50mb' }));
// //   app.use(express.urlencoded({ limit: '50mb', extended: true }));
// //   app.use(cookieParser());
// //   app.use(express.urlencoded({ limit: '50mb', extended: true }));

// //   app.use('/api', require('./routes/product'));

// //   app.use((err, _, res, __) => {
// //     res.status(err.status || 500).json({
// //       message: err.message || 'Something went wrong, please try again.',
// //     });
// //   });

// //   const path = require('path');
// //   app.use(express.static(path.join(__dirname, 'build')));
// //   app.get('/*', function (req, res) {
// //     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// //   });

// //   app.listen(PORT, () => {
// //     l.info(`up and running in ${process.env.NODE_ENV} on port ${PORT}`);
// //   });
// // }
// // startServer();
// // connectDB();
// const api = require('binance');
// const binanceRest = new api.BinanceRest({
//     key: 'xEE5KJY7YmfXscYv8mg8uuYgsOywWxhvS8t8uJdEjjSBMSABgcwR79KlL2R0LgoA',
//     secret: 'oRagYtmTHe29GeiUK4aR6IUB2rqijsxflChDJpgNY5eulY9BKgq9iiI0DEhkZbEs', 
//     timeout: 15000, 
//     recvWindow: 10000, 
//     disableBeautification: false,
//     handleDrift: true
// });

// // You can use promises
// binanceRest.newOrder({
//         symbol: 'BTCUSDT',
//         side: 'BUY',
//         type: 'LIMIT',
//         timeInForce: 'GTC',
//         quantity: '0.003',
//         price: '6200',
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.error(err);
//     });


