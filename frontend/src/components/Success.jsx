import { useNavigate } from "react-router-dom"

export function Success({label,buttonLabel,to}) {
    const navigate = useNavigate()

    return <div>
        <div className=" white border-2 rounded-lg p-4
         flex justify-center items-center h-screen bg-slate-300">

            <div className="bg-white p-6 rounded shadow-md w-96 shadow-md shadow-gray-500">


                <div className="flex">

                    <div className=" font-bold text-4xl pb-6 pl-10 pr-2 text-center"
                    >{label}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="size-15 pt-7 pr-5 md:size-13 md:pl-4 md:pt-0">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>


                    <br></br>
                    {/* </div> */}
                </div>
                <div>
                    <button
                        onClick={() => { navigate(to) }}
                        className="bg-green-500 text-white text-lg w-full rounded
                                    p-1 mt-3"
                    >{buttonLabel}</button>
                </div>
            </div>
        </div>

    </div>
}


