import React, {useEffect, useState } from 'react'; //useEffect
import {Link} from 'react-router-dom';
import api from '../services/api';
import './Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';


export default function Main({ match }){

    //inicia com array vazio pq são varios usuarios
    const [users, setUsers] = useState([]);

    //toda vez que o id da url for alterado ele chama essa função

    useEffect(() => {

    async function loadUsers(){

      const response = await api.get('/devs', {
          headers: {
              user: match.params.id,

          }
        
        })

        setUsers(response.data);
    }

    loadUsers();

}, [match.params.id]);

    async function handleLike(id){
        //console.log('like:', id)
         //console.log('dislike:', id);
         await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });


        //reeescre a função e faz o select recarregando a pagina com id diferente do id que está logado
        setUsers(users.filter(user => user._id !== id));
    }
    async function handleDislike(id){

        //console.log('dislike:', id);
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });


        //reeescre a função e faz o select recarregando a pagina com id diferente do id que está logado
        setUsers(users.filter(user => user._id !== id));
    }
    
    return(
        <div className="main-container">
            <Link to="/">
            <img src={logo} alt="Tindev"/>
            </Link>
            
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => (

                        <li key={user._id}>
                        <img src={user.avatar} alt={user.name}/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>

                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike(user._id)}><img src={dislike} alt=""/></button>
                            <button type="button" onClick={() => handleLike(user._id)}><img src={like} alt="" /></button>
                        </div>
                        </li>
                        ))}
                    </ul>
                ) : (

                    <div className="Empty">Acabou :( </div>
                )}
                
            
        </div>
    );
}