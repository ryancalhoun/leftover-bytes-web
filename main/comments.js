const Router = require('express').Router();
const {Datastore} = require('@google-cloud/datastore');

class Comments {
  constructor(post) {
    this.post = post;
    this.ds = new Datastore({ projectId: 'leftoverbytes' });
  }
  async get() {
    const query = this.ds.createQuery('Comment').filter('post', this.post);
    const [comments, moreResults] = await this.ds.runQuery(query);

    const ids = {};
    comments.forEach(c => ++ids[c.user]);

    const keys = Object.keys(ids).map(id => this.ds.key(['User', id]));
    const users = await this.ds.get(keys);

    console.log("Comments", comments);
    console.log("Keys", keys);

    comments.forEach(c => {
      console.log("Update comment", c);
      keys.forEach((key, i) => {
        console.log("Try this key", key, key.name, c.user, i);
        console.log("With this user", users[i]);
        if(key.name == c.user) {
          c.name = users[i].name;
          c.picture = users[i].picture;
        } 
      });

      //delete c.user;
    });

    return comments;
  }
  async create(user_id, message) {
    const [user] = await this.ds.get(this.ds.key(['User', user_id]));
    if(!user) {
      throw `Invalid user ID ${user_id}`;
    }

    const key = this.ds.key(['Comment']);
    const comment = {
      key: key,
      data: {
        post: this.post,
        user: user_id,
        message: message,
      },
    };
    const [r] = await this.ds.save(comment);
    console.log(r);
    console.log(r.mutationResults[0]);

    return {};
  }
  async update(id, message) {
  }
  async delete(id) {
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
