import { PenIcon, TrashIcon } from "@/Apps/Capitulo1/assets/Icons";


export function MenuAtividade() {
    return (
        <>
            <div id="excluir">
                <TrashIcon />
                <p>Excluir</p>
            </div>
        </>
    )
}

export function MenuAtividades() {
    return (
        <>
            <div id="adicionar">
                <PenIcon />
                <p>Adicionar atividade</p>
            </div>
            <div id="excluir">
                <TrashIcon />
                <p>Excluir todas</p>
            </div>
        </>
    )
}