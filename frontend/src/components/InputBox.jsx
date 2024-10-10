export function InputBox({ label, placeholder, onChange ,style }) {
    if (style == null) {style =""}
    const className = "font-medium border-black text-start w-100 "+style
    return <div className="text-center">
        <div className={className } >{label}</div>
        <input onChange={onChange} placeholder={placeholder} className="border-2 border-slate-400 rounded-md font-medium pl-3 p-5 text-black mt-1 mb-2 ml-2 w-72 h-8 sm: w-72  "
        ></input>
    </div>
}