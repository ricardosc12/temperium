import welcomeAnimation from '@/Apps/Capitulo1/assets/animations/welcome.json'

export function HomeStep() {
    return (
        <div className='framer'>
            <h1 className="inter-medium text-[#555657] text-center text-[25px]">Seja Bem-vindo(a) <b className='text-[var(--primary)]'>Anna Elisa</b> !</h1>
            <h3 className="inter text-[#555657] text-center">Obrigado por participar deste projeto.</h3>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src={welcomeAnimation}
                className="mx-auto pr-5 w-96 h-96"
            >
            </lottie-player>
        </div>
    )
}