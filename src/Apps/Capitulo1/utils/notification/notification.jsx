import style from './style.module.css'
import { createRoot, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import { IconExclamation } from '../../assets/Icons';

let timer;
let time = 3000;

function NotifyComponent({ message, icon }) {

    onMount(() => {
        startTime()
    })

    function startTime() {
        document.getElementById('tp-notify-progress')?.classList.remove(style.stop)
        timer = setTimeout(() => {
            document.getElementById('tp-notify')?.remove()
        }, time);
    }

    function stopTime() {
        document.getElementById('tp-notify-progress')?.classList.add(style.stop)
        clearTimeout(timer)
    }

    return (
        <div className={style.root_notify} onMouseEnter={stopTime} onMouseLeave={startTime}>
            <span id='tp-notify-progress' className={style.progress}></span>
            <div className='flex h-full items-center ml-[.9rem]'>
                <span className={style.icon}>
                    <IconExclamation className="icon-svg-lg text-3xl"/>
                </span>
                <h4 className='whitespace-nowrap'>{message}</h4>
            </div>
        </div>
    )
}


export function notify(message, type) {

    clearTimeout(timer)

    const el_notify = document.getElementById('tp-notify')
    if (el_notify) el_notify.remove()

    const new_notify = document.createElement('div')
    new_notify.className = style.container_notify
    new_notify.id = 'tp-notify'
    new_notify.style.setProperty('--timer', time + 'ms');

    createRoot(() => {
        render(() => <NotifyComponent message={message} />, new_notify)
    })

    document.body.appendChild(new_notify)

    console.log('notify')
}