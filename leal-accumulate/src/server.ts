import App from './app';

class Server {
  private readonly app: App;
  constructor({ app }) {
    this.app = app;
  }

  async start(port: string): Promise<any> {
    return this.app.instance.listen(port, () => {
      console.info('Application running on port ' + port);
    });
  }
}

export default Server;
