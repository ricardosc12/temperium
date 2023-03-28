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
            addInside:({atividade,drop:[semana, dia, intervalo]})=>set(produce((state)=>{
                state.dados.inside = 
                {
                    ...state.dados.inside, 
                        [semana]:{...state.dados.inside[semana], 
                            [dia]:{...state.dados.inside[semana]?.[dia], 
                                [intervalo]:{...state.dados.inside[semana]?.[dia]?.[intervalo], 
                                    [atividade]:{
                                        id: `${atividade}`,
                                        drop: `week:${semana}dia:${dia}interval:${intervalo}`
                                    }
                                }}
                        }
                }
            })),
            removeInside:({atividade,from:[semana,dia,intervalo]})=>set(produce((state)=>{

                const items = {...state}

                delete items.dados.inside[semana][dia][intervalo][atividade]

            })),

            transferSide:({atividade, to:[toWeek, toDay, toInterval], from: [fromWeek, fromDay, fromInterval]})=>set(produce((state)=>{

                console.log(fromWeek, fromDay, fromInterval)
                console.log(toWeek, toDay, toInterval)

                if(state.dados.inside[toWeek]?.[toDay]?.[toInterval]?.[atividade]) return

                const items = {...state}

                delete items.dados.inside[fromWeek][fromDay][fromInterval][atividade]

                items.dados.inside = 
                {
                    ...items.dados.inside, 
                        [toWeek]:{...items.dados.inside[toWeek], 
                            [toDay]:{...items.dados.inside[toWeek]?.[toDay], 
                                [toInterval]: {...items.dados.inside[toWeek]?.[toDay]?.[toInterval], 
                                    [atividade]:{
                                        id: `${atividade}`,
                                        drop: `week:${toWeek}dia:${toDay}interval:${toInterval}`
                                    }
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