import './styles/tailwind.css'
import './styles/fonts.css'
import './styles/base.css'

import MainApp from "./components/layout/Main";
import Header from "./components/molecules/Header";
import Tour from './components/molecules/Tour';
import Footer from './components/molecules/Footer';
import Welcome from './components/molecules/Welcome';

export default function Cap1(){
	return (
		<div id='main' className="main">
			{/* <Tour/> */}
			{/* <Welcome/> */}
			<Header/>
			<MainApp/>
			<Footer/>
		</div>
	)
}