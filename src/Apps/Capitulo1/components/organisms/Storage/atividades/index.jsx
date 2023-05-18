import { produce } from "solid-js/store"

export const atividadesStorage = (set) => ({
    tarefas: [],
    dispatch: {
        addTarefa: (payload) => set(produce((state) => {
            state.dados.tarefas.push(payload)
            window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
        })),
        editTarefa: (payload) => set(produce((state) => {
            const index = state.dados.tarefas.findIndex(item => item.id == payload.id)
            if (index != -1) {
                state.dados.tarefas[index] = payload
            }
            window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
        })),
        setTarefas: (payload) => set(produce((state) => {
            state.dados.tarefas = payload
        })),
        removeTarefa: (id, subId) => set(produce((state) => {
            if (subId) {
                const index = state.dados.tarefas.findIndex(item => item.id == id)
                if (index != -1) {
                    for (let idx = 0; idx < state.dados.tarefas[index].atividades.length; idx++) {
                        if (state.dados.tarefas[index].atividades[idx].id == subId) {
                            state.dados.tarefas[index].atividades.splice(idx, 1)
                            break
                        }
                    }
                }
            }
            else {
                state.dados.tarefas = state.dados.tarefas.filter(item => item.id != id)
            }
            window.localStorage.setItem("disciplinas", JSON.stringify(state.dados.tarefas))
        })),
    }

})