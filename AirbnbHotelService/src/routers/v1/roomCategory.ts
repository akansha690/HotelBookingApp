import express from 'express';
import { reqValidator } from '../../validators';
import { roomCategorySchema } from '../../validators/roomCategorySchema';
import { createRoomCategoryHandler, deleteRoomCategoryHandler, getAllRoomCategoriesHandler, getRoomCategoryHandler, updateRoomCategoryHandler } from '../../controllers/roomCategory.controller';


const roomCategoryRouter = express.Router();

roomCategoryRouter.post(
    '/hotels/:hotelId/categories/create', 
    reqValidator(roomCategorySchema),
    createRoomCategoryHandler
);
roomCategoryRouter.get('/:hotelId/categories', getAllRoomCategoriesHandler)
roomCategoryRouter.get('/categories/:id', getRoomCategoryHandler)
roomCategoryRouter.patch('/categories/:id/update', updateRoomCategoryHandler)
roomCategoryRouter.delete('/categories/:id/delete', deleteRoomCategoryHandler)


export default roomCategoryRouter;