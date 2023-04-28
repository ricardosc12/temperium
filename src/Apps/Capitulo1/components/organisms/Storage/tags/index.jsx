import { produce } from "solid-js/store"

export const tagsStorage = (set) => ({
    tags: {
        primary: [
            { title: "Estudo", value: "estudo", color: '#99ffcc', id: '0' },
            { title: "TP", value: "tp", color: '#3399ff', id: '1' },
            { title: "Estágio", value: "estagio", color: '#cc99ff', id: '2' },
            { title: "Pesquisa", value: "pesquisa", color: '#9bf3a9', id: '3' },
            { title: "Aprendizado JS", value: "aprendizado_js", color: '#cc6699', id: '4' },
        ],
        secondary: []
    },
    dispatch: {
        addTag: (payload, type) => set(produce((state) => {
            state.dados.tags[type].push(payload)
            window.localStorage.setItem("tags", JSON.stringify(state.dados.tags))
        })),
        editTag: ({ title, color, id }, type) => set(produce((state) => {
            const index = state.dados.tags[type].findIndex(item => item.id == id)
            if (index != -1) {
                state.dados.tags[type][index] = { ...state.dados.tags[type][index], title: title, color: color }
            }
            window.localStorage.setItem("tags", JSON.stringify(state.dados.tags))
        })),
        setTag: (payload) => set(produce((state) => {
            state.dados.tags = payload
        })),
        removeTag: (id, type) => set(produce((state) => {
            state.dados.tags[type] = state.dados.tags[type].filter(item => item.id != id)
            window.localStorage.setItem("tags", JSON.stringify(state.dados.tags))
        })),
    }

})