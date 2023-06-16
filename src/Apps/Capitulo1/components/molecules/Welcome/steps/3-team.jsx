import teamAnimation from '@/Apps/Capitulo1/assets/animations/team.json'

export function TeamStep() {
    return (
        <div className='framer'>
            <h1 className="inter-medium text-[#555657] text-center text-[25px] mb-3">Juntos !</h1>
            <h3 className="inter text-[#555657] text-center">Queremos que essa aplicação tenha o seu apoio, nos dizendo o que mais você precisa para que 
            esteja sempre organizado com os estudos.</h3>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src={teamAnimation}
                className="mx-auto pr-5 w-96 h-72"
            >
            </lottie-player>
        </div>
    )
}