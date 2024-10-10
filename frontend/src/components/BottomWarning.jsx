import { Link } from "react-router-dom";

export function BottomWarning({label , buttonText,to}) {
    return <div className="flex justify-center pt-4 pb-2 text-md">
        <div className="text-gray">{label}</div>
        <Link className="pointer underline pl-1 pointer-cursor" to={to}
        >{buttonText}</Link>
    </div>
}