const express = require('express');
const bodyParser = require('body-parser');

class App {
  app: express.Application;
  port: number;

  constructor(controllers: [any], port: number) {
    this.app = express();
    this.port = parseInt(process.env.PORT) || port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: [any]) {
    controllers.forEach(controller => {
      this.app.use('/api', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

module.exports = App;
