import { Success } from "../components/Success"
export function AfterTransfer() {
    return <Success label={'Transfer Successfull'} buttonLabel = {'Go To Dashboard'} to={'/dashboard'}
></Success>
}