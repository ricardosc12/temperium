import { produce } from "solid-js/store"

export const pomodoroStorage = (set) => ({
    pomodoro: {
        state: false,
        time: 25 * 60,
        timeRemaining: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
        interval: null,
        notification: false,
        autoInterval: false,
    },
    dispatch: {
        setPomoState: (payload) => set(produce((state) => {
            state.dados.pomodoro.state = payload
        })),
        setPomoNotify: (payload) => set(produce((state) => {
            state.dados.pomodoro.notification = payload
        })),
        setPomoTime: ({ time, timeRemaining, interval }) => set(produce((state) => {
            state.dados.pomodoro.time = time
            state.dados.pomodoro.timeRemaining = timeRemaining
            state.dados.pomodoro.interval = interval
        })),
        setPomoTimeRemaining: ({ timeRemaining }) => set(produce((state) => {
            state.dados.pomodoro.timeRemaining = timeRemaining
        })),
        setPomoInterval: (payload) => set(produce((state) => {
            state.dados.pomodoro.autoInterval = payload
        })),
    }

})