const Router = require('express').Router();
const qs = require('querystring');
const https = require('https');
const {Datastore} = require('@google-cloud/datastore');

class Comments {
  constructor(post) {
    this.post = post;
    this.ds = new Datastore({ projectId: 'leftoverbytes' });
  }
  async get() {
    const query = this.ds.createQuery('Comment').filter('post', this.post).order('created');
    const [comments, moreResults] = await this.ds.runQuery(query);

    if(comments.length > 0) {
      const ids = {};
      comments.forEach(c => ++ids[c.user]);

      const keys = Object.keys(ids).map(id => this.ds.key(['User', id]));
      const [users] = await this.ds.get(keys);

      comments.forEach(c => {
        keys.forEach((key, i) => {
          if(key.name == c.user) {
            c.name = users[i].name;
            c.picture = users[i].picture;
          } 
        });

        delete c.user;
      });
    }

    return comments;
  }
  async create(user_id, message) {
    const [user] = await this.ds.get(this.ds.key(['User', user_id]));
    if(!user) {
      throw `Invalid user ID ${user_id}`;
    }

    const key = this.ds.key(['Comment']);
    const data = {
      post: this.post,
      user: user_id,
      message: message,
      created: new Date().getTime(),
    };
    const [r] = await this.ds.save({ key: key, data: data });
    const id = r.mutationResults[0].key.path[0].id;

    this.notify(user, message);

    return Object.assign({ id: id }, data);
  }
  async update(id, message) {
  }
  async delete(id) {
  }

  async notify(user, message) {
    const [entity] = await this.ds.get(this.ds.key(['Secret', 'MAILGUN_API']));

    const opts = {
      auth: `${entity.client_id}:${entity.client_secret}`,
      hostname: 'api.mailgun.net',
      port: 443,
      path: '/v3/mg.leftoverbytes.com/messages',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    const params = {
      to: process.env.NOTIFY_RECIPIENT,
      from: process.env.NOTIFY_SENDER,
      subject: 'New comment on Leftover Bytes',
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <title>Leftover Bytes</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
        <style>
        html, body {
          margin: 0;
          font-family: sans;
        }
        h1 {
          margin: 0;
          padding: 12px 16px;
          font-size: 20px;
          background: #444;
          color: white;
          border-bottom: 6px solid #559944;
        }
        h2 {
          margin: 0;
          padding: 20px 16px;
          font-size: 16px;
        }
        p {
          margin: 0;
          padding: 8px 16px;
          font-size: 14px;
          clear: both;
        }
        </style>
        <body>
        <h1>Leftover Bytes</h1>
        <h2>New comment from ${user.name}</h2>
        ${ message.split('\n').map(line => "<p>" + line + "</p>") }
        </body>
        </html>
      `,
    };

    return new Promise((resolve, reject) => {
      const call = https.request(opts, resolve);
      call.on('error', error => {
        console.log(`Mailgun error: ${error}`);
        reject(error);
      });
      call.write(qs.stringify(params));
      call.end();
    });
  }
}

Router.get('/:post', async (req, res) => {
  const comments = new Comments(req.params.post);
  res.send(await comments.get());
  res.end();
});
Router.post('/:post', async (req, res) => {
  const comments = new Comments(req.params.post);
  res.send(await comments.create(req.body.user_id, req.body.message));
  res.end();
});
Router.put('/:post/:comment', async (req, res) => {
  const comments = new Comments(req.params.post);
  res.send(await comments.update(req.params.comment, req.body.message));
  res.end();
});
Router.delete('/:post/:comment', async (req, res) => {
  const comments = new Comments(req.params.post);
  res.send(await comments.delete(req.params.comment));
  res.end();
});
export { Router }
