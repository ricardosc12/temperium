import { createMemo } from "solid-js"

export const createTags=(dados)=>{
    const tags = createMemo(()=>{
        const iter = JSON.parse(JSON.stringify(dados.tags))
        const tags = {}
        iter.primary.forEach(tag=>{
            tags[tag.id] = tag
        })
        iter.secondary.forEach(tag=>{
            tags[tag.id] = tag
        })
        return tags
    })

    return tags
}
