import { HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { createBackgroundColor } from "@/Apps/Capitulo1/utils/color";
import { createMemo, For } from "solid-js";
import style from './style.module.css'

export default function ModalMoreInfo(props) {

    const atividade = createMemo(() => props.atividades().get(props.id) || {})
    const parentAtividade = createMemo(() => props.atividades().get(atividade().parentId) || {})

    console.log(atividade())
    console.log(parentAtividade())

    return (
        <div className={`modal ${style.modal} ${style.moreInfo}`}>
            <HeaderModal id={props.modalId} title={
                <div className="flex">
                    <span className="mr-5">{parentAtividade().title}</span>
                    <div style={{
                        background: createBackgroundColor(parentAtividade().tag?.color),
                        color: parentAtividade().tag?.color
                    }}
                        className="tag-md">{parentAtividade().tag?.title}
                    </div>
                </div>
            } />
            <div className="px-2">
                <h4 className="color-text-secondary">
                    {parentAtividade().atividade_description}
                </h4>
            </div>
            <h2 className="px-2 mt-3">Atividades</h2>
            <div className="flex mt-3 px-2">
                <For each={parentAtividade().atividades}>
                    {(atv) => (
                        <div className={`${style.card} ${atv.id == atividade().id ? style.target : ''}`}>
                            <span className="flex">
                                <h3 className="mr-5">{atv.title}</h3>
                                <div style={{
                                    background: createBackgroundColor(atv.tag?.color),
                                    color: atv.tag?.color
                                }}
                                    className="tag">{atv.tag?.title}
                                </div>
                            </span>
                            <h4 className="color-text-secondary mt-2">{atv.description}</h4>
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}