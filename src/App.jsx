import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import './styles/global.css'
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
