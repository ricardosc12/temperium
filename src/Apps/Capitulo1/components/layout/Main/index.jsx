import style from './assets/styles.module.css'
import introJs from 'intro.js'
import Sidebar from '../../molecules/Sidebar'
import { createSignal } from 'solid-js'
import HomePage from '../../organisms/Home'
import CalendarPage from '../../organisms/Calendar'

export default function MainApp(){

	const [route, setRoute] = createSignal('home')

    return (
        <main className={style.main_app}>
			<div className={style.content}>

				<Sidebar setRoute={setRoute}/>

				<div className={style.main_content}>
					<Switch fallback={<div>Not Found</div>}>
					
						<Match when={route() === 'home'}>
							<HomePage />
						</Match>

						<Match when={route() === 'calendar'}>
							<CalendarPage />
						</Match>

					</Switch>
				</div>
				
			</div>
        </main>
    )
}

