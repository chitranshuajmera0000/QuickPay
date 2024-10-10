import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    return <div className='p-20 md: p-5 bg-slate-300 h-screen flex justify-center '>
        <div className='flex flex-col justify-center'>
            <div className='h-116 w-85 rounded-lg bg-gray-200 shadow-md text-center  '>
                <Heading label="Sign Up"></Heading>
                <SubHeading text='Enter Your information to create an Account'></SubHeading>
                <InputBox onChange={e => {
                    setFirstName(e.target.value.toUpperCase())
                }} label='First Name' placeholder='John' style={'pl-9'}></InputBox>

                <InputBox onChange={e => {
                    setLastName(e.target.value.toUpperCase())
                }} label='Last Name' placeholder='Doe' style={'pl-9'}></InputBox>

                <InputBox onChange={e => {
                    setUsername(e.target.value)
                }} label='Email' placeholder='johndoe@example.com' style={'pl-9'}></InputBox>

                <InputBox onChange={e => {
                    setPassword(e.target.value)
                }} label='Password' placeholder='password@123' style={'pl-9'}></InputBox>

                <Button label='Sign Up' onPress={async() => {
                    const response = await axios.post("http://192.168.96.69:3000/api/v1/user/signup", {
                        username, password, firstName, lastName
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate('/dashboard')
                }}></Button>
                <BottomWarning label='Already Have An Account ?' buttonText='Sign In' to='/signin'></BottomWarning>
            </div>
        </div>
    </div>
}