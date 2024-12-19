import styles from './Singup.module.css'
import loginIcon from '../assets/login-svgrepo-com.svg'
import { useState } from 'react';
import { Modal } from '../Modal/modal';

export function Singup(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
            setModalMessage('Usuário criado com sucesso!')
            setIsModalOpen(true);
        } catch (error) {
            console.log("Erro", "Não foi possível encontrar o usuário desejado")
            setModalMessage("Erro ao criar usuário, verifique os dados e tente novamente.")
            setIsModalOpen(true);
        }
    }

    const closeModal = () =>{
        setIsModalOpen(false)
    };

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
            <Modal 
                isOpen={isModalOpen}
                onClose={closeModal}
                message={modalMessage}
            />
        </div>
    );
}
