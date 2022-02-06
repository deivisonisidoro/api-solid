import { Router } from "express";

/*CONTROLLERS*/
import { createCategoryController } from "./useCases/Category/CreateCategory";
import { deleteCategoryController } from "./useCases/Category/DeleteCategory";
import { getAllCategoryController } from "./useCases/Category/GetALCategory";
import { updateCategoryController } from "./useCases/Category/UpdateCategory";
import { createUserController } from "./useCases/User/CreateUser";
import { deleteUserController } from "./useCases/User/DeleteUser";
import { getAllUserController } from "./useCases/User/GetAllUser";
import { updateUserController } from "./useCases/User/UpdateUser";
import { createVideoController } from "./useCases/Video/CreateVideo";
import { getAllVideosController } from "./useCases/Video/GetAllVideos";


const routes = Router();

/* USER */
routes.post('/user', (request, response)=>{
  return createUserController.handle(request, response);
});
routes.get('/user', (request, response)=>{
  return getAllUserController.handle(request, response);
});
routes.put('/user/:id', (request, response)=>{
  return updateUserController.handle(request, response);
});
routes.delete('/user/:id', (request, response)=>{
  return deleteUserController.handle(request, response);
});

/* CATEGORIES */
routes.post('/categories', (request, response)=>{
  return createCategoryController.handle(request, response);
});
routes.get('/categories', (request, response)=>{
  return getAllCategoryController.handle(request, response);
});
routes.put('/categories/:id', (request, response)=>{
  return updateCategoryController.handle(request, response);
});
routes.delete('/categories/:id', (request, response)=>{
  return deleteCategoryController.handle(request, response);
});

/* VIDEOS */
routes.post('/videos', (request, response)=>{
  return createVideoController.handle(request, response);
});
routes.get('/videos', (request, response)=>{
  return getAllVideosController.handle(request, response);
});
export {routes}