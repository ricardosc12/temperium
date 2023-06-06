import { createEffect, onCleanup, onMount } from "solid-js";

const DragAndDrop = (props) => {

    let actual_element;

    let counter = 0;

    function handleStart(e) {
        // console.time('dragstart')
        e.dataTransfer.setDragImage(e.target, 0, 0);
        actual_element = e.target
        props.onDragStart(e.target.getAttribute('data-drag'))
        // console.timeEnd('dragstart')
    }

    function handleDragEnd() {
        props.onDragTerminate && props.onDragTerminate()
        actual_element = null;
    }

    function handleDragOver(e) {
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
    }

    function handleDrop(e) {
        counter = 0;
        auxCount = 0;
        if (!actual_element) return
        // console.time('ondragend')
        e.preventDefault()
        const dropper = e.target.closest("[name='droppable']")
        props.onDragEnd(
            {
                draggable: {
                    el: actual_element,
                    data: actual_element.getAttribute('data-drag')
                },
                droppable: {
                    el: dropper,
                    data: dropper?.getAttribute('data-drag') || undefined
                },
            }
        )
        // console.timeEnd('ondragend')
    }

    function handleLeave(e) {
        // console.time('ondragleave')
        const droppable = e.target.closest('[name="droppable"]')
        if (droppable) {
            auxCount--;
            if (auxCount == 0) {
                props.onDragLeave && props.onDragLeave({
                    draggable: {
                        el: actual_element,
                        data: actual_element.getAttribute('data-drag')
                    },
                    droppable: {
                        el: droppable,
                        data: droppable.getAttribute('data-drag')
                    },
                })
            }
        }
        // console.timeEnd('ondragleave')
    }

    function handleEnter(e) {
        // console.time('ondragenter')
        const droppable = e.target.closest('[name="droppable"]')
        if (droppable) {
            auxCount++;
            if (auxCount == 1) {
                props.onDragEnter && props.onDragEnter(
                    {
                        draggable: {
                            el: actual_element,
                            data: actual_element.getAttribute('data-drag')
                        },
                        droppable: {
                            el: droppable,
                            data: droppable.getAttribute('data-drag')
                        },
                    }
                )
            }
        }
        // console.timeEnd('ondragenter')
    }


    onCleanup(() => {
        document.removeEventListener("dragstart", handleStart, true)
        document.removeEventListener("drop", handleDrop, true)
        document.removeEventListener("dragenter", handleEnter, true)
        document.removeEventListener("dragleave", handleLeave, true)
        document.removeEventListener('dragend', handleDragEnd, true)
        document.removeEventListener('dragover', handleDragOver, true)
    })

    let auxCount = 0

    onMount(() => {
        document.addEventListener("dragstart", handleStart, true)
        document.addEventListener("drop", handleDrop, true)
        document.addEventListener("dragenter", handleEnter, true)
        document.addEventListener("dragleave", handleLeave, true)
        document.addEventListener('dragend', handleDragEnd, true)
        document.addEventListener('dragover', handleDragOver, true)
    })

    return props.children
}

const Droppable = (props) => {
    return (
        <div id={props.id} name="droppable" className={`flex w-full h-full ${props.className || ''}`} data-drag={props.data}>
            {props.children}
        </div>
    )
}

const Draggable = (props) => {
    return (
        <div id={props.id} name="draggable" className={props.className} data-drag={props.data} draggable="true">
            {props.children}
        </div>
    )
}

export { Droppable, Draggable, DragAndDrop }