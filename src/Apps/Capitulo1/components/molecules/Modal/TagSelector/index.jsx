import { AddIcon, CheckIcon, IconClose } from "@/Apps/Capitulo1/assets/Icons"
import { render } from "solid-js/web"
import { HeaderModal } from ".."
import { useStorage } from "../../../organisms/Storage/context"
import style from './style.module.css'
import { v4 as uuidv4 } from 'uuid';
import { createMenu } from "../../../hooks/Menu"
import { MenuTag } from "../../../hooks/Menu/tags_menu"

export const ModalTagSelector = () => {

    const { dados, dispatch: { editTag, addTag, removeTag } } = useStorage()

    let doubleClickTimer = null

    let elIsEdited = null;

    let refs = {
        primary: undefined,
        secondary: undefined
    };

    let oldData = {};

    const editable = (el, status) => {
        if (status == false) {
            elIsEdited.children[0].disabled = true
            elIsEdited.children[1].contentEditable = "false"
            elIsEdited.children[1].blur()
            elIsEdited.children[2].classList.toggle('hidden')
            elIsEdited.classList.toggle("active")
            elIsEdited = null;
            return
        }

        oldData.title = el.children[1].innerHTML
        oldData.color = el.children[0].value

        el.children[0].disabled = false
        el.children[1].contentEditable = "true"
        el.children[1].focus()
        el.children[2].classList.toggle('hidden')
        el.classList.toggle("active")
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(el.children[1]);
        selection.removeAllRanges();
        selection.addRange(range);
        elIsEdited = el
    }

    const handleEditable = (e) => {
        if (doubleClickTimer === null) {
            doubleClickTimer = setTimeout(() => {
                doubleClickTimer = null;
            }, 250);
        } else {
            clearTimeout(doubleClickTimer);
            doubleClickTimer = null;
            if (elIsEdited) {
                editable(elIsEdited, false)
            }
            let el = e.target;
            if (e.target.className != 'tag-field') {
                el = e.target.closest('.tag-field')
            }
            editable(el, true)
        }
    }

    const handleEditTag = (type_) => {
        const type = type_
        return (e) => {
            if (e.type == 'keydown' && e.code != 'Enter') return
            e.preventDefault()
            if (elIsEdited) {
                editable(elIsEdited, false)
            }
            let el = e.target;
            if (e.target.className != 'tag-field') {
                el = e.target.closest('.tag-field')
            }
            const request = {
                title: el.children[1].innerHTML,
                color: el.children[0].value,
                id: el.id
            }
            if (!el.id) {
                handleAddTagStorage(request, type, el)
                return
            }
            editTag(request, type)
        }
    }

    const cancelEdit = () => {
        if (!elIsEdited.id) {
            isAddTag = false;
            elIsEdited.remove()
        }
        else {
            elIsEdited.children[1].innerHTML = oldData.title
            elIsEdited.children[0].value = oldData.color
        }
        editable(elIsEdited, false)
    }

    const handleAddTagStorage = (request, type, el) => {
        request = {
            ...request,
            id: uuidv4()
        }
        addTag(request, type)
        el.remove()
        isAddTag = false;
    }

    let isAddTag = false;

    const handleAddTag = (type_) => {
        const type = type_
        return () => {
            (isAddTag == false) && render(() => <TagField type={type} tag={{ title: "New", color: "#000000" }} />, refs[type])
            isAddTag = true;
            refs[type].lastChild.click()
            refs[type].lastChild.click()
            refs[type].lastChild.scrollIntoView()
        }
    }

    const menu = async (e, id, type) => {
        const resp = await createMenu(e, MenuTag)
        if (resp == "excluir") {
            removeTag(id, type)
        }
    }

    const TagField = ({ tag, type }) => {
        return (
            <div onContextMenu={(e) => menu(e, tag.id, type)} id={tag.id} className='tag-field' onFocus={e => e.target.children[1].focus()} onClick={handleEditable} tabIndex="-1">
                <input id="color-pick" className={style.color_pick} type="color" value={tag.color} disabled />
                <div onKeyDown={handleEditTag(type)}>{tag.title}</div>
                <div className="flex hidden">
                    <CheckIcon onClick={handleEditTag(type)} className="ml-3" style={{ width: '20px' }} />
                    <IconClose onClick={cancelEdit} className="ml-2" style={{ width: '20px' }} />
                </div>
            </div>
        )
    }

    return (
        <div className='modal'>
            <HeaderModal id="modal-tag-selector" title={"Adicionar ou remover Tags"} />
            <div className={style.root_modal_tags}>
                <h4 className='color-text-secondary'>
                    Adicione, edite ou remova tags primárias e secundárias.
                    <p className="mt-1">Clique duas vezes em uma tag para editar. Para remover, use o clique direito do mouse.</p>

                </h4>
                <div className='divisor'></div>
                <div className="flex">
                    <h3 className='mb-3'>Tags primárias</h3>
                    <button onClick={handleAddTag('primary')} className="btn-action-white ml-3">
                        <AddIcon className="icon-svg-lg" />
                    </button>
                </div>
                <div ref={refs.primary} id="tag_area" className={style.tag_area}>
                    <For each={dados.tags.primary.filter(item=>item.deletable!=false)}>
                        {(tag) => (
                            <TagField tag={tag} type={'primary'} />
                        )}
                    </For>
                </div>
                <div className="flex">
                    <h3 className='mb-3'>Tags secundárias</h3>
                    <button onClick={handleAddTag('secondary')} className="btn-action-white ml-3">
                        <AddIcon className="icon-svg-lg" />
                    </button>
                </div>
                <div ref={refs.secondary} id="tag_area" className={style.tag_area}>
                    <For each={dados.tags.secondary.filter(item=>item.deletable!=false)}>
                        {(tag) => (
                            <TagField tag={tag} type={'secondary'} />
                        )}
                    </For>
                </div>
            </div>
        </div>
    )
}