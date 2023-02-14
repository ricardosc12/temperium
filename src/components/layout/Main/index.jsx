import style from './assets/styles.module.css'
import introJs from 'intro.js'

export default function MainApp(){

    // const handleFull=()=>{
	// 	var elem = document.getElementById("root");
	// 	if (elem.requestFullscreen) {
	// 		elem.requestFullscreen();
	// 	} else if (elem.webkitRequestFullscreen) { /* Safari */
	// 		elem.webkitRequestFullscreen();
	// 	} else if (elem.msRequestFullscreen) { /* IE11 */
	// 		elem.msRequestFullscreen();
	// 	}
	// }

    function tour(){
        introJs().setOptions({
            steps: [{
              title: 'Welcome',
              intro: 'Hello World! 👋',
              element:document.querySelector("#tela1")
            },
            {
              element: document.querySelector('#tela2'),
              intro: 'This <b>STEP</b> focuses on an image. <br/> We also used some HTML tags!'
            },
            {
              title: 'Farewell!',
              element: document.querySelector('#tela3'),
              intro: '<img src="https://images.unsplash.com/photo-1608096299210-db7e38487075?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />'
            }
        ]
          }).start();
    }


    return (
        <main className={style.main_app}>
            <div className='card'></div>
            <div id="tour" className={style.content}>
                <div id="tela1"></div>
                <div id="tela2"></div>
                <div id="tela3"></div>
                <button onClick={tour} className="bg-gray-dark">TOUR</button>
            </div>
        </main>
    )
}