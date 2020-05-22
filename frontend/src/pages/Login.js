import React, { useState } from 'react';
import './Login.css';
import api from '../services/api';
import logo from '../assets/logo.svg';

export default function Login({history}){

    const [username, setUsername] = useState('');

    //função disparada quando o usuário der um submit no form
    async function handleSubmit(e){

        //segura pra não ir pra pagina main
        e.preventDefault();
        //console.log(username);

        //como o nome da variavel já é username só precisar colocar uma vez
        const response = await api.post('/devs', {username});

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return(
        <div className="login-container">
         <form onSubmit={handleSubmit}>
         <img src={logo} alt="Tindev"/>
         <input placeholder="Digite seu usuário no Github" required
         value={username}
         onChange={e => setUsername(e.target.value)}
         />
         <button type="submit">Enviar</button>
         </form>
        </div>
    );

}