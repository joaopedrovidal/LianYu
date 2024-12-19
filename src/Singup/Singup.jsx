import styles from './Singup.module.css'
import loginIcon from '../assets/login-svgrepo-com.svg'
import { useState } from 'react';

export function Singup(){
    const [content, setContent] = useState({
        email: '',
        password: ''
    });

    async function handleLoginSubmit(event){
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;

        const dados = {
            nome: name,
            email: email,
            senha: password
        };

        try {
            const response = await fetch ('http://localhost:4000/novoUsuario',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
            if(!response.ok){
                throw new Error (`Erro: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Usuário criado:", data);
            alert('Usuário criado com sucesso!');
        } catch (error) {
            console.log("Erro", "Não foi possível encontrar o usuário desejado")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <strong><p>LianYu</p></strong>
            </div>
            <form onSubmit={handleLoginSubmit} className={styles.input}>
                <input 
                    type="text" 
                    placeholder="Digite o seu nome"
                    name="name"
                />
                <input 
                    type="email" 
                    placeholder="Digite o seu email"
                    name="email"
                />
                <input 
                    type="password" 
                    placeholder="Digite a sua senha"
                    name="password" 
                />
                <button 
                    className={styles.login}
                    type="submit"
                >
                    <strong>Resgistre-se</strong>
                    <img 
                        className={styles.icon}
                        src={loginIcon} 
                        alt="Login Icon" 
                    />
                </button>
            </form>
        </div>
    );
}
