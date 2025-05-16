import Fastify from 'fastify';
import fastifyView from '@fastify/view';
import fastifyStatic from '@fastify/static';
import * as ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = Fastify({logger: true});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("__dirname:", path.join(__dirname, '../views'));


app.register(fastifyView, {
    engine: {
        ejs: ejs,
    },
    root: path.join(__dirname, '../views'), // Directory for your templates
});

app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'), // Static assets folder
    prefix: '/public/', // So URLs start with /public/
});

app.get('/', async (request, reply) => {
    return reply.view('index.ejs');
});

app.get('/embed', async (request, reply) => {
    return reply.view('8ball/embed.ejs')
})

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});