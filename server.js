import express from 'express';
import RouterAPI from './src/routes';
const logger = require('morgan');
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors({
	origin: 'https://localhost:3000',
	credentials: true,
}));
app.use(logger('dev'));

// xử lý file, json, url, cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Máy chủ Vibe đang chạy trên cổng: " + port);
})


app.get('/', (req, res) => {
    res.send("Máy chủ Vibe đang hoạt động!");
})

app.use('/api', RouterAPI(express.Router()));

