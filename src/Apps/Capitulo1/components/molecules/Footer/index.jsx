import style from './style.module.css'
import { createModal } from '../Modal'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { VERSION } from '@/config/version'

const ModalUpdate = () => {

    async function update() {
        try {
            const { shouldUpdate, manifest } = await checkUpdate()
            console.log('antes', shouldUpdate)
            if (shouldUpdate) {
                // display dialog
                const update = await installUpdate()
                console.log(shouldUpdate, update)
                // install complete, restart the app
                await relaunch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={update}>Update</button>
    )
}

export default function Footer() {

    const { open, close } = createModal(() => {
        return (
            <div className="flex w-52 h-32 bg-white-fundo rounded-2xl items-center justify-center">
                <ModalUpdate />
            </div>
        )
    })

    return (
        <footer className={style.footer}>
            <div className='flex w-full h-full items-center justify-end px-4'>
                <p className='eve color-text-secondary text-xs'><button className='tracking-wide' onClick={open}>Versão {VERSION}</button></p>
            </div>
        </footer>
    )
}