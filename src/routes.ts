import { Router } from "express";
/* MIDDLEWARERS */
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

/*CONTROLLERS*/
import { createCategoryController } from "./useCases/Category/CreateCategory";
import { deleteCategoryController } from "./useCases/Category/DeleteCategory";
import { getAllCategoryController } from "./useCases/Category/GetALCategory";
import { updateCategoryController } from "./useCases/Category/UpdateCategory";
import { authenticateUserController } from "./useCases/Authenticate/AuthenticateUser";
import { createUserController } from "./useCases/User/CreateUser";
import { deleteUserController } from "./useCases/User/DeleteUser";
import { getAllUserController } from "./useCases/User/GetAllUser";
import { updateUserController } from "./useCases/User/UpdateUser";
import { createVideoController } from "./useCases/Video/CreateVideo";
import { getAllVideosController } from "./useCases/Video/GetAllVideos";
import { refreshTokenUserController } from "./useCases/Authenticate/GenaerateToken";


const routes = Router();

/* USER */
routes.post('/users', (request, response)=>{
  return createUserController.handle(request, response);
});
routes.get('/users', (request, response)=>{
  return getAllUserController.handle(request, response);
});
routes.put('/users/:id', (request, response)=>{
  return updateUserController.handle(request, response);
});
routes.delete('/users/:id', (request, response)=>{
  return deleteUserController.handle(request, response);
});

/* USER LOGIN */
routes.post('/login', (request, response)=>{
  return authenticateUserController.handle(request, response);
});
routes.post('/refresh-token', (request, response)=>{
  return refreshTokenUserController.handle(request, response);
});
/* CATEGORIES */
routes.post('/categories', (request, response)=>{
  return createCategoryController.handle(request, response);
});
routes.get('/categories', ensureAuthenticated, (request, response)=>{
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