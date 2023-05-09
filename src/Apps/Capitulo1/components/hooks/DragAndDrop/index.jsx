import { createEffect, onCleanup } from "solid-js";

const DragAndDrop = (props) => {

    let actual_element;

    let counter = 0;

    function handleStart(e) {
        console.time('dragstart')
        e.dataTransfer.setDragImage(e.target, 0, 0);
        actual_element = e.target
        props.onDragStart(e.target.getAttribute('data-drag'))
        console.timeEnd('dragstart')
    }

    function handleDragEnd() {
        actual_element = null;
    }

    function handleDragOver(e) {
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
    }

    const handleDrop = (e) => {
        counter = 0;
        if (!actual_element) return
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
    }


    onCleanup(() => {
        document.removeEventListener("dragstart", handleStart, false)
        document.removeEventListener('dragend', handleDragEnd, false)
        document.removeEventListener('dragover', handleDragOver, false)
    })

    createEffect(() => {
        setTimeout(() => {
            console.time('onmount')
            const droppable = document.getElementsByName('droppable')
            document.addEventListener("dragstart", handleStart, false)
            document.addEventListener("drop", handleDrop, false)
            for (const dropper of droppable) {
                dropper.ondragleave = (e) => {
                    counter--;
                    if (counter == 0) {
                        console.time('ondragleave')
                        props.onDragLeave&&props.onDragLeave({
                            draggable: {
                                el: actual_element,
                                data: actual_element.getAttribute('data-drag')
                            },
                            droppable: {
                                el: dropper,
                                data: dropper.getAttribute('data-drag')
                            },
                        })
                        console.timeEnd('ondragleave')
                    }

                }
                dropper.ondragenter = (e) => {
                    counter++;
                    if (counter != 1) return
                    console.time('ondragenter')
                    props.onDragEnter&&props.onDragEnter(
                        {
                            draggable: {
                                el: actual_element,
                                data: actual_element.getAttribute('data-drag')
                            },
                            droppable: {
                                el: dropper,
                                data: dropper.getAttribute('data-drag')
                            },
                        }
                    )
                    console.timeEnd('ondragenter')
                }
            }
            document.addEventListener('dragend', handleDragEnd, false)
            document.addEventListener('dragover', handleDragOver, false)
            console.timeEnd('onmount')
            // document.getElementById('loading').innerHTML = ""
        })
    })

    return props.children
}

const Droppable = (props) => {
    return (
        <div name="droppable" className={`flex w-full h-full ${props.className || ''}`} data-drag={props.data}>
            {props.children}
        </div>
    )
}

const Draggable = (props) => {
    return (
        <div name="draggable" className={props.className} data-drag={props.data} draggable="true">
            {props.children}
        </div>
    )
}

export { Droppable, Draggable, DragAndDrop }