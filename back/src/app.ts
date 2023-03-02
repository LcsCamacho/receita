//imports
import express from 'express'
import cors from 'cors'
import { routerReceita } from './routes/router';

//app
const app = express();
app.use(cors());
app.use(express.json());
app.use(routerReceita)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//teste
app.listen(3000, () => {
    console.log('Server running on port 3000')
});