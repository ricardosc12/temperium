import { HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { createDarkBackgroundColor } from "@/Apps/Capitulo1/utils/color";
import { createMemo, For } from "solid-js";
import style from './style.module.css'

export default function ModalMoreInfo(props) {

    const atividade = createMemo(() => props.atividades().get(props.id) || {})
    const parentAtividade = createMemo(() => props.atividades().get(atividade().parentId) || {})

    const parentTag = props.tags()[parentAtividade().tag?.id]

    return (
        <div className={`modal ${style.modal} ${style.moreInfo}`}>
            <HeaderModal id={props.modalId} title={
                <div className="flex">
                    <span className="mr-5">{parentAtividade().title}</span>
                    {parentTag ? <div style={{
                        background: parentTag?.color,
                        color: createDarkBackgroundColor(parentTag?.color)
                    }}
                        className="tag-md">{parentTag?.title}
                    </div> : ""}
                </div>
            } />
            <div className="px-2">
                <h4 className="color-text-secondary">
                    {parentAtividade().atividade_description}
                </h4>
            </div>
            <h2 className="px-2 mt-3">Atividades</h2>
            <div className="flex mt-3 px-2 flex-wrap">
                <For each={parentAtividade().atividades}>
                    {(atv) => {
                        const tag = props.tags()[atv.tag?.id]
                        return (
                            <div className={`${style.card} ${atv.id == atividade().id ? style.target : ''}`}>
                                <span className="flex">
                                    <h3 className="mr-5">{atv.title}</h3>
                                    {tag ? (
                                        <div style={{
                                            background: tag.color,
                                            color: createDarkBackgroundColor(tag.color)
                                        }}
                                            className="tag">{tag.title}
                                        </div>
                                    ) : ''}

                                </span>
                                <h4 className="color-text-secondary mt-2">{atv.description}</h4>
                            </div>
                        )
                    }}
                </For>
            </div>
        </div>
    )
}