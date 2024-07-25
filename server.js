import express from 'express';
import _filter from 'lodash.filter';
import { users } from './users.js';
const app = express();
const port = process.env.NODE_ENV || 3000;

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const {id} = req.params;
  res.json(users.find(user=>user._id === id));
});

app.get('/user', (req, res) => {
  const filter = req.query.filter;
  if(!filter) return res.json({status: 'error', message: 'Need to pass a filter'})
  const filters = filter?.split('|');

  const queries = filters
    .map(filter=>{
      const [key, value] = filter?.split(':');
      if(key && value) return {key, value};
      return null;
    })
    .filter(f=>f)
    .reduce((a, b)=>{
      a[b.key] = decodeURIComponent(b.value);
      return a;
    }, {});

  const filtered = _filter(users, queries);
  res.json(filtered);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});