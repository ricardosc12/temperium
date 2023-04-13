import { createRoot } from "solid-js"
import { render } from "solid-js/web"

export function createMenu(e, Menu) {

    let removed = document.getElementById("menu-option")
    if (removed) removed.remove()

    let x = e.clientX
    let y = e.clientY
    let menu_e = document.createElement('DIV')
    menu_e.className = "menu"
    menu_e.tabIndex = "-1"
    menu_e.style.top = y + "px"
    menu_e.style.left = x + "px"
    menu_e.id = "menu-option"

    document.body.appendChild(menu_e)

    createRoot(() => {
        render(()=><Menu />, menu_e)
    })
    
    menu_e.focus()

    e.preventDefault();
    e.stopPropagation();

    return new Promise(resolve=>{
        menu_e.onblur = (e) => {
            if(e.relatedTarget===null) return
            menu_e?.remove()
            resolve(false)
        }
    
        menu_e.onclick = (e) => {
            try{menu_e?.remove()}
            catch{}
            resolve(e.target.id)
        }
    })
}