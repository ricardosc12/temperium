import { createEffect, createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import Cap1 from "./Apps/Capitulo1";
import Cap2 from "./Apps/Capitulo2";
import MenuCapitulos from "./Components/Menu";

function App() {

	const [cap, setCap] = createSignal(1)

	return (
		<div className="eve">
			<Switch fallback={<div>Not Found</div>}>
				
				<Match when={cap() === 1}>
					<Cap1 />
				</Match>

				<Match when={cap() === 2}>
					<Cap2 />
				</Match>

			</Switch>

			<MenuCapitulos handleChange={setCap}/>
		</div>
	)
}

export default App;
