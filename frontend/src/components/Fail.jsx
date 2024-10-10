import { useNavigate } from "react-router-dom"

export function Fail({label,des,button}) {
    const navigate = useNavigate()
    if (!button) {button="Go To Dashboard"}
    return <div>
        <div className=" white border-2 rounded-lg
         flex justify-center items-center h-screen bg-slate-300">

            <div className="bg-white p-6 m-1.5 rounded shadow-md shadow-md shadow-gray-500 items-center">


                <div className="flex justify-center">

                    <div className=" font-bold text-4xl pb-6 pl-10 pr-2 text-center"
                    >{label}</div>
                    <svg class=" text-white size-13  md:size-16  pr-1  md:pt-0 md:pr-2 md:pb-4" fill="red" viewBox="0 0 24 24" stroke="currentcolor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>


                    <br></br>
                    {/* </div> */}
                </div>

                <div className="text-center pb-3 font-semibold text-lg text-gray-600"
                >{des}</div>

                <div>
                    <button
                        onClick={() => { navigate("/dashboard") }}
                        className="bg-green-500 text-white text-lg w-full rounded
                                    p-1 mt-3"
                    >{button}</button>
                </div>
            </div>
        </div>

    </div>
}