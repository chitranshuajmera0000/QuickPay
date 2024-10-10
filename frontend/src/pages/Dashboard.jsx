import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "../components/Dropdown";

export function Dashboard() {
    const [user, setUser] = useState({ firstName: "U" })
    const [balance, setBalance] = useState(0)
    const navigate = useNavigate()
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/signin');
            return
        }
    }, [navigate]);

    useEffect(() => {
        axios.get("http://192.168.96.69:3000/api/v1/user/info",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                setUser(us => response.data.user)
                setBalance(ac => response.data.balance)
            })
    }, [])

    return <div className="m-3 md:m-5 ">
        <div className="flex justify-between shadow-sm p-2 rounded-lg border-2 border-gray-300">
            <div className="font-bold text-2xl md:text-3xl p-2 text-purple-700">QuickPay</div>
            <div className="flex">
                <Dropdown user={user}></Dropdown>
            </div>
        </div>
        <Balance value={balance}></Balance>
        <Users></Users>
    </div>
}