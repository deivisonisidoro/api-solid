import { Router } from "express";
import { createUserController } from "./useCases/User/CreateUser";
import { deleteUserController } from "./useCases/User/DeleteUser";
import { getAllUserController } from "./useCases/User/GetAllUser";
import { updateUserController } from "./useCases/User/UpdateUser";


const routes = Router();

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

export {routes}