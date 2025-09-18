import express from 'express';

const app = express();

//Global middlewares
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cors({origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Rpote sections
import authRouter from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoute.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
// import destinationRoutes from './routes/destinationRoutes.js';

app.get('/api/v1/auth/healthchecker', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Travigo API',
  });
  
});

app.use('/api/v1/auth', authRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/itineraries", itineraryRoutes);
// app.use("/api/destinations", destinationRoutes);


//error mIddleware
import { errorHandler } from './middleware/errorHandler.js';

app.use(errorHandler);
export default app;