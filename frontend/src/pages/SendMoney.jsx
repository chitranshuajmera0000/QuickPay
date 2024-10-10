import { useSearchParams } from "react-router-dom"
import { Send } from "../components/Send"

export function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    return <div>
        <Send id={id} name={name}></Send>
        </div>
}