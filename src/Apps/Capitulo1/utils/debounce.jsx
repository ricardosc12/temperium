export function createDebounce(func, timeoutMs = 1000) {
    let timer;

    function setter(e) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(e)
        }, timeoutMs);
    }

    return setter
}

export function treatValue(value) {
    if (typeof value != "string") return ""
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}