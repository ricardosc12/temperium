import style from './assets/styles.module.css'
import Sidebar from '../../molecules/Sidebar'
import { createSignal } from 'solid-js'
import HomePage from '../../organisms/Home'
import AuthPage from '../../organisms/Auth'
import PomodoroPage from '../../organisms/Pomodoro'
import { StorageProvider } from '../../organisms/Storage/context'

export default function MainApp() {

	const [route, setRoute] = createSignal('home')

	return (
		<main className={style.main_app}>
			<StorageProvider>
				<div className={style.content}>

					<Sidebar route={route} setRoute={setRoute} />

					<div className={style.main_content}>
						<Switch fallback={()=><div>Not Found</div>}>

							<Match when={route() === 'home'}>
								<HomePage />
							</Match>

							<Match when={route() === 'pomodoro'}>
								<PomodoroPage />
							</Match>

							<Match when={route() === 'auth'}>
								<AuthPage />
							</Match>

						</Switch>
					</div>
				</div>
			</StorageProvider>
		</main>
	)
}

