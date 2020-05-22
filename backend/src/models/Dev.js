const {Schema, model} = require('mongoose'); //importando o mongoose com o schema e o tema juntos
const DevSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    user: {
        type: String,
        required: true,
    },

    bio: String,

    avatar: {
        type: String,
        required: true,
    },

    //criar um vetor de desenvolvedores com like. como se fosse uma chave estrangeira
    likes: [{
       type: Schema.Types.ObjectId,
       ref: 'Dev',
    }],

    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
     }]
    
}, {timestamps: true,});

module.exports = model('Dev', DevSchema);