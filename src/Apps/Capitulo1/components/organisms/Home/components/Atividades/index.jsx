import style from './style.module.css'
import { AtividadeIcon, ArrowIconSx } from '@/Apps/Capitulo1/assets/Icons';
import { CardAtividade } from './Card';
import { createEffect, createSignal } from 'solid-js';

export default function Atividades(){

    let ref;

    const [open, setOpen] = createSignal(false)
    const collapse=(e)=>{
        if(!open()) {
            setTimeout(()=>{
                ref.focus()
            },200)
        }
        setOpen(prev=>!prev)
    }

    createEffect(()=>{
        ref.colapse = onDrag
    })

    function onDrag(drag){
        if(drag===false) {
            ref.classList.remove('opacity-0')
            ref.classList.add('opacity-100')
            return
        }
        if(!open()) return
        ref.classList.remove('opacity-100')
        ref.classList.add('opacity-0')
    }

    return (
            <>
            <div className={`${style.button_colapse} ${open()?style.colapse:''}`}>
                <button tabindex="-1" onClick={collapse} class="btn-base shadow-lg">
                    <AtividadeIcon/>
                    <p>Atividades</p>
                </button>
            </div>
            <div ref={ref} onBlur={collapse} tabindex="-1" className={`${style.atividades} ${open()?style.colapse:''}`} id="lateralbar-atividades">
                <div className='m-3 ml-5 mb-6 flex-row flex justify-between'>
                    <div className='flex'>
                        <button onClick={collapse} tabindex="-1" className='btn-action-white mr-3'>
                            <ArrowIconSx className="rotate-90"/>
                        </button>
                        <h2 className='eve-md'>Atividades</h2>
                    </div>
                    <div className='flex justify-center items-center bg-black-destaq p-1 rounded-md'>
                        <AtividadeIcon/>
                    </div>
                </div>
                <div className={style.atividades_list}>
                    <CardAtividade id={'comp'} label={'Compiladores'}/>
                </div>
            </div>
            </>
    )
}