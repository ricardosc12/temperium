import style from './style.module.css'
import { createSignal, For } from 'solid-js'
import MenuIcon from './menu_icon' 

const capitulos = [
    {text:"Cap 1",id:1},
    {text:"Cap 2",id:2},
]

export default function MenuCapitulos({handleChange}) {

    const [expand, setExpand] = createSignal(false)

    let menu;

    const handleExpand=()=>{
        if(expand()===false) menu.focus()
        setExpand((prev)=>!prev)
    }

    return (
        <>

            <div className={`${style.black_screen} ${expand()===true?style.black_screen_active:''}`}></div>

            <div ref={menu} onBlur={handleExpand} tabIndex={-1} className={`${style.menu_capitulos} ${expand()?style.expand_menu:''} outline-0`}>
                <For each={capitulos} fallback={<div>Loading...</div>}>
                    {(item)=>(
                        <div onClick={(ev)=>{menu.blur();handleChange(item.id);}}>{item.text}</div>
                    )}
                </For>
            </div>

            <div onClick={handleExpand} className={`${style.button} ${expand()===true?style.button_disable:''}`}>
                <MenuIcon/>
            </div>

        </>
    )
}