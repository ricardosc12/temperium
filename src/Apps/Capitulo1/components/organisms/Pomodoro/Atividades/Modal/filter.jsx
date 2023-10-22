import { treatValue } from "@/Apps/Capitulo1/utils/debounce"
import { createMemo, createSignal } from "solid-js"



export function createFilter(data, text) {

    function filter(item, value) {
        if (treatValue(item.title).includes(value) || treatValue(item.parentTitle).includes(value)) {
            return true
        }
        for (let idx = 0; idx < item.tags.length; idx++) {
            if (treatValue(item.tags[idx].title).includes(value)) {
                return true
            }
        }
        return false
    }

    return createMemo(() => {

        const array = data()
        const value = treatValue(text())

        return array.filter((item) => filter(item, value))
    })
}