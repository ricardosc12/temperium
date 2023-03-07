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
            addInside:({drag,drop})=>set(produce((state)=>{
                state.dados.inside = {...state.dados.inside, 
                    [drop]:{...state.dados.inside[drop], [`i/${drop}/-${drag}`]:{
                        id:`i/${drop}/-${drag}`,
                        drop:drop
                    }}
                }
            })),
            removeInside:({drop,drag})=>set(produce((state)=>{
                const items = {...state.dados.inside}
                if(items[drop]?.[`i/${drop}/-${drag}`]) {
                    delete items[drop][`i/${drop}/-${drag}`]
                    state.dados.inside = {...items}
                }
            })),
            transferSide:({drag,drop:{from,to}})=>set(produce((state)=>{

                if(state.dados.inside[to]?.[`i/${to}/-${drag}`]) {return}

                const items = {...state}

                delete items.dados.inside[from][`i/${from}/-${drag}`]

                items.dados.inside = {...items.dados.inside, 
                    [to]:{...items.dados.inside[to], [`i/${to}/-${drag}`]:{
                        id:`i/${to}/-${drag}`,
                        drop:to
                    }}
                }
            }))
        }
    }
}))

export const CLASS_NAME = {
    po:"Programação Orientada a Objetos",
    oc:"Organização Computacional",
    bd:"Banco de Dados",
    meta:"Meta-Heurística",
    comp:"Compiladores",
    comp_sm1_atv1: "Compiladores - Estudo",
    comp_sm1_atv2: "Compiladores - Trabalho Prático"
}