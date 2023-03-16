import { createEffect, createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import style from './style.module.css'

function Modal({open, close, children}){

    let modal;

    const closeModal=(e)=>{
        if(e.target.id==="modal") {
            modal.classList.remove('open_modal_animation')
            setTimeout(() => {
                close()
            },225);
            
        }
    }

    createEffect(()=>{
        if(open()===true) setTimeout(() => {
            modal.classList.add('open_modal_animation')
        });
    })

    return (
        <Show when={open()}>
            <Portal>
                <div ref={modal} id="modal" onClick={closeModal} className={style.root_modal}>{children}</div>
            </Portal>
        </Show>
    )
}

export function createModal(children){
    
    const [state, setState] = createSignal(false);
    const open=()=>setState(true);
    const close=()=>setState(false);

    <Modal open={state} close={close}>{children}</Modal>

    return { open, close, state }
}

export const HeaderModal=({title})=>{

    let modal;

    function close(){
        modal.closest('[id^="modal"]').click()
    }

    return (
        <div ref={modal} className={style.header_modal}>
            <h2 className='eve-jn tracking-wide'>{title}</h2>
            <button onClick={close}>
                <svg className='icon-svg-lg' viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
            </button>
        </div>
    )
}