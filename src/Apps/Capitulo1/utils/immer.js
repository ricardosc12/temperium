export function immer(key, object, value) {
    const temp_obj = { ...object }
    key.split('.').reduce((acc, curr, index, arr) => {
        if (index === arr.length - 1) {
            value && (acc[curr] = value)
        } else if (!acc[curr]) {
            if (curr.includes('[]')) acc[curr.replace('[]','')] = [];
            else acc[curr] = {};
        }
        return acc[curr.replace('[]','')];
    }, temp_obj);

    return temp_obj
}
