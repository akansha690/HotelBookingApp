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
roomCategoryRouter.get('/:hotelId/roomcategories', getAllRoomCategoriesHandler)
roomCategoryRouter.get('/:id', getRoomCategoryHandler)
roomCategoryRouter.patch('/:id/update', updateRoomCategoryHandler)
roomCategoryRouter.delete('/:id/delete', deleteRoomCategoryHandler)


export default roomCategoryRouter;