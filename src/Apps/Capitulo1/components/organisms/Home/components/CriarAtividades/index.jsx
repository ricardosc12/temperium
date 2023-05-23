import { AddIcon, CheckIcon, EyeIcon, IconClose, PenIcon } from "@/Apps/Capitulo1/assets/Icons"
import useForm from "@/Apps/Capitulo1/components/hooks/Form"
import { createModal, HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal"
import { createEffect, createSignal, For, onMount } from "solid-js"
import style from './style.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from "../../../Storage/context"
import Select from "@/Apps/Capitulo1/components/atoms/Select"
import ListaAtividades from "./ListaAtividades"
import { loadButton } from "@/Apps/Capitulo1/components/hooks/Button/load"

function Modal(props) {

    const { submit, clear, change, values: form_values, submissError } = useForm('form-atv-create')

    onMount(() => {
        if (props.id) {
            setTimeout(() => {
                change({
                    title: props.title,
                    atividade_description: props.atividade_description || "",
                    tag: props.tag.id
                })
                setState({ atividades: props.atividades, editando: false })
                if (props.indexAtividade != undefined) {
                    editarAtividade(props.indexAtividade)
                }
            }, 150)
        }
    })

    const { dados, dispatch: { addTarefa, editTarefa } } = useStorage()

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
            "atividades.description": atividade.description || "",
            "atividades.tag": atividade.tag.id
        })
        setState(prev => ({ ...prev, editando: index }))
    }

    const { open } = createModal(() => <ListaAtividades modalId="modal-lista-atividades"
        editarAtividade={editarAtividade} removerAtividade={removerAtividade} atividades={state().atividades} />, { id: "modal-lista-atividades" })

    const handleOpenModal = () => {
        state().atividades.length && open()
    }

    function handleAdd() {
        let values = form_values()
        if (!values.atividades.title) {
            submissError(['atividades.title'])
            return false
        }
        const atividades = [...state().atividades]
        const idx_edit = state().editando
        if (idx_edit !== false) {
            atividades[idx_edit] = {
                ...atividades[idx_edit],
                title: values.atividades.title,
                tag: values.atividades.tag,
                description: values.atividades.description || ""
            }
        }
        else atividades.push(values.atividades)
        change({
            "atividades.tag": dados.tags.secondary[0].id
        })
        setState(prev => ({ ...prev, atividades: atividades, editando: false }))
        clear(['atividades'])
        return true
    }

    async function handleSave() {

        if (state().editando !== false && !handleAdd()) {
            return
        }

        const stop = loadButton('btn-create-task')
        setTimeout(() => {
            let values = submit()
            if (!state().atividades.length) {
                stop()
                return
            }
            console.time('create/edit')
            const id_task = props.id ? props.id : uuidv4()
            let atividades = JSON.parse(JSON.stringify(state().atividades))
            atividades = atividades.map(atv => {
                atv.id = atv.id ? atv.id : uuidv4()
                atv.parentId = id_task
                atv.tags = [
                    { title: values.tag.title, color: values.tag.color, id: values.tag.id },
                    { ...atv.tag }
                ]
                return atv
            })
            const result = {
                custom: true,
                id: id_task,
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
            stop()
            console.timeEnd('create/edit')
        });
    }

    const handleCancelEdit = () => {
        setState(prev => ({ ...prev, editando: false }))
        clear(['atividades'])
    }


    return (
        <div className="modal" id="form-atv-create">
            <HeaderModal id="modal-create-atividades" title="Criar Atividade" />
            <div className={style.content_modal}>
                <h4 className="color-text-secondary">Crie atividades e gerencie em conjunto com as tarefas acadêmicas.</h4>
                <div className="divisor"></div>
                <h3 className="mb-2">Atividade</h3>
                <div className="flex flex-col mb-3 space-y-4">
                    <div className="flex space-x-2">
                        <div className="textfield flex-1">
                            <input required id="title" placeholder=" " type="text" />
                            <p>Título</p>
                        </div>
                        <Select required id="tag" label="Tag" options={dados.tags.primary} />
                    </div>
                    <div className="textarea w-full">
                        <textarea required placeholder=" " className="w-full" id="atividade_description" rows="2" />
                        <p>Descrição</p>
                    </div>
                </div>
                <h3 className="mb-2">Sub-Atividades</h3>
                <div className="flex flex-col mb-5 space-y-4">
                    <div className="flex space-x-2">
                        <div className="textfield flex-1">
                            <input id={`atividades.title`} placeholder=" " type="text" />
                            <p>Título</p>
                        </div>
                        <Select id="atividades.tag" label="Tag" options={dados.tags.secondary} />
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
                    <button id="btn-create-task" onClick={handleSave} className="btn-sm white">
                        <CheckIcon className="icon-svg color-black-fundo" />
                        <p className="font-medium">Salvar</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function CreateAtividades() {

    const { open } = createModal(Modal, { closeOnBlur: false, id: "modal-create-atividades" })

    let ref;

    function handleOpen(e, props) {
        open(props)
    }

    createEffect(() => {
        ref.open = handleOpen
    })

    return (
        <div ref={ref} onClick={handleOpen} id="modal-create-atividade" className='btn-sm white ml-3'>
            <AddIcon />
            <p>Criar</p>
        </div>
    )
}