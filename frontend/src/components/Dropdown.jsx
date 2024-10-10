import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }
    const navigate = useNavigate()
    async function logout() {
        localStorage.removeItem('token')
        navigate('/logout')
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    return <div>
        <div ref={dropdownRef} className="relative">
            <div className="flex items-center cursor-pointer pr-5" onClick={toggleDropdown}>
                <div className="bg-green-500  text-white h-10 w-10 md:h-12 md:w-12 
                 rounded-2xl text-2xl md:m-2 pl-3.5 md:pl-4 pt-0.5 md:pt-1.5 font-bold"
                >{user.firstName[0]}
                </div>
                <div className="py-2 md:py-3 font-bold text-xl md:text-2xl pl-3 pr-2 md:pr-3">{user.firstName}</div>
                <svg className={` md:ml-2 w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}

                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            {isOpen && (
                <div className="fixed top-15 right-10 bg-slate-200 border rounded-lg shadow-lg w-auto mt-2 p-4">
                    <div className=" flex text-gray-800 pt-2">
                        <div className="flex font-bold">
                            Name :
                        </div>
                        <div className="text-semibold pl-1"> {user.firstName} {user.lastName}</div>
                    </div>
                    <div className=" flex text-gray-800 pt-2">
                        <div className="flex font-bold">
                            Username :
                        </div>
                        <div className="text-semibold pl-1"> {user.username}</div>
                    </div>
                    <hr className="h-px my-4 border-0 dark:bg-gray-400"></hr>
                    <button className="bg-green-500 text-white border-2 border-white rounded-md w-full h-10 text-lg justify-center"
                        onClick={() => { navigate('/update') }}
                    >Update Details</button>
                    <hr className="h-px my-4 border-0 dark:bg-gray-400"></hr>
                    <div className="flex bg-green-500 text-white border-2 border-white rounded-md w-full h-10 text-lg justify-center items-center">
                        <button className="flex items-center justify-center w-full" onClick={logout}>
                            Logout
                            <svg className="ml-2 w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                        </button>
                    </div>

                </div>

            )}
        </div>
    </div>
}

