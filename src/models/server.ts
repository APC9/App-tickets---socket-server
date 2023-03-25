import express, {Application} from 'express';
import http from 'http';
import socketIO from "socket.io";
import cors from 'cors';

import { socketController } from '../sockets/controller';


class Server{
  private app: Application;
  private port: string;
  private server: http.Server;
  private io: socketIO.Server;
  private paths = {
    //users: '/api/users',
  };

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '8080';
    this.server = new http.Server(this.app);
    this.io = new socketIO.Server(this.server);

    //middlewares
    this.middlewares();
    
    //Rutas de mi aplicacion
    this.routes();

    //Sockets
    this.sockets();
  }


  middlewares(){
    //CORS
    this.app.use( cors() );

    //Directorio publico
    this.app.use( express.static('public'));

  }
  
  routes(){
    //this.app.use( this.paths.users, routerUser );
  }

  sockets(){
    this.io.on('connection', socketController);
  }
  
  listen(){
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

}

export default Server;