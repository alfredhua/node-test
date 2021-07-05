import compose from 'koa-compose';
import db from './db';

export default compose([
  db
]);
