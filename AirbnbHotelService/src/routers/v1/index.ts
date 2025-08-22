import express from 'express';
import hotelRouter from './hotel';
import roomRouter from './room';
import { getAllAvailableRoomsHandler } from '../../controllers/room.controller';


const v1Router = express.Router();

v1Router.use('/hotels', hotelRouter);
v1Router.use('/rooms', roomRouter);
v1Router.use('/categories/allrooms', getAllAvailableRoomsHandler)
export default v1Router;