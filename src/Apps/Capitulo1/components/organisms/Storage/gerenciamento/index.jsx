import { produce } from "solid-js/store"

export const gerenciamentoStorage = (set) => ({
    inside: {},
    hash: {},
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
            state.dados.hash[atividade] = {
                ...state.dados.hash[atividade],
                [semana]: {
                    ...state.dados.hash[atividade]?.[semana],
                    [dia]: {
                        ...state.dados.hash[atividade]?.[semana]?.[dia],
                        [intervalo]: true
                    }
                }
            }
        })),
        removeInside: ({ atividade, from: [semana, dia, intervalo] }) => set(produce((state) => {

            const items = { ...state }

            delete items.dados.inside[semana][dia][intervalo][atividade]
            delete items.dados.hash[atividade][semana][dia][intervalo]

        })),

        transferSide: ({ atividade, to: [toWeek, toDay, toInterval], from: [fromWeek, fromDay, fromInterval] }) => set(produce((state) => {

            if (state.dados.inside[toWeek]?.[toDay]?.[toInterval]?.[atividade]) return

            const items = { ...state }

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

            items.dados.hash[atividade] = {
                ...state.dados.hash[atividade],
                [toWeek]: {
                    ...state.dados.hash[atividade]?.[toWeek],
                    [toDay]: {
                        ...state.dados.hash[atividade]?.[toWeek]?.[toDay],
                        [toInterval]: true
                    }
                }
            }

            delete items.dados.inside[fromWeek][fromDay][fromInterval][atividade]
            delete items.dados.hash[atividade][fromWeek][fromDay][fromInterval]
        }))
    }

})