import style from './style.module.css'
import { TourIcon } from './icons'

export default function Tour(){

    function tour(){
        introJs().setOptions({
            nextLabel: "Avançar",
		    prevLabel: "Anterior",
            steps: [
            {
                title: 'Welcome',
                intro: 'Este é o Temperium'
            },
            {
                title: 'Sidebar',
                intro: 'Aqui você poderá navegar entre os módulos disponíveis',
                element:document.querySelector("#sidebar")
            },
            {
                title: "Gerenciando Atividades",
                element: document.querySelector('#main_content'),
                intro: 'Você poderá gerenciar suas <b>Atividades</b> aqui'
            },
            {
                title: "Iniciando uma atividade",
                element: document.querySelector('#lateralbar-atividades'),
                intro: 'Arraste e solte uma atividade nos cards para começar !'
            },
            // {
            //   title: 'Farewell!',
            //   element: document.querySelector('#tela3'),
            //   intro: '<img src="https://images.unsplash.com/photo-1608096299210-db7e38487075?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />'
            // }
        ]
          }).start();
    }

    return (
        <div className={style.tour} onClick={tour}>
            <TourIcon/>
            <p>Tour</p>
        </div>
    )
}