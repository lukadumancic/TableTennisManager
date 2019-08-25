import express from 'express';
import bodyParser from 'body-parser';

export default class App {
  app: express.Application;
  port: number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeStaticPageBuild();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach(controller => {
      this.app.use('/api', controller.router);
    });
  }

  private initializeStaticPageBuild() {
    if (process.env.NODE_ENV === 'production') {
      const path = require('path');
      this.app.use(
        express.static(path.resolve(__dirname, '..', 'web', 'dist', 'web'))
      );
      this.app.get('*', (req: express.Request, res: express.Response) => {
        res.sendFile(
          path.resolve(__dirname, '..', 'web', 'dist', 'web', 'index.html')
        );
      });
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
