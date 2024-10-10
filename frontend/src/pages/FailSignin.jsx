import { Fail } from "../components/Fail";

export function AfterFailSignin() {

    return <Fail label={'Signin Failed'} des={ "Incorrect Credentials / Incorrect Inputs"} button={"Try Again"}></Fail>
}
