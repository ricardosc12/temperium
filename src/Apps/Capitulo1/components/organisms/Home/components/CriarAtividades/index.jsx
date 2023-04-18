import { AddIcon, CheckIcon } from "@/Apps/Capitulo1/assets/Icons"
import useForm from "@/Apps/Capitulo1/components/hooks/Form"
import { createModal, HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal"
import { createEffect, createSignal, For } from "solid-js"
import style from './style.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useTarefas } from "../../storage/tarefas_custom"

function Modal(props) {

    const { submit, clear } = useForm('form-atv-create')

    let editing = false;

    const { addTarefa } = useTarefas(state => state.change.dispatch)

    const [state, setState] = createSignal({
        atividades: []
    })

    function handleAdd() {
        let values = submit()
        if (!values.atividades.title || !values.atividades.description) return
        const atividades = [...state().atividades]
        atividades.push(values.atividades)
        setState(prev => ({ ...prev, atividades: atividades }))
        clear(['atividades'])
    }

    function handleSave() {
        let values = submit()
        if (!state().atividades.length) return
        let atividades = JSON.parse(JSON.stringify(state().atividades))
        atividades = atividades.map(atv => {
            atv.id = uuidv4()
            atv.tags = Object.values(atv.tags)
            atv.tags = atv.tags.filter(tg => tg.title)
            atv.tags.splice(0, 0, { title: values.title, color: values.cor })
            return atv
        })
        const result = {
            custom: true,
            ...values,
            atividades: atividades
        }
        addTarefa(result)
        setState({ atividades: [] })
        clear()
    }

    return (
        <div className="modal" id="form-atv-create">
            <HeaderModal title="Criar Atividade" />
            <div className={style.content_modal}>
                <h4 className="color-text-secondary">Crie atividades e gerencie em conjunto com as tarefas acadêmicas.</h4>
                <div className="divisor"></div>
                <h3 className="mb-2">Categoria</h3>
                <div className="flex flex-col mb-3 space-y-4">
                    <div className="flex space-x-2">
                        <div className="textfield">
                            <input id="title" placeholder=" " type="text" />
                            <p>Título</p>
                        </div>
                        <div className="textfield">
                            <input id="atividade_description" placeholder=" " type="text" />
                            <p>Descrição</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="textfield">
                            <input id="id" placeholder=" " type="text" />
                            <p>Tag Name</p>
                        </div>
                        <div className="colorfield">
                            <input id="cor" type="color" />
                            <p>Cor</p>
                        </div>
                    </div>
                </div>
                <h3 className="mb-2">Atividades</h3>
                <div className="flex flex-col mb-5 space-y-4">
                    <div className="flex space-x-2">
                        <div className="textfield">
                            <input id={`atividades.title`} placeholder=" " type="text" />
                            <p>Título</p>
                        </div>
                        <div className="textfield">
                            <input id={`atividades.description`} placeholder=" " type="text" />
                            <p>Descrição</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="textfield">
                            <input id={`atividades.tags.0.title`} placeholder=" " type="text" />
                            <p>Tag Name</p>
                        </div>
                        <div className="colorfield">
                            <input id={`atividades.tags.0.color`} type="color" />
                            <p>Cor</p>
                        </div>
                        <div className="textfield">
                            <input id={`atividades.tags.1.title`} placeholder=" " type="text" />
                            <p>Tag Name</p>
                        </div>
                        <div className="colorfield">
                            <input id={`atividades.tags.1.color`} type="color" />
                            <p>Cor</p>
                        </div>
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
                                {(item, index) => (
                                    <div className="flex space-x-3 items-center">
                                        <p>{index() + 1}.</p>
                                        <p>{item.title}</p>
                                        <p>{item.description}</p>
                                        {Object.values(item.tags).map(tg => {
                                            return <p className="px-3 py-1 rounded-sm" style={{ background: tg.color }}>{tg.title}</p>
                                        })}
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
                        <CheckIcon />
                        <p className="font-medium">Salvar</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function CreateAtividades() {

    const { open, close } = createModal(Modal, { closeOnBlur: false, props: { teste: 'teste' } })

    function handleOpen(props){
        open(props)
    }

    return (
        <div onClick={handleOpen} id="modal-create_atividade" className='btn-sm white ml-3'>
            <AddIcon />
            <p>Criar</p>
        </div>
    )
}