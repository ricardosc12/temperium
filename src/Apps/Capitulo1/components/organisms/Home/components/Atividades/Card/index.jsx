import {
    createDraggable,
} from "@thisbeyond/solid-dnd";
import style from './style.module.css'
import { ArrowIcon, IconGrab, IconRead } from "@/Apps/Capitulo1/assets/Icons";
import { batch, createEffect, createSignal, For } from "solid-js";
import { createMenu } from "@/Apps/Capitulo1/components/hooks/Menu";
import { MenuAtividade } from "@/Apps/Capitulo1/components/hooks/Menu/atividades_menu";
import { openModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { useStorage } from "../../../../Storage/context";
import { Draggable as DraggableHook } from "@/Apps/Capitulo1/components/hooks/DragAndDrop";

const Draggable = ({ id, children, title, tags, ...props }) => {
    return (
        <DraggableHook data={id} className={props.className}>
            {children}
        </DraggableHook>
    );
};

const Atividade = ({ id, title, children, icon, label, tags, tagsMap, ...props }) => {
    return (
        <Draggable className="w-full" id={id} title={label + " - " + title} tags={tags}>
            <div onContextMenu={props.onContextMenu} className="w-full flex flex-row items-center mb-5">
                <div className={style.icon_grab}><IconGrab /></div>
                <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex space-x-2 items-center">
                            <h5>{title}</h5>
                            <div className="tag-sm" style={{
                                background: tagsMap()[tags[tags.length - 1].id] ? tagsMap()[tags[tags.length - 1].id].color : tags[tags.length - 1].color
                            }}>
                                {tagsMap()[tags[tags.length - 1].id] ? tagsMap()[tags[tags.length - 1].id].title : tags[tags.length - 1].title}
                            </div>
                        </div>
                        <div>{icon}</div>
                    </div>
                    <p>{children}</p>
                </div>
            </div>
        </Draggable>
    )
}

export function CardAtividade({ id, title, atividades, atividade_description, tag, custom, tagsMap, ...props }) {

    const [open, setOpen] = createSignal(true)
    const collapse = () => setOpen(prev => !prev)

    const { dispatch: { removeTarefa, removeInside } } = useStorage()

    let ref;

    createEffect(() => {
        ref.style.setProperty('--max-height', ref.scrollHeight + 'px');
    })

    async function menu(e, atividadeId, index) {
        console.log(atividadeId)
        e.stopPropagation()
        if (!custom) return
        const menu_resp = await createMenu(e, MenuAtividade)
        if (menu_resp == "excluir") {
            batch(() => {
                console.time('removing')
                document.querySelectorAll(`[id="${id}"]`).forEach(el => {
                    const [id, data] = el.getAttribute('data-drag').split('::')
                    if (atividadeId && id != atividadeId) return;
                    removeInside({
                        atividade: id,
                        from: data.split(/week:|dia:|interval:/).filter(Boolean)
                    })
                })
                removeTarefa(id, atividadeId)
                console.timeEnd('removing')
            })

        }
        else if (menu_resp == "editar") {
            openModal("modal-create-atividade", {
                id, indexAtividade: index, title, atividades: [...atividades], atividade_description, tag, custom, ...props
            })
        }
    }

    return (
        <div ref={ref} className={`${style.card_atividade} ${open() ? style.collapse : ''}`} onContextMenu={menu}>
            <div onClick={collapse} className="flex items-center justify-between w-full">
                <div className="flex space-x-3">
                    <h2 className="text-sm">{title}</h2>
                    <div className="tag" style={{
                        background: tagsMap()[tag.id] ? tagsMap()[tag.id].color : tag.color
                    }}>
                        {tagsMap()[tag.id] ? tagsMap()[tag.id].title : tag.title}
                    </div>
                </div>
                <div className={style.icon_card_atividade}>
                    <ArrowIcon />
                </div>
            </div>
            <div className={style.atividades}>
                <h5>{atividade_description}</h5>
                <div className={style.divisor}></div>
                <div className={style.main_atividades}>
                    <For each={atividades}>
                        {(item, index) => {
                            return (
                                <Atividade id={item.id} title={item.title}
                                    tagsMap={tagsMap}
                                    label={title} icon={<IconRead />} {...item}
                                    onContextMenu={(e) => menu(e, item.id, index())}
                                >
                                    {item.description}
                                </Atividade>
                            )
                        }}
                    </For>
                </div>
            </div>
        </div>
    )
}