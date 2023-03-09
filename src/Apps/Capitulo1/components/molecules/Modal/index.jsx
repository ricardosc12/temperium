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
                <div ref={modal} id="modal" onClick={closeModal} class={style.root_modal}>{children}</div>
            </Portal>
        </Show>
    )
}

export function createModal(children){
    
    const [state, setState] = createSignal(false);
    const open=()=>setState(true);
    const close=()=>setState(false);

    <Modal open={state} close={close}>{children}</Modal>

    return { open, close }
}