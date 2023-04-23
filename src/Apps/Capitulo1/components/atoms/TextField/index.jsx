

export default function TextField({ id, label, type = "text", ...props }) {
    return (
        <div className="textfield" {...props}>
            <input id={id} placeholder=" " type={type} />
            <p>{label}</p>
        </div>
    )
}