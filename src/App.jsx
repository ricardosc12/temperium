import { createSignal } from "solid-js";
import Cap1 from "./Apps/Capitulo1";
import LoginPage from "./Apps/Capitulo1/components/organisms/Login";
import Cap2 from "./Apps/Capitulo2";
import MenuCapitulos from "./Components/Menu";
import getLogin from "./utils/validateLogin";
import { useAuth } from "./storage/Auth";
import { createEffect } from "solid-js";

function App() {

	const [cap, setCap] = createSignal(1)

	const { auth, setAuthStorage } = useAuth()

	createEffect(()=>{
		const login = getLogin()

		if(!login) return

		setAuthStorage(prev=>({...prev, user: login}))
	})


	return (
		<div className="inter">
			{/* <Switch>

				<Match when={!true}>
					<LoginPage/>
				</Match>

				<Match when={true}> */}
					<Switch fallback={<div>Not Found</div>}>
						
						<Match when={cap() === 1}>
							<Cap1 />
						</Match>

						<Match when={cap() === 2}>
							<Cap2 />
						</Match>

					</Switch>
				{/* </Match>

			</Switch> */}


			<MenuCapitulos handleChange={setCap}/>
		</div>
	)
}

export default App;
