import styles from '../Modal/Modal.module.css'
import React from 'react'

export function Modal ({ isOpen, onClose, message }){
    if(!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <button 
                    className={styles.closeButton}
                    onClick={onClose}    
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}