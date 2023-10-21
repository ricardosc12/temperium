import { createEffect, createMemo, createRenderEffect, createSignal, For, onCleanup, onMount } from 'solid-js';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import style from './style.module.css'
import readingAnimation from '@/Apps/Capitulo1/assets/animations/reading'
import catSleepingAnimation from '@/Apps/Capitulo1/assets/animations/cat_sleeping'
import { useStorage } from '../Storage/context';
import { PauseIcon, PlayIcon, RestoreIcon, SkipIcon } from '@/Apps/Capitulo1/assets/Icons';
import Atividades from './Atividades';



export default function CalendarPage() {

    const { dados, dispatch: {
        setPomoState, setPomoNotify,
        setPomoTime, setPomoInterval, setPomoTimeRemaining,
        setPomoCountBreak, setPomoJustTime
    } } = useStorage()

    let timeRemaining;
    let time;
    let interval;

    let isBreak = false;
    let pomodoroCount = 0;

    function startPomodoro() {
        if (!interval) {
            interval = setInterval(updateTimer, 1000);
        }
    }

    function handlePomo() {
        if (dados.pomodoro.state) {
            stopPomodoro()
            setPomoState(false)
        }
        else {
            startPomodoro()
            setPomoState(true)
        }
    }

    onMount(() => {
        timeRemaining = dados.pomodoro.timeRemaining;
        time = dados.pomodoro.time;
        interval = dados.pomodoro.interval;
        pomodoroCount = dados.pomodoro.pomodoroCount;
        isBreak = dados.pomodoro.isBreak;
        displayTime()
        if (dados.pomodoro.state) {
            startPomodoro()
        }
    })

    onCleanup(() => {
        setPomoInterval(interval)
    })


    function stopPomodoro() {
        clearInterval(interval);
        interval = null;
        setPomoTime({ time, timeRemaining, interval })
    }

    function resetPomodoro() {
        timeRemaining = dados.pomodoro.timeFocus;
        time = dados.pomodoro.timeFocus;
        isBreak = false;
        pomodoroCount = 0;
        stopPomodoro();
        setPomoState(false)
        setPomoTime({ time, timeRemaining, interval })
        displayTime();
    }

    function updateTimer(next) {
        if (timeRemaining > 0 && !next) {
            timeRemaining--;
            setPomoTimeRemaining({ timeRemaining })
        } else {
            isBreak = !isBreak;
            if (isBreak) {
                pomodoroCount++;

            }
            timeRemaining = isBreak ? (pomodoroCount % 4 === 0 ?
                dados.pomodoro.longBreak : dados.pomodoro.shortBreak)
                :
                dados.pomodoro.timeFocus;
            time = timeRemaining;
            setPomoJustTime({ time })
            setPomoCountBreak({ isBreak, pomodoroCount })
            if (isBreak) {
                sendNotification({ title: 'Pomodoro', body: 'Hora do descanso!' });
            }
            else {
                sendNotification({ title: 'Pomodoro', body: 'De volta ao foco!' });
            }
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

    function handleNotify() {
        clearInterval(interval);
        interval = null;
        updateTimer(true)
        setPomoState(true)
        startPomodoro()
    }

    return (
        <div className='flex flex-col items-center justify-center w-full framer'>
            <div className='flex flex-col items-center justify-center'>
                <div class={style.container}>
                    <div class={style.card}>

                        <div class={style.box}>
                            <h2 class={style.text}>Pomodoro</h2>
                            <div class={style.percent}>
                                <svg>
                                    <circle cx="70" cy="70" r="70"></circle>
                                    <circle id="progress" cx="70" cy="70" r="70"></circle>
                                </svg>
                                <div class={style.number}>
                                    <h2 id="timer">25:00</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.animation}>
                    {dados.pomodoro.state ?

                        <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src={readingAnimation}
                            className="w-full"
                        >
                        </lottie-player> :
                        <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src={catSleepingAnimation}
                            className="w-[60px] mb-2"
                        >
                        </lottie-player>
                    }
                </div>
                <div className='flex space-x-3 mt-5'>
                    <button onClick={resetPomodoro} className='btn-base bg-[var(--roxinho)] color-main'>
                        <RestoreIcon class="text-xl" />
                    </button>
                    <button onClick={handlePomo} className='btn-base bg-main'>
                        {dados.pomodoro.state ? (
                            <>
                                <PauseIcon class="-ml-1 mr-2" />
                                Stop
                            </>
                        ) : (
                            <>
                                <PlayIcon class="-ml-1 mr-2" />
                                Start
                            </>
                        )}

                    </button>
                    <button onClick={handleNotify} className='btn-base bg-[var(--roxinho)] color-main'>
                        <SkipIcon class="text-xl" />
                    </button>
                </div>
            </div>
            <Atividades />
        </div>
    )
}