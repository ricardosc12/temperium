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
            addInside:({atividade,drop:[semana,dia]})=>set(produce((state)=>{
                state.dados.inside = 
                {
                    ...state.dados.inside, 
                        [semana]:{...state.dados.inside[semana], 
                            [dia]:{...state.dados.inside[semana]?.[dia], 
                                [atividade]:{
                                    id: `${atividade}`,
                                    drop: `week:${semana}dia:${dia}`
                                }
                            }
                        }
                }
            })),
            removeInside:({atividade,from:[semana,dia]})=>set(produce((state)=>{

                const items = {...state}

                delete items.dados.inside[semana][dia][atividade]

            })),

            transferSide:({atividade, to:[toWeek, toDay], from: [fromWeek, fromDay]})=>set(produce((state)=>{

                const items = {...state}

                delete items.dados.inside[fromWeek][fromDay][atividade]

                items.dados.inside = 
                {
                    ...items.dados.inside, 
                        [toWeek]:{...items.dados.inside[toWeek], 
                            [toDay]:{...items.dados.inside[toWeek]?.[toDay], 
                                [atividade]:{
                                    id: `${atividade}`,
                                    drop: `week:${toWeek}dia:${toDay}`
                                }
                            }
                        }
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