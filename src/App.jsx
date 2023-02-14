import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import './styles/tailwind.css'
import './styles/fonts.css'
import './styles/base.css'
import Header from "@/components/molecules/Header";
import MainApp from "@/components/layout/Main";

function App() {

	return (
		<div className="main">
			<Header/>
			<MainApp/>
		</div>
	)
}

export default App;
