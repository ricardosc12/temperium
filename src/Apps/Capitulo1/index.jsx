import './styles/tailwind.css'
import './styles/fonts.css'
import './styles/base.css'

import MainApp from "./components/layout/Main";
import Header from "./components/molecules/Header";

export default function Cap1(){
	return (
		<div className="main">
			<Header/>
			<div className='bg-primary'>CAPITULO 1</div>
			<MainApp/>
		</div>
	)
}