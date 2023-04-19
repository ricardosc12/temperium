import { immer } from "@/Apps/Capitulo1/utils/immer"

function getInputsObject(form){
    let inputs = {}
    let elements = form.querySelectorAll('input')
    for(const element of elements) {
        inputs[element.id] = element
    }
    return inputs
}

export default function useForm(id) {
    const formProps = {
        submit: () => {
            const form = document.getElementById(id)
            if (!form) return
            let values = {}
            const inputs = form.querySelectorAll('input')
            for (const input of inputs) {
                values = immer(input.id, values, input.value)
            }
            return values
        },
        clear: (ids) => {
            const form = document.getElementById(id)
            if (!form) return
            const inputs = form.querySelectorAll('input')
            if (ids) {
                for (const input of inputs) {
                    if (ids.some(item => input.id.includes(item))) {
                        if (input.type == "color") input.value = "#000000"
                        else input.value = ""
                    }
                }
            }
            else {
                for (const input of inputs) {
                    if (input.type == "color") input.value = "#000000"
                    else input.value = ""
                }
            }
        },
        change: (values) => {
            const form = document.getElementById(id)
            if (!form) return
            const inputs = getInputsObject(form)
            for(const [id, value] of Object.entries(values)){
                if(inputs[id]) inputs[id].value = value
            }
            // console.log(inputs)
        }
    }
    return formProps
}