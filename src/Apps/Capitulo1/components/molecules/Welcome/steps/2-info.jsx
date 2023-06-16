import todoAnimation from '@/Apps/Capitulo1/assets/animations/todo.json'

export function InfoStep() {
    return (
        <div className='framer'>
            <h1 className="inter-medium text-[#555657] text-center text-[25px] mb-3">O que é o Temperium ?</h1>
            <h3 className="inter text-[#555657] text-center">Temperium tem como propósito ser uma ferramenta 
            que ajudará você a se organizar melhor durante a vida acadêmica.</h3>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src={todoAnimation}
                className="mx-auto pr-5 w-96 h-60"
            >
            </lottie-player>
        </div>
    )
}