import { Success } from "../components/Success";

export function AfterUpdate() {
    return <Success label={'Updated Successfully'} buttonLabel = {'Go To Dashboard'} to={'/dashboard'}
></Success>
}