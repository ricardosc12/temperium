import { AddIcon, CheckIcon, EyeIcon, IconClose, PenIcon } from "@/Apps/Capitulo1/assets/Icons"
import useForm from "@/Apps/Capitulo1/components/hooks/Form"
import { createModal, HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal"
import { createEffect, createSignal, For, onMount } from "solid-js"
import style from './style.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from "../../../Storage/context"
import Select from "@/Apps/Capitulo1/components/atoms/Select"
import ListaAtividades from "./ListaAtividades"

function Modal(props) {

    const { submit, clear, change, values: form_values, submissError } = useForm('form-atv-create')

    createEffect(() => {
        if (props.id) {
            change(props)
            setState({ atividades: props.atividades })
        }
    })

    const { dados: { tags }, dispatch: { addTarefa, editTarefa } } = useStorage()

    const [state, setState] = createSignal({
        atividades: [],
        editando: false
    })

    const removerAtividade = (index) => {
        setState(prev => ({ ...prev, atividades: prev.atividades.filter((_, idx) => idx != index) }))
    }

    const editarAtividade = (index) => {
        const atividade = state().atividades[index]
        change({
            "atividades.title": atividade.title,
            "atividades.description": atividade.description,
            "atividades.tag": atividade.tag.id
        })
        setState(prev => ({ ...prev, editando: index }))
    }

    const { open, close } = createModal(() => <ListaAtividades editarAtividade={editarAtividade} removerAtividade={removerAtividade} atividades={state().atividades} />)

    const handleOpenModal = () => {
        state().atividades.length && open()
    }

    function handleAdd() {
        let values = form_values()
        if (!values.atividades.title) {
            submissError(['atividades.title'])
            return
        }
        const atividades = [...state().atividades]
        const idx_edit = state().editando
        if (idx_edit !== false) {
            atividades[idx_edit] = values.atividades
        }
        else atividades.push(values.atividades)
        setState(prev => ({ ...prev, atividades: atividades, editando: false }))
        clear(['atividades'])
    }

    function handleSave() {
        let values = submit()
        if (!state().atividades.length) return
        let atividades = JSON.parse(JSON.stringify(state().atividades))
        console.log(values)
        if (!props.id) {
            atividades = atividades.map(atv => {
                atv.id = uuidv4()
                atv.tags = [
                    { title: values.tag.title, color: values.tag.color },
                    { ...atv.tag }
                ]
                delete atv['tag']
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
        setState({ atividades: [], editando: false })
        clear()
    }

    const handleCancelEdit = () => {
        setState(prev => ({ ...prev, editando: false }))
        clear(['atividades'])
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
                {state().editando !== false ? (
                    <div className="flex space-x-3">
                        <button onClick={handleAdd} className="btn-sm white mb-5">
                            <div>
                                <PenIcon className="icon-svg-side color-black-fundo mr-1" />
                            </div>
                            <p className="font-medium">Editar</p>
                        </button>
                        <button onClick={handleCancelEdit} className="btn-sm bg-black-destaq mb-5">
                            <div>
                                <IconClose className="icon-svg-side color-white-fundo mr-1" />
                            </div>
                            <p className="font-medium">Cancelar</p>
                        </button>
                    </div>

                ) : (
                    <button onClick={handleAdd} className="btn-sm white mb-5">
                        <AddIcon />
                        <p className="font-medium">Adicionar</p>
                    </button>
                )}
                <div className="flex items-center mb-3 cursor-pointer" onClick={handleOpenModal}>
                    <EyeIcon className="icon-svg mr-3 mt-0.5" />
                    <h3 className="m-0">Sub-Atividades adicionadas: </h3>
                    <div className="flex items-center justify-center bg-white-fundo px-3 h-5 rounded-md ml-3 font-medium">{state().atividades.length}</div>
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