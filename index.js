const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const mongoose = require('mongoose');
const Photos =require('./models/Photos');
const schema = require('./graphql/schema');

const app = new Koa();

// KoaRouter instantiation
const router = new KoaRouter();

mongoose.connect('mongodb://localhost');

const db = mongoose.connection;
db.once('open', () => {
  console.log('mongoose has been connected!')
});

db.on('error', console.error.bind(console, 'connection error:'));

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('x-response-time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();

  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} --- ${ms}ms`)
});

app.keys = ['im a newer secret', 'i like turtle'];

router.get('/', async ctx => {
  ctx.body = 'hello koa';
  ctx.cookies.set('name', 'shy', { signed: true });
})

router.get('/api/photos', async ctx => {
  // how mongodb store its data && is there concept like table in mysql?
  ctx.body = await Photos.find();
})

router.post('/api/photos', async ctx => {
  const { name, shotPlace, desc, url } = ctx.request.body
  const photo = new Photos({
    name,
    shotPlace,
    url,
    desc,
  });

  await photo.save();  // whether save method is async

  ctx.body = photo;
})

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

router.post('/graphql', graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));


// use koa-bodyParser to parse body info
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


app.on('error', (err, ctx) => {
  console.log('An error occurred', err, ctx);
})

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
