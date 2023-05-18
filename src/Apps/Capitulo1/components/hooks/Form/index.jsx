import { immer } from "@/Apps/Capitulo1/utils/immer"

function getInputsObject(form){
    let inputs = {}
    let input_elements = form.querySelectorAll('input')
    let textarea_elements = form.querySelectorAll('textarea')
    for(const element of input_elements) {
        inputs[element.id] = element
    }
    for(const element of textarea_elements) {
        inputs[element.id] = element
    }
    return inputs
}

export function values(id){
    const form = document.getElementById(id)
    if (!form) return
    let values = {}
    const inputs = form.querySelectorAll('input')
    const textarea = form.querySelectorAll('textarea')
    for (const input of inputs) {
        if(input['data-value']) values = immer(input.id, values, input['data-value']) 
        else values = immer(input.id, values, input.value)
    }
    for (const input of textarea) {
        values = immer(input.id, values, input.value)
    }
    return values
}

export function change(id,values){
    const form = document.getElementById(id)
    if (!form) return
    const inputs = getInputsObject(form)
    for(const [id, value] of Object.entries(values)){
        if(inputs[id]['data-set']) {
            inputs[id]['data-set'](value)
        }
        else if(inputs[id]) inputs[id].value = value
    }
}

export default function useForm(id) {
    const formProps = {
        submit: () => {
            const form = document.getElementById(id)
            if (!form) return
            let values = {}
            const inputs = form.querySelectorAll('input')
            const textarea = form.querySelectorAll('textarea')
            for (const input of inputs) {
                if(input.required) input.parentNode.classList.add('error')
                if(input['data-value']) values = immer(input.id, values, input['data-value']) 
                else values = immer(input.id, values, input.value)
            }
            for (const input of textarea) {
                if(input.required) input.parentNode.classList.add('error')
                values = immer(input.id, values, input.value)
            }
            return values
        },
        submissError:(ids)=>{
            const form = document.getElementById(id)
            if (!form) return
            for(const id of ids) {
                const el = form.querySelector('#'+id.replace('.','\\.'))
                if(el && (el.tagName == "INPUT" || el.tagName == "TEXTAREA")) {
                    el.parentNode.classList.add('error')
                    setTimeout(() => {
                        el.parentNode.classList.remove('error')
                    }, 2000);
                }
            }
        },
        values:()=>{
            const form = document.getElementById(id)
            if (!form) return
            let values = {}
            const inputs = form.querySelectorAll('input')
            const textarea = form.querySelectorAll('textarea')
            for (const input of inputs) {
                if(input['data-value']) values = immer(input.id, values, input['data-value']) 
                else values = immer(input.id, values, input.value)
            }
            for (const input of textarea) {
                values = immer(input.id, values, input.value)
            }
            return values
        },
        clear: (ids) => {
            const form = document.getElementById(id)
            if (!form) return
            const inputs = form.querySelectorAll('input')
            const textarea = form.querySelectorAll('textarea')
            if (ids) {
                for (const input of inputs) {
                    if (ids.some(item => input.id.includes(item))) {
                        if (input.type == "color") input.value = "#000000"
                        else input.value = ""
                        input.placeholder = " "
                        input.parentNode.classList.remove('error')
                    }
                }
                for (const input of textarea) {
                    if (ids.some(item => input.id.includes(item))) {
                        input.value = ""
                        input.placeholder = " "
                        input.parentNode.classList.remove('error')
                    }
                }
            }
            else {
                for (const input of inputs) {
                    if (input.type == "color") input.value = "#000000"
                    else input.value = ""
                    input.placeholder = " "
                    input.parentNode.classList.remove('error')
                }
                for (const input of textarea) {
                    input.value = ""
                    input.placeholder = " "
                    input.parentNode.classList.remove('error')
                }
            }
        },
        change: (values) => {
            const form = document.getElementById(id)
            if (!form) return
            const inputs = getInputsObject(form)
            for(const [id, value] of Object.entries(values)){
                if(inputs[id]['data-set']) {
                    inputs[id]['data-set'](value)
                }
                else if(inputs[id]) inputs[id].value = value
            }
        }
    }
    return formProps
}