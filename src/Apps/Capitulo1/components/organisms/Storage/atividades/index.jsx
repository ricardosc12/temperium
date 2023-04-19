import { produce } from "solid-js/store"

export const atividadesStorage = (set) => ({
    tarefas: [],
    dispatch: {
        addTarefa: (payload) => set(produce((state) => {
            state.dados.tarefas.push(payload)
            window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
        })),
        editTarefa: (payload) => set(produce((state) => {
            const index = state.dados.tarefas.findIndex(item => item.id_ == payload.id_)
            if (index != -1) {
                state.dados.tarefas[index] = payload
            }
            window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
        })),
        setTarefas: (payload) => set(produce((state) => {
            state.dados.tarefas = payload
        })),
        removeTarefa: (id) => set(produce((state) => {
            state.dados.tarefas = state.dados.tarefas.filter(item => item.id_ != id)
            window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
        })),
    }

})