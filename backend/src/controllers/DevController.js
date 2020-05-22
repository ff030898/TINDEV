const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, res){
      
      //pegar id de usuario logado        
      const {user} = req.headers;

      //buscar todos os dados do usuario no banco com o id pela variavel user
      const LoggedDev = await Dev.findById(user);

      //select com 3 filtros selecione todos os usuario que não tem like,dislake e com id diferente do que está logado

      const users = await Dev.find({
     
        $and: [
          //$ne - busca usuarios com id difernete do usuario logado
          {_id: {$ne: user}},

          //tira da lista todos os usuario que o dev já deu like
          {_id: {$nin: LoggedDev.likes}},
          
          //tira da lista todos os usuario que o dev já deu dislike
          {_id: {$nin: LoggedDev.dislikes}},
        ],

      })

      //retorna o select em JSON
      return res.json(users);
    },

    async store(req, res){

        //pegar somente a variavel username dentro de req.body
        const {username} = req.body;
        
        //verifica se o usuário já existe no banco
        const userExists = await Dev.findOne({user: username});

        //se existir não cadastra novamente só mostra as informações na tela

        if(userExists){
            return res.json(userExists);
        }

        //mostra os dados da api do usuario
        const response = await axios.get(`https://api.github.com/users/${username}`);
        
        //: muda o nome da variavel
        const {name, bio, avatar_url: avatar } = response.data;

        //cadastrar no banco de dados
        const dev = await Dev.create({
            name,
            user:username,
            bio,
            avatar,
        })

        return res.json(dev);
    }
}

//toda vez que usar o await tem que colocar que a função é async