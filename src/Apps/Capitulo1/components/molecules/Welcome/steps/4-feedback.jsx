import feedAnimation from '@/Apps/Capitulo1/assets/animations/feed.json'

export function FeedStep() {
    return (
        <div className='framer'>
            <h1 className="inter-medium text-[#555657] text-center text-[25px] mb-3">Feedback</h1>
            <h3 className="inter text-[#555657] text-center">Para melhor comprensão de suas necessidades, colhetaremos dados, como feedbacks e pesquisas.</h3>
            <lottie-player
                autoplay
                loop
                mode="normal"
                src={feedAnimation}
                className="mx-auto pr-5 w-96 h-60"
            >
            </lottie-player>
            <h3 className="inter text-[#555657] text-center">
                Fique à vontade para fazer o que quiser, mas saiba que valorizamos 
                muito a sua opinião. Ela é fundamental para construirmos uma ferramenta incrível.</h3>
        </div>
    )
}