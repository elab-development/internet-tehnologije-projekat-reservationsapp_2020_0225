// Import necessary modules
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import objectRouter from './routes/object.routes.js';


dotenv.config();

//CORS (Cross-Origin Resource Sharing) politika je sigurnosni mehanizam koji
// se primenjuje u veb pregledačima kako bi ograničio veb stranice da zahtevaju resurse
// (npr. podatke ili skripte) sa drugih domena, osim ako taj drugi domen eksplicitno dozvoljava
// takve zahteve. Ovaj mehanizam je uveden radi zaštite korisnika od potencijalno opasnih veb
// stranica koje pokušavaju pristupiti resursima sa drugih domena bez odgovarajuće dozvole.
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/objects', objectRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
