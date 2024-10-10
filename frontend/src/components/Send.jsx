// import { Heading } from "./Heading";
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export function Send({ id, name }) {
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    return <div>
        <div className=" white border-2 rounded-lg
         flex justify-center items-center h-screen bg-slate-300">

            <div className="bg-white p-3 md:p-4 w-80 md:w-auto rounded shadow-md shadow-md shadow-gray-500">

                <div className=" font-bold text-3xl pt-4 pl-10 text-center "
                >Send Money</div>

                <br></br>

                <div className="flex">

                    <div className="bg-green-500 h-12 text-white w-12 rounded-2xl text-2xl mt-2 pl-4 pt-1.5 font-bold"
                    >{name[0].toUpperCase()}</div>

                    <div className="py-3 font-bold text-2xl pl-3"
                    >{name}</div>

                </div>

                <div className="pt-2 text-lg font-semibold pt"
                >Amount (in Rs.)</div>

                <input className="rounded-lg p-2 shadow-sm border-2 mt-2 w-72 md:w-96"
                    placeholder="Enter Amount" onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                ></input>

                <div>
                    <button
                        onClick={() => {
                            axios.post("http://192.168.96.69:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            }).then((response) => {
                                if (response.data.success == 'n') { navigate('/Fail') }
                                else if (response.data.success == 'y') { navigate('/Success') }
                            })

                        }}
                        className="bg-green-500 text-white text-lg w-72 md:w-96 rounded
                                    p-2 mt-3"
                    >Initiate Transfer</button>
                </div>
            </div>
        </div>

    </div>
}