import styles from './assets/styles.module.css'
import { appWindow } from '@tauri-apps/api/window';

export default function Header() {


    function handleMaximize() {
        if(appWindow) {
            appWindow.toggleMaximize()
        }
    }
    function handleMinimize() {
        if(appWindow) {
            appWindow.minimize()
        }
    }
    function handleClose() {
        if(appWindow) {
            appWindow.close()
        }
    }


    return (
        <header data-tauri-drag-region className={styles.header}>
            <div></div>
            <div className={styles.windowOptions}>
                <div onClick={handleMinimize} className="bar"><span></span></div>
                <div onClick={handleMaximize} className="box"><span></span></div>
                <div onClick={handleClose} className="close"><span></span></div>
            </div>
        </header>
    )
}