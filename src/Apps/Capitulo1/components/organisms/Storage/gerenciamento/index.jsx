import { produce } from "solid-js/store"

export const gerenciamentoStorage = (set) => ({
    inside: {
    },
    dispatch: {
        addInside: ({ atividade, drop: [semana, dia, intervalo], title, tags }) => set(produce((state) => {
            state.dados.inside =
            {
                ...state.dados.inside,
                [semana]: {
                    ...state.dados.inside[semana],
                    [dia]: {
                        ...state.dados.inside[semana]?.[dia],
                        [intervalo]: {
                            ...state.dados.inside[semana]?.[dia]?.[intervalo],
                            [atividade]: {
                                id: `${atividade}`,
                                drop: `week:${semana}dia:${dia}interval:${intervalo}`,
                            }
                        }
                    }
                }
            }
        })),
        removeInside: ({ atividade, from: [semana, dia, intervalo] }) => set(produce((state) => {

            const items = { ...state }

            delete items.dados.inside[semana][dia][intervalo][atividade]

        })),

        transferSide: ({ atividade, to: [toWeek, toDay, toInterval], from: [fromWeek, fromDay, fromInterval] }) => set(produce((state) => {

            if (state.dados.inside[toWeek]?.[toDay]?.[toInterval]?.[atividade]) return

            const items = { ...state }

            const removed = items.dados.inside[fromWeek][fromDay][fromInterval][atividade]

            items.dados.inside =
            {
                ...items.dados.inside,
                [toWeek]: {
                    ...items.dados.inside[toWeek],
                    [toDay]: {
                        ...items.dados.inside[toWeek]?.[toDay],
                        [toInterval]: {
                            ...items.dados.inside[toWeek]?.[toDay]?.[toInterval],
                            [atividade]: {
                                id: `${atividade}`,
                                drop: `week:${toWeek}dia:${toDay}interval:${toInterval}`
                            }
                        }
                    }
                }
            }

            delete items.dados.inside[fromWeek][fromDay][fromInterval][atividade]
        }))
    }

})