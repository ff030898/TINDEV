const Dev = require('../models/Dev');
module.exports = { 

    //req = requisição res = resposta
    async store (req, res) {
      //console.log(req.params.devId);
      //console.log(req.headers.user);

      //criar as variaveis com as informações
      const {user} = req.headers;
      const {devId} = req.params;

      //busca no banco pelo id o usuario logado
      const loggedDev = await Dev.findById(user);

      //usuario que vai receber o like
      const targetDev = await Dev.findById(devId);

      //verificar se usuario existe

    

      //percorrer vetor de likes do usuario logado
      loggedDev.dislikes.push(targetDev._id);

      //salvar no banco os likes
      await loggedDev.save();

      return res.json(loggedDev);
    }

};