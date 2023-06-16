import feedAnimation from '@/Apps/Capitulo1/assets/animations/feed.json'

export function FeedStep() {
    return (
        <div className='framer'>
            <h1 className="inter-medium text-[#555657] text-center text-[25px] mb-3">Feedback</h1>
            <h3 className="inter text-[#555657] text-center">Para melhor comprensão de suas necessidades, colhetaremos dados, como feedback e pesquisas.</h3>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src={feedAnimation}
                className="mx-auto pr-5 w-96 h-60"
            >
            </lottie-player>
            <h3 className="inter text-[#555657] text-center">Fique a vontade para decidir o que fazer, mas lembre-se que sua opnião
                é muito importante para que construamos uma ferramenta incrível.</h3>
        </div>
    )
}