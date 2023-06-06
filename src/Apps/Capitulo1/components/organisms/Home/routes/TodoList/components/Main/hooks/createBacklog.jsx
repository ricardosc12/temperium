import { createSignal, createEffect } from "solid-js"

function currentDay() {
    const days = {
        0: "dom",
        1: "seg",
        2: "ter",
        3: "qua",
        4: "qui",
        5: "sex",
        6: "sab"
    }
    return days[new Date().getDay()]
}

export const createBacklog = (dados, mode) => {

    const currDay = currentDay()
    const currWeek = 'semana1'

    const [backlog, setBacklog] = createSignal({
        intodo: [],
        inprogress: [],
        indone: []
    })

    createEffect(() => {
        const atividades = dados.inside
        const list = {
            intodo: {},
            inprogress: {},
            indone: {}
        }
        if (mode() == 'byweek') {
            if (!atividades[currWeek]) return
            Object.entries(atividades[currWeek]).forEach(([currDay,days]) => {
                Object.entries(days).forEach(([horario, atvs]) => {
                    Object.values(atvs).forEach(atv => {
                        if (atv.status) {
                            list[atv.status][atv.id] = {id: atv.id, inside: [currWeek, currDay, horario]}
                        }
                        else {
                            list['intodo'][atv.id] = {id: atv.id, inside: [currWeek, currDay, horario]}
                        }

                    })
                })
            })

        }

        else {
            if (!atividades[currWeek]) return
            Object.entries(atividades[currWeek][currDay]).forEach(([horario, atvs]) => {
                Object.values(atvs).forEach(atv => {
                    if (atv.status) {
                        list[atv.status][atv.id] = {id: atv.id, inside: [currWeek, currDay, horario]}
                    }
                    else {
                        list['intodo'][atv.id] = {id: atv.id, inside: [currWeek, currDay, horario]}
                    }

                })
            })
        }

        setBacklog({
            intodo: Object.values(list.intodo),
            inprogress: Object.values(list.inprogress),
            indone: Object.values(list.indone)
        })
    })

    return { backlog, day: currDay, week: currWeek }
}