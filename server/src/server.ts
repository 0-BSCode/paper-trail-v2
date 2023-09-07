import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello, this is Express asd TypeScript');
});

app.listen(port, ()=> {
console.log(`[Server]: I am running at http://localhost:${port}`);
});