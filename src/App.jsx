import { createEffect, createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import Cap1 from "./Apps/Capitulo1";
import Cap2 from "./Apps/Capitulo2";
import MenuCapitulos from "./Components/Menu";

import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

function App() {

	const [cap, setCap] = createSignal(1)

	// createEffect(()=>{
	// 	(async()=>{
	// 		try {
	// 			const { shouldUpdate, manifest } = await checkUpdate()
	// 			if (shouldUpdate) {
	// 			  // display dialog
	// 			  console.log(shouldUpdate)
	// 			  const update = await installUpdate()
	// 			  console.log(update)
	// 			  // install complete, restart the app
	// 			//   await relaunch()
	// 			}
	// 		  } catch (error) {
	// 			console.log(error)
	// 		  }
	// 	})();

	// })

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
