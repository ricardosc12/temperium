import styles from './assets/styles.module.css'


export default function Header(){
    return (
        <header className={styles.header}>
            <div></div>
            <div className={styles.windowOptions}>
                <div className="bar"></div>
                <div className="box"></div>
                <div className="close"></div>
            </div>
        </header>
    )
}