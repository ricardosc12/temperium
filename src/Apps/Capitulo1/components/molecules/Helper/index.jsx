import { ArrowIcon, PartyIcon, PesquisaIcon, TourIcon } from '@/Apps/Capitulo1/assets/Icons'
import { createSignal } from 'solid-js'
import { tourWelcome } from '../Tour/welcome'
import style from './style.module.css'

export default function Helper() {

    const [active, setActive] = createSignal(false)

    function handleWelcome(){
        document.getElementById('modal-welcome-btn')?.click()
    }

    function handleTour(){
        tourWelcome()
    }

    return (
        <div className={style.helper_root} active={active()} onClick={()=>setActive(false)}>
            <div className={style.content} onClick={e=>e.stopPropagation()}>
                <div className={style.toggle} onClick={()=>setActive(prev=>!prev)}>
                    <ArrowIcon />
                </div>
                <div className='pt-3 w-full flex justify-center items-center space-x-9 z-50'>
                    <span className='flex flex-col justify-center items-center w-20 cursor-pointer'>
                        <PesquisaIcon className="text-2xl text-[#b7babd]"/>
                        <h5>Pesquisa</h5>
                    </span>
                    <span onClick={handleWelcome} className='flex flex-col justify-center items-center w-20 cursor-pointer'>
                        <PartyIcon className="text-2xl text-[#b7babd]"/>
                        <h5>Boas-Vindas</h5>
                    </span>
                    <span onClick={handleTour} className='flex flex-col justify-center items-center w-20 cursor-pointer'>
                        <TourIcon className="text-2xl text-[#b7babd]"/>
                        <h5>Tour</h5>
                    </span>
                </div>
            </div>
        </div>
    )
}