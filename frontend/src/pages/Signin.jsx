import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return <div className='p-20 bg-slate-300 h-screen flex justify-center '>
        <div className='flex flex-col justify-center'>
            <div className='h-116 w-90 rounded-lg bg-gray-200 shadow-md text-center p-6 sm: p-4'>
                <Heading label="Sign In"></Heading>
                <SubHeading text='Enter Your credentials to access your Account'></SubHeading>
                <InputBox onChange={(e) => { setUsername(e.target.value) }}
                    label='Email' placeholder='johndoe@example.com' style={'sm:pl-9'}></InputBox>
                <InputBox onChange={(e) => { setPassword(e.target.value) }}
                    label='Password' placeholder='password@123' style={'sm:pl-9'}></InputBox>
                <Button onPress={async () => {
                    console.log('requested to get info')
                    try {
                        const response = await axios.post("http://192.168.96.69:3000/api/v1/user/signin", {
                            username, password
                        })
                        if (response.data.success == 'y') {
                            localStorage.setItem("token", response.data.token)
                            navigate('/dashboard')
                        }
                        else if (response.data.success == 'n') {
                            navigate('/failSignin')
                        }
                    } catch (err) {
                        setError('Error while logging in. Please check your credentials and try again.');
                        console.error(err);
                    }
                }} label='Sign In'></Button>
                <BottomWarning label="Don't Have An Account ?" buttonText='Sign Up' to='/signup'></BottomWarning>
            </div>
        </div>
    </div>
}