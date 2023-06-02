import { TrashIcon, PenIcon, IconClone } from "@/Apps/Capitulo1/assets/Icons";


export function MenuAtividadeInside() {
    return (
        <>
            <div id="excluir">
                <TrashIcon />
                <p>Excluir</p>
            </div>
            <div id="repeat">
                <IconClone />
                <p>Múltiplos</p>
            </div>
        </>
    )
}