import { Fail } from "../components/Fail"
export function AfterFailTransfer() {
    return <Fail label={'Transfer Failed'} des={"Insufficient Balance / Invalid Input / Account Not Found"}></Fail>
}