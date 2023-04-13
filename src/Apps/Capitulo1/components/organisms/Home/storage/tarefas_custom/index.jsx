import create from 'solid-zustand'
import produce from 'immer'

export const useTarefas = create(set => ({
    dados: {
        tarefas: []
    },
    change: {
        dispatch: {
            addTarefa: (payload) => set(produce((state) => {
                state.dados.tarefas.push(payload)
                window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
            })),
            setTarefas: (payload) => set(produce((state) => {
                state.dados.tarefas = payload
            })),
            removeTarefa: (id) => set(produce((state) => {
                state.dados.tarefas = state.dados.tarefas.filter(item => item.id != id)
                window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
            })),
        }
    }
}))
