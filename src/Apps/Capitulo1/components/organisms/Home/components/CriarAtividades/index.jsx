import { AddIcon, CheckIcon } from "@/Apps/Capitulo1/assets/Icons"
import useForm from "@/Apps/Capitulo1/components/hooks/Form"
import { createModal, HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal"
import { createEffect, createSignal, For } from "solid-js"
import style from './style.module.css'

function Modal() {

    const { submit, clear } = useForm('form-atv-create')

    const [state, setState] = createSignal({
        atividades: []
    })

    function handleAdd() {
        let values = submit()
        if(!values.atividades.titulo || !values.atividades.descricao) return 
        const atividades = [...state().atividades]
        atividades.push(values.atividades)
        setState(prev=>({...prev, atividades:atividades}))
        clear(['atividades'])
    }

    function handleSave(){
        let values = submit()
        const result = {
            ...values,
            atividades:state().atividades
        }
        console.log(result)
        clear()
    }
    
    return (
        <div className="modal" id="form-atv-create">
            <HeaderModal title="Criar Atividade" />
            <div className={style.content_modal}>
                <h4 className="color-text-secondary">Crie atividades e gerencie em conjunto com as tarefas acadêmicas.</h4>
                <div className="divisor"></div>
                <h3 className="mb-2">Categoria</h3>
                <div className="flex space-x-2 mb-3">
                    <div>
                        <p>Título</p>
                        <input id="titulo" type="text" />
                    </div>
                    <div>
                        <p>Descrição</p>
                        <input id="descricao" type="text" />
                    </div>
                    <div>
                        <p>Cor</p>
                        <input id="tag" type="color"/>
                    </div>
                </div>
                <h3 className="mb-2">Atividades</h3>
                <div className="flex space-x-2 mb-5">
                    <div>
                        <p>Título</p>
                        <input id={`atividades.titulo`} type="text" />
                    </div>
                    <div>
                        <p>Descrição</p>
                        <input id={`atividades.descricao`} type="text" />
                    </div>
                    <div>
                        <p>Cor</p>
                        <input id={`atividades.tag`} type="color" />
                    </div>
                </div>
                <button onClick={handleAdd} className="btn-sm white mb-5">
                    <AddIcon />
                    <p className="font-medium">Adicionar</p>
                </button>
                <h3 className="mb-3">Sub-Atividades adicionadas</h3>
                <div className="mb-5">
                    {state().atividades.length ?
                        (
                            <For each={state().atividades}>
                                {(item,index)=>(
                                    <div className="flex space-x-3">
                                        <p>{index()+1}.</p>
                                        <p>{item.titulo}</p>
                                        <p>{item.descricao}</p>
                                        <p style={{background:item.tag}}>{item.tag}</p>
                                    </div>
                                )}
                            </For>
                        )
                        :
                        <h3 className="color-text-secondary">Nenhuma atividade adicionada</h3>
                    }
                </div>
                <div className="flex w-full items-center justify-end mb-2">
                    <button onClick={handleSave} className="btn-sm white">
                        <CheckIcon/>
                        <p className="font-medium">Salvar</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function CreateAtividades() {

    const { open, close } = createModal(<Modal />)

    return (
        <div onClick={open} className='btn-sm white ml-3'>
            <AddIcon />
            <p>Criar</p>
        </div>
    )
}