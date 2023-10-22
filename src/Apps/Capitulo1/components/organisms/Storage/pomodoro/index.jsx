import { produce } from "solid-js/store"

export const pomodoroStorage = (set) => ({
    pomodoro: {
        state: false,
        time: 25 * 60,
        timeRemaining: 25 * 60,
        timeFocus: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
        pomodoroCount: 0,
        isBreak: false,
        interval: null,
        notification: false,
        autoInterval: false,
        activitiesList: []
    },
    dispatch: {
        setPomoState: (payload) => set(produce((state) => {
            state.dados.pomodoro.state = payload
        })),
        setPomoActivitiesState: (payload) => set(produce((state) => {
            state.dados.pomodoro.activitiesList = payload
        })),
        addPomoActivitiesState: (payload) => set(produce((state) => {
            state.dados.pomodoro.activitiesList = [...state.dados.pomodoro.activitiesList, payload]
        })),
        removePomoActivitiesState: (payload) => set(produce((state) => {
            state.dados.pomodoro.activitiesList = state.dados.pomodoro.activitiesList.filter(item => item.id != payload)
        })),
        setPomoActivityState: ({ idx, activityState }) => set(produce((state) => {
            state.dados.pomodoro.activitiesList[idx].statePomo = activityState
        })),
        setPomoNotify: (payload) => set(produce((state) => {
            state.dados.pomodoro.notification = payload
        })),
        setPomoTime: ({ time, timeRemaining, interval }) => set(produce((state) => {
            state.dados.pomodoro.time = time
            state.dados.pomodoro.timeRemaining = timeRemaining
            state.dados.pomodoro.interval = interval
        })),
        setPomoJustTime: ({ time }) => set(produce((state) => {
            state.dados.pomodoro.time = time
        })),
        setPomoTimeRemaining: ({ timeRemaining }) => set(produce((state) => {
            state.dados.pomodoro.timeRemaining = timeRemaining
        })),
        setPomoCountBreak: ({ isBreak, pomodoroCount }) => set(produce((state) => {
            state.dados.pomodoro.isBreak = isBreak
            state.dados.pomodoro.pomodoroCount = pomodoroCount
        })),
        setPomoInterval: (payload) => set(produce((state) => {
            state.dados.pomodoro.interval = payload
        })),
    }

})