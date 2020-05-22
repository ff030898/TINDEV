const express = require('express'); // importando express
const routes = express.Router();
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DisLikeController = require('./controllers/DisLikeController');

routes.get('/', (req, res) => {
    
    return res.send('Hello World 3');
});
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DisLikeController.store);

module.exports = routes;