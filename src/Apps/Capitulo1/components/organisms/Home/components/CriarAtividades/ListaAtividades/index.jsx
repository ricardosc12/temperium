import { IconClose, PenIcon, TrashIcon } from "@/Apps/Capitulo1/assets/Icons";
import { HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { For } from "solid-js";
import style from './style.module.css'

export default function ListaAtividades(props) {

    let refModal;

    const close = () => {
        refModal.closest('[id^="modal"]').click()
    }

    const handleEdit = index => {
        props.editarAtividade(index)
        close()
    }

    const handleRemove = (e, index) => {
        props.removerAtividade(index)
        e.stopPropagation()
        if(props.atividades.length==0) {
            close()
        }
    }

    return (
        <div ref={refModal} className="modal">
            <HeaderModal title={"Sub-Atividades adicionadas"} />
            <div className={style.content_atividades}>
                <h4 className="color-text-secondary">
                    Visualize ou edite as sub-tarefas adicionadas.
                    <p>Clique no card para editar ou no ícone de exclusão para excluir.</p>
                </h4>
                <div className="divisor"></div>
            </div>
            <div>
                <For each={props.atividades || []}>
                    {(item, index) => {
                        return (
                            <div className={style.atividade_item}>
                                <div className="flex items-center justify-between">
                                    <div className="flex">
                                        <h3>{item.title}</h3>
                                        <span className="tag-sm ml-4 font-medium text-xs" style={{ background: item.tag.color }}>{item.tag.title}</span>
                                    </div>
                                    <div className="flex space-x-5 mr-2">
                                        <div className="icon" onClick={(e) => handleRemove(e, index())}>
                                            <TrashIcon className="icon-svg color-white-fundo" />
                                        </div>
                                        <div className="icon" onClick={(e) => handleEdit(index())}>
                                            <PenIcon className="icon-svg color-white-fundo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <h4 className="color-text-secondary">{item.description}</h4>
                                </div>
                            </div>
                        )
                    }}
                </For>
            </div>
        </div>
    )
}