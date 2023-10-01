import { createEffect, createSignal, For, onCleanup, onMount } from 'solid-js';
import style from './style.module.css'
import readingAnimation from '@/Apps/Capitulo1/assets/animations/reading'

let timeRemaining = 25 * 60;
let time = 25 * 60;
let interval;

export default function CalendarPage() {

    let isBreak = false;
    let pomodoroCount = 0;

    const [state, setState] = createSignal(true)

    function startPomodoro() {
        if (!interval) {
            interval = setInterval(updateTimer, 1000);
        }
    }

    function handlePomo() {
        if (state()) {
            stopPomodoro()
            setState(false)
        }
        else {
            startPomodoro()
            setState(true)
        }
    }

    onMount(() => {
        startPomodoro()
        displayTime()
    })

    onCleanup(() => {
        console.log("CLEAN UP")
        // stopPomodoro()
    })

    function stopPomodoro() {
        clearInterval(interval);
        interval = null;
    }

    function resetPomodoro() {
        stopPomodoro();
        timeRemaining = 25 * 60;
        isBreak = false;
        pomodoroCount = 0;
        displayTime();
    }

    function updateTimer() {
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            pomodoroCount++;
            isBreak = !isBreak;
            timeRemaining = isBreak ? (pomodoroCount % 4 === 0 ? 15 * 60 : 5 * 60) : 25 * 60;
        }
        displayTime();
    }

    function displayTime() {
        const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
        const seconds = (timeRemaining % 60).toString().padStart(2, '0');
        let timer = document.getElementById('timer');
        let progress = document.getElementById('progress')
        if (timer) {
            timer.textContent = `${minutes}:${seconds}`;
        }
        if (progress) {
            progress.style.strokeDashoffset = `calc(440 - (440 * ${(((time - timeRemaining) / time) * 100).toFixed(0)}) / 100)`
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full framer'>
            <div class={style.container}>
                <div class={style.card}>
                    <div class={style.box}>
                        <div class={style.percent}>
                            <svg>
                                <circle cx="70" cy="70" r="70"></circle>
                                <circle id="progress" cx="70" cy="70" r="70"></circle>
                            </svg>
                            <div class={style.number}>
                                <h2 id="timer">25:00</h2>
                            </div>
                        </div>
                        {/* <h2 class={style.text}>estudando...</h2> */}
                    </div>
                </div>
            </div>
            <div className={style.animation}>
                <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src={readingAnimation}
                    className="h-full w-full"
                >
                </lottie-player>
            </div>
            <button onClick={handlePomo} className='btn-base bg-main'>{state() ? "Stop" : "Start"}</button>
        </div>
    )
}