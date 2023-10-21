import { createSignal, createEffect, createMemo, untrack } from "solid-js"

export const createAtividades = ( dados ) => {
    const [mapTarefas, setMapTarefas] = createSignal(new Map())
    const [mapDisciplinas, setMapDisciplinas] = createSignal(new Map())

    const atividades = createMemo(() => {
        const newMap = mapDisciplinas()
        const disciplinas = mapTarefas()
        newMap.forEach((value, key) => {
            disciplinas.set(key, value)
        })
        return disciplinas
    })

    createEffect(() => {
        console.time('mapping disciplinhas')
        const disciplinas = JSON.parse(JSON.stringify(dados.disciplinas))
        untrack(() => {
            const atividades = new Map()
            disciplinas.forEach((item, index) => {
                atividades.set(item.id, item)
                item.atividades.forEach((atividade, _) => {
                    atividades.set(atividade.id, atividade)
                })
            });
            setMapDisciplinas(atividades)
        })

        console.timeEnd('mapping disciplinhas')
    })

    createEffect(() => {
        console.time('mapping atividades')
        const tarefas = JSON.parse(JSON.stringify(dados.tarefas))
        untrack(() => {
            const atividades = new Map()
            tarefas.forEach((item, index) => {
                atividades.set(item.id, item)
                item.atividades.forEach((atividade, _) => {
                    atividades.set(atividade.id, atividade)
                })
            });
            setMapTarefas(atividades)
        })
        console.timeEnd('mapping atividades')
    })

    return atividades
}