const fs = require('fs');

class WebClient {
  constructor(req) {
    this.req = req;
  }
  matches() {
    return true;
  }
  async handle(res) {
    fs.readFile('index.html', 'utf8', (err, contents) => {
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      res.send(contents);
      res.end();
    });
  }
}

export { WebClient };
