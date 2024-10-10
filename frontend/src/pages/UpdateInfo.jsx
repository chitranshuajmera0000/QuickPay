import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, } from "react-router-dom"
import { InputBox } from "../components/InputBox"



export function UpdateInfo() {
    const [det , setDet] = useState({
        username: "", password: "", firstName: "", lastName: ""
    })
    const [user, setUser] = useState({
        username: "", password: "", firstName: "", lastName: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://192.168.96.69:3000/api/v1/user/info",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {

                setUser(us => response.data.user)
                setDet(us => response.data.user)

            })

    }, [])


    return <div>
        <div className=" white border-2 rounded-lg
         flex justify-center items-center h-screen bg-slate-300">

            <div className="bg-white p-6 rounded shadow-md w-100 shadow-md shadow-gray-500">

                <div className=" font-bold text-3xl pl-6 pr-6 pt-5  text-center"
                >Update Information</div>

                <br></br>
                <div>

                    <InputBox label={'Username'} placeholder={user.username} onChange={(e) => {
                        user.username = e.target.value
                    }} style={'pl-3'}></InputBox>

                    <InputBox placeholder={user.password} onChange={(e) => {
                        user.password = e.target.value
                    }} label={"Password"} style={'pl-3'}></InputBox>

                    <InputBox placeholder={user.firstName} onChange={(e) => {
                        user.firstName = e.target.value.toUpperCase()
                    }} label={"First Name"} style={'pl-3'}></InputBox>

                    <InputBox placeholder={user.lastName} onChange={(e) => {
                        user.lastName = e.target.value.toUpperCase()
                    }} label={"Last Name"} style={'pl-3'}></InputBox>

                    <div>
                        <button
                            onClick={() => {
                                // console.log(user)
                                // console.log(det)
                                // if (det == user) { navigate('/afterFailUpdate') }
                                // else {
                                    axios.put("http://192.168.96.69:3000/api/v1/user/", {
                                        user: user
                                    }, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    }).then((response) => {
                                        if (response.data.success == 'n') { navigate('/afterFailUpdate') }
                                        else if (response.data.success == 'y') { navigate('/afterUpdate') }
                                    })
                                // }

                            }}
                            className="bg-green-500 text-white text-lg w-72 rounded
                                    p-1 mt-3 ml-6 mb-3"
                        >Update</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
}