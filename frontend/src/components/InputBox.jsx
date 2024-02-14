export function InputBox(props) {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">
                {props.label}
            </div>
            <input onChange={props.onChange} className="w-full border-slate-300 px-2 py-1 border rounded" placeholder={props.placeholder}></input>
        </div>
    )
}