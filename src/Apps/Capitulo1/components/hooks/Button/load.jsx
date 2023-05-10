import { render } from "solid-js/web";
import { LoadingBaseIcon } from "@/Apps/Capitulo1/assets/Icons";
export const loadButton = (id) => {
    const button = document.getElementById(id)
    button.classList.add("loading")
    let icon;
    let clone;
    let text;
    let textClone;
    button.childNodes.forEach(el => {
        if (el.tagName == 'svg') {
            icon = el
            clone = el.cloneNode(true)
        }
        else {
            text = el
            textClone = el.innerHTML
        }
    })
    text.innerHTML = "Carregando..."
    let aux = document.createElement("span")
    render(() => <LoadingBaseIcon className={icon.className.baseVal} />, aux)
    icon.innerHTML = aux.firstChild.innerHTML
    return ()=>{
        text.innerHTML = textClone
        button.classList.remove("loading")
        icon.innerHTML = clone.innerHTML
        aux.remove()
    }
}