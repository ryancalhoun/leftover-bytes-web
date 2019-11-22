const Router = require('express').Router();

class Comments {
  constructor() {

  }
}

Router.get('/:post', async (req, res) => {
  const comments = new Comments();
  console.log(`Get comments on ${req.params.post}`);
  res.writeHead(501);
  res.end();
});
Router.post('/:post', async (req, res) => {
  const comments = new Comments();
  console.log(`Post comment on ${req.params.post}: ${JSON.stringify(req.body)}`);
  res.writeHead(501);
  res.end();
});
Router.put('/:post/:comment', async (req, res) => {
  const comments = new Comments();
  console.log(`Update comment ${req.params.comment} on ${req.params.post}: ${JSON.stringify(req.body)}`);
  res.writeHead(501);
  res.end();
});
Router.delete('/:post/:comment', async (req, res) => {
  const comments = new Comments();
  console.log(`Delete comment ${req.params.comment} on ${req.params.post}`);
  res.writeHead(501);
  res.end();
});
export { Router }
