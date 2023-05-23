import style from './style.module.css'
import { AtividadeIcon, ArrowIconSx, AddIcon } from '@/Apps/Capitulo1/assets/Icons';
import { CardAtividade } from './Card';
import { createEffect, createMemo, createSignal, For } from 'solid-js';
import CreateAtividades from '../CriarAtividades';
import { useStorage } from '../../../Storage/context';

export default function Atividades({tags}) {

    let ref;

    const [open, setOpen] = createSignal(true)

    const { dados } = useStorage()

    const collapse = (e) => {
        if (!open()) {
            setTimeout(() => {
                ref.focus()
            }, 200)
        }
        setOpen(prev => !prev)
    }

    createEffect(() => {
        ref.colapse = onDrag
    })

    function onDrag(drag) {
        if (drag === false) {
            ref.classList.remove('opacity-0')
            ref.classList.remove('translate-x-96')
            ref.classList.add('opacity-100')
            return
        }
        if (!open()) return
        ref.classList.remove('opacity-100')
        ref.classList.add('opacity-0')
        ref.classList.add('translate-x-96')
    }

    return (
        <>
            <div className={`${style.button_colapse} ${open() ? style.colapse : ''}`}>
                <button tabindex="-1" onClick={collapse} class="btn-base shadow-lg">
                    <AtividadeIcon/>
                    <p>Atividades</p>
                </button>
            </div>
            <div ref={ref} tabindex="-1" className={`${style.atividades} ${open() ? style.colapse : ''}`} id="lateralbar-atividades">
                <div className='m-3 ml-5 mb-6 flex-row flex justify-between'>
                    <div className='flex'>
                        <button onClick={collapse} tabindex="-1" className='btn-action-white mr-3'>
                            <ArrowIconSx className="rotate-90" />
                        </button>
                        <h2 className='eve-md'>Atividades</h2>
                        <CreateAtividades />
                    </div>
                    <div className='flex justify-center items-center bg-black-destaq p-1 rounded-md'>
                        <AtividadeIcon />
                    </div>
                </div>
                <div className={style.atividades_list}>
                    <For each={[...dados.disciplinas, ...dados.tarefas]}>
                        {(item) => <CardAtividade hash={dados.hash} tagsMap={tags} {...item} />}
                    </For>
                </div>
            </div>
        </>
    )
}