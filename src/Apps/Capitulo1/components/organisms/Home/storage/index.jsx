import create from 'solid-zustand'
import produce from 'immer'

export const useStore = create(set=>({
    dados:{
        inside:{
            // teste:'teste'
        }
    },
    change: {
        dispatch: {
            addInside:(payload)=>set(produce((state)=>{
                state.dados.inside = {...state.dados.inside, [`i-${payload}`]:{id:`i-${payload}`}}
            })),
            removeInside:(payload)=>set(produce((state)=>{
                const items = {...state.dados.inside}
                delete items[`i-${payload}`]
                state.dados.inside = {...items}
            })),
        }
    }
}))

export const CLASS_NAME = {
    po:"Programação Orientada a Objetos",
    oc:"Organização Computacional",
    bd:"Banco de Dados",
    meta:"Meta-Heurística",
    comp:"Compiladores"
}