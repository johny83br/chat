import { Router } from "express";
import bodyParser from 'body-parser';
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";
import { ConnectionsController } from "./controllers/ConnectionsController";
import { MessagesController } from "./controllers/MessagesController";

const routes = Router();
const settingsController = new SettingsController();
const usersController = new UsersController();
const connectionsController = new ConnectionsController();
const messagesController = new MessagesController();

routes.use( bodyParser.json() );       // to support JSON-encoded bodies
routes.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

routes.post("/settings", settingsController.create);
routes.post("/connections/add", connectionsController.create);

routes.post("/users/add", usersController.create);
routes.get("/users/:id", usersController.showUser);

routes.post("/messages/add", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

export { routes };