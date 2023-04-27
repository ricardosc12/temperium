import { AddIcon, CheckIcon } from "@/Apps/Capitulo1/assets/Icons"
import useForm from "@/Apps/Capitulo1/components/hooks/Form"
import { createModal, HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal"
import { createEffect, createSignal, For } from "solid-js"
import style from './style.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from "../../../Storage/context"
import Select from "@/Apps/Capitulo1/components/atoms/Select"

function Modal(props) {

    const { submit, clear, change } = useForm('form-atv-create')

    createEffect(() => {
        if (props.id) {
            change(props)
            setState({ atividades: props.atividades })
        }
    })

    const { dados: { tags }, dispatch: { addTarefa, editTarefa } } = useStorage()

    const [state, setState] = createSignal({
        atividades: []
    })

    function handleAdd() {
        let values = submit()
        console.log(values)
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
        if (!props.id) {
            atividades = atividades.map(atv => {
                atv.id = uuidv4()
                atv.tags = Object.values(atv.tags)
                atv.tags = atv.tags.filter(tg => tg.title)
                atv.tags.splice(0, 0, { title: values.title, color: values.cor })
                return atv
            })
        }
        const result = {
            custom: true,
            id_: props.id ? props.id_ : uuidv4(),
            ...values,
            atividades: atividades
        }
        if (props.id) {
            editTarefa(result)
        }
        else {
            addTarefa(result)
        }
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
                        <div className="textfield flex-1">
                            <input required id="title" placeholder=" " type="text" />
                            <p>Título</p>
                        </div>
                        <Select required id="tag" label="Tag" options={tags.primary} />
                    </div>
                    <div className="textarea w-full">
                        <textarea required placeholder=" " className="w-full" id="atividade_description" rows="2" />
                        <p>Descrição</p>
                    </div>
                </div>
                <h3 className="mb-2">Atividades</h3>
                <div className="flex flex-col mb-5 space-y-4">
                    <div className="flex space-x-2">
                        <div className="textfield flex-1">
                            <input id={`atividades.title`} placeholder=" " type="text" />
                            <p>Título</p>
                        </div>
                        <Select id="atividades.tag" label="Tag" options={tags.secondary} />
                    </div>
                    <div className="textarea w-full">
                        <textarea placeholder=" " className="w-full" id="atividades.description" rows="2" />
                        <p>Descrição</p>
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

    const { open, close } = createModal(Modal, { closeOnBlur: false })

    let ref;

    function handleOpen(e, props) {
        open(props)
    }

    createEffect(() => {
        ref.open = handleOpen
        open()
    })

    return (
        <div ref={ref} onClick={handleOpen} id="modal-create-atividade" className='btn-sm white ml-3'>
            <AddIcon />
            <p>Criar</p>
        </div>
    )
}