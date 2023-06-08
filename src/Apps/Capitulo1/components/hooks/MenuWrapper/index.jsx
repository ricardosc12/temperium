import { createRoot } from "solid-js"
import { render } from "solid-js/web"

export function createMenuWrapper({ x, y, data }, Menu) {

    let removed = document.getElementById("menu-wrapper")
    if (removed) removed.remove()

    let menu_e = document.createElement('DIV')
    menu_e.className = "menu-wrapper"
    menu_e.tabIndex = "-1"
    menu_e.style.top = y + "px"
    menu_e.style.left = x + "px"
    menu_e.id = "menu-wrapper"

    document.body.appendChild(menu_e)

    const promise = new Promise(resolve=>{

        menu_e.onblur = (e) => {
            menu_e?.remove()
            setTimeout(() => resolve(false))
        }

        menu_e.focus()

        createRoot(() => {
            render(() => <Menu el={menu_e} resolve={resolve} data={data}/>, menu_e)
        })
        
    })    

    return promise
}