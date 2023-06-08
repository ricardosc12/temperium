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
            if (atividades[dados.week]) {
                Object.entries(atividades[dados.week]).forEach(([currDay, days]) => {
                    Object.entries(days).forEach(([horario, atvs]) => {
                        Object.values(atvs).forEach(atv => {
                            if (list[atv.status][atv.id]) {
                                list[atv.status][atv.id].inside.push([dados.week, currDay, horario])
                            }
                            else if (atv.status) {
                                list[atv.status][atv.id] = { id: atv.id, inside: [[dados.week, currDay, horario]] }
                            }
                            else {
                                list['intodo'][atv.id] = { id: atv.id, inside: [[dados.week, currDay, horario]] }
                            }

                        })
                    })
                })
            }
        }

        else {
            if (atividades[dados.week]?.[currDay]) {
                Object.entries(atividades[dados.week][currDay]).forEach(([horario, atvs]) => {
                    Object.values(atvs).forEach(atv => {
                        if (list[atv.status][atv.id]) {
                            list[atv.status][atv.id].inside.push([dados.week, currDay, horario])
                        }
                        else if (atv.status) {
                            list[atv.status][atv.id] = { id: atv.id, inside: [[dados.week, currDay, horario]] }
                        }
                        else {
                            list['intodo'][atv.id] = { id: atv.id, inside: [[dados.week, currDay, horario]] }
                        }

                    })
                })
            }
        }
        setBacklog({
            intodo: Object.values(list.intodo),
            inprogress: Object.values(list.inprogress),
            indone: Object.values(list.indone)
        })
    })

    return { backlog, day: currDay, week: dados.week }
}