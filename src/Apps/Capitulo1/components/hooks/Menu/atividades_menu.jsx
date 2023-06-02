import { TrashIcon, PenIcon, IconClone } from "@/Apps/Capitulo1/assets/Icons";


export function MenuAtividade() {
    return (
        <>
            <div id="excluir">
                <TrashIcon/>
                <p>Excluir</p>
            </div>
            <div id="editar">
                <PenIcon/>
                <p>Editar</p>
            </div>
            <div id="repeat">
                <IconClone />
                <p>Múltiplos</p>
            </div>
        </>
    )
}