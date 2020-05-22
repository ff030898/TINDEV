const express = require('express'); // importando express
const mongoose = require('mongoose'); //importando mongoose
const cors = require('cors'); //importando cors

const routes = require('./routes');
const serve = express();


mongoose.connect('mongodb+srv://fabricio:omnistack@cluster0-w3obz.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

serve.use(express.json());
serve.use(cors());
serve.use(routes);
serve.listen(3333);
