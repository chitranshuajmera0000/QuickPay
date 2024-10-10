import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export function Users() {
    const [users, setUsers] = useState([])
    const [filter,setFilter] = useState('')

    useEffect(() => {
        axios.get("http://192.168.96.69:3000/api/v1/user/bulk?filter="+filter , {
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setUsers(response.data.user)
        },)

    },[filter])

    return <div className="flex-1 justify-start">
        <div className="pt-5  font-bold text-2xl">Users</div>
        <div className="mr-4">
            <input placeholder="Search Users...." type="text" onChange={(e) =>{setFilter(e.target.value.toUpperCase())}}  
                className=" pl-2 m-2 border-2 rounded-lg w-full h-10 text-black text-lg text-transform: uppercase"
            ></input>
            
        </div>
        <div >
            {users.map(user => <User user={user} />)}
        </div>
    </div>
}

function User({ user }) {
    const navigate = useNavigate();
    return <div className="flex justify-between m-2 shadow-md border-1 rounded pl-2 pr-3 ">
        <div className="flex">
            <div className="bg-slate-200 h-10 w-10 md:h-12 md:w-12 rounded-xl text-2xl mt-6 md:mt-2 pl-2.5 md:pl-4 pt-0.5 md:pt-1.5 "
            >{user.firstName[0].toUpperCase()}</div>
            <div className="text-center my-4 md:my-4 text-xl font-semibold pl-3 pr-3"
            >{user.firstName} {user.lastName}</div>
        </div>
        <div>
            <button className="bg-green-500 text-white rounded-lg w-36 md:w-40 h-8 my-4 font-bold border-2 border-white shadow-sm shadow-black"
            onClick={(e) =>{
                navigate("/send?id=" + user._id + "&name=" + user.firstName +" "+user.lastName)
            }}
            >Send Money</button>
        </div>
    </div>
}