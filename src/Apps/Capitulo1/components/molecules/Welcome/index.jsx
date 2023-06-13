import { createEffect } from "solid-js"
import { createModal, HeaderModal } from "../Modal"
import style from './style.module.css'


function ModalWelcome(props){
    return (
        <div className="modal bg-[var(--bg-white)] w-[500px] justify-center items-center">
            <h1 className="inter-bold text-xl text-gray-dark text-center">Seja Bem-vindo Jonathan !</h1>
            <h3 className="inter-bold text-gray-dark text-center">Obrigado por participar deste projeto</h3>
        </div>
    )
}

export default function Welcome(){
    
    const { open } = createModal(ModalWelcome, {
        id: 'modal-welcome',
        props: {
            modalId: 'modal-welcome',
        }
    })

    createEffect(()=>{
        open()
    })

    return <div onClick={open} id="modal-welcome-btn" className="hidden"></div>
}