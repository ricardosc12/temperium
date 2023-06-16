import { createEffect, createMemo, createSignal, For, onMount } from "solid-js"
import { createModal, closeModal } from "../Modal"
import style from './style.module.css'
import { HomeStep } from "./steps/1-home"
import { InfoStep } from "./steps/2-info"
import { TeamStep } from "./steps/3-team"
import { FeedStep } from "./steps/4-feedback"
import { tourWelcome } from "../Tour/welcome"

const steps = [
    HomeStep,
    InfoStep,
    TeamStep,
    FeedStep
]

function ModalWelcome(props) {

    const [step, setStep] = createSignal(0)

    function handleGo(prox) {
        return () => {
            const actual = step()
            if (prox && actual < steps.length - 1) {
                setStep(actual + 1)
            }
            else if (!prox && actual > 0) {
                setStep(actual - 1)
            }
            else if (prox && step() == steps.length - 1) {
                closeModal(props.modalId)
                // setTimeout(() => {
                //     tourWelcome()
                // }, 500);
            }
        }
    }

    const Component = createMemo(() => steps[step()])

    return (
        <div className="modal flex flex-col bg-[var(--bg-white)] w-[500px] h-[571px] items-center py-8 px-8 justify-between">
            {Component()}
            <div className="flex flex-col justify-center items-center">
                <div className="flex space-x-2">
                    <For each={steps}>
                        {(_, index) => <span active={index() == step()} className={style.step}></span>}
                    </For>
                </div>
                <div className="flex space-x-3 mt-5">
                    {step() > 0 ?
                        <button onClick={handleGo(false)} className="btn-base bg-[var(--roxinho)] text-[var(--primary)]">Voltar</button>
                        :
                        <button onClick={handleGo(false)} className="btn-base bg-[var(--btn-light)] text-[var(--disabled)] pointer-events-none">Voltar</button>
                    }
                    <button onClick={handleGo(true)} className="btn-base bg-main">{step() == steps.length - 1 ? "Começar" : "Avançar"}</button>
                </div>
            </div>
        </div>
    )
}

export default function Welcome() {

    const { open } = createModal(ModalWelcome, {
        id: 'modal-welcome',
        props: {
            modalId: 'modal-welcome'
        }
    })

    onMount(() => {
        open()
    })

    return <div onClick={open} id="modal-welcome-btn" className="hidden"></div>
}