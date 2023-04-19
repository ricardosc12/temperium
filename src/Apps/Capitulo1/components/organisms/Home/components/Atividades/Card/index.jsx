import {
    createDraggable,
} from "@thisbeyond/solid-dnd";
import style from './style.module.css'
import { ArrowIcon, IconGrab, IconRead } from "@/Apps/Capitulo1/assets/Icons";
import { createEffect, createSignal, For } from "solid-js";
import { createMenu } from "@/Apps/Capitulo1/components/hooks/Menu";
import { MenuAtividade } from "@/Apps/Capitulo1/components/hooks/Menu/atividades_menu";
import { openModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { useStorage } from "../../../../Storage/context";

const Draggable = ({ id, children, title, tags, ...props }) => {
    const draggable = createDraggable(id, { title, tags });

    return (
        <div use:draggable className={`
        cursor-pointer
        ${draggable.isActiveDraggable ? 'opacity-75 border-green' : ''}`}
            {...props}
        >
            {children}
        </div>
    );
};

const Atividade = ({ id, title, children, icon, label, tags }) => {
    return (
        <Draggable className="w-full" id={id} title={label + " - " + title} tags={tags}>
            <div className="w-full flex flex-row items-center mb-5">
                <div className={style.icon_grab}><IconGrab /></div>
                <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex space-x-2 items-center">
                            <h5>{title}</h5>
                            <div className="tag-sm" style={{ background: tags[tags.length - 1].color }}>{tags[tags.length - 1].title}</div>
                        </div>
                        <div>{icon}</div>
                    </div>
                    <p>{children}</p>
                </div>
            </div>
        </Draggable>
    )
}

export function CardAtividade({ id, title, atividades, atividade_description, cor, custom, ...props }) {

    const [open, setOpen] = createSignal(true)
    const collapse = () => setOpen(prev => !prev)

    const { dispatch: { removeTarefa } } = useStorage()

    let ref;

    createEffect(() => {
        ref.style.setProperty('--max-height', ref.scrollHeight + 'px');
    })

    async function menu(e) {
        if (!custom) return
        const menu_resp = await createMenu(e, MenuAtividade)
        if (menu_resp == "excluir") {
            removeTarefa(props.id_)
        }
        else if (menu_resp == "editar") {
            openModal("modal-create-atividade", {
                id, title, atividades, atividade_description, cor, custom, ...props
            })
        }
    }

    return (
        <div ref={ref} className={`${style.card_atividade} ${open() ? style.collapse : ''}`} onContextMenu={menu}>
            <div onClick={collapse} className="flex items-center justify-between w-full">
                <div className="flex space-x-3">
                    <h2 className="text-sm">{title}</h2>
                    <div className="tag" style={{ background: cor }}>{id}</div>
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
                        {(item) => {
                            return (
                                <Atividade id={item.id} title={item.title} label={title} icon={<IconRead />} {...item}>
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