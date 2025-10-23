import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import paymentRoutes from './routes/order_and_verfiy.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(bodyParser.json());


app.use('/api/orders', paymentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
