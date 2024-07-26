import 'dotenv/config';
import express from 'express';
import _filter from 'lodash.filter';
import { users } from './users.js';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json' assert { type: "json" };

const app = express();
const port = process.env.PORT || 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to hello world.'
  res.json({status: 'success', message: 'Only test lab'})
});

app.get('/user/:id', (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to get a user.'
  // #swagger.parameters['id'] = { description: 'ID of user.' }

  const {id} = req.params;
  res.json(users.find(user=>user._id === id));
});

app.get('/users', (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to get all users.'

  /* #swagger.parameters['filter'] = {
    in: 'query',
      description: 'Filter users with filter. Ex: ?filter=name:John Doe|email:john.doe@mail.com.',
      type: 'string'
  } */
  
  const filter = req.query.filter;
  if(filter) {
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
  }else{
    res.json(users);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});