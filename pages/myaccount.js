import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const Myaccount = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [pincode, setPincode] = useState("")
    const [user, setUser] = useState({ value: null })

    const router = useRouter()

    useEffect(() => {
        const myUser = JSON.parse(localStorage.getItem("myUser"));
        if (!myUser) {
            router.push('/login')
            toast.warning('Please Login first!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if(myUser) {
            setUser(myUser)
            setEmail(myUser.email)
            fetchUser(myUser.token)
        }
    }, [])

    const fetchUser = async (token) => {
        const data = { token: token };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let res = await a.json()
        setName(res.name)
        setAddress(res.address)
        setPhone(res.phone)
        setPincode(res.pincode)
    }

    const updateDeliveryDetails = async () => {
        const data = { email:email, name, address, pincode, phone, token: user.token };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        if(res.success){     
            toast.success(res.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if(!res.success){
            toast.error(res.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const handleChange = async (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value)
        }

    }

    return (
        <>
            <div className='min-h-screen container px-5 pt-12 mx-auto'>
            <Head><title>My Account | GeeksWear</title></Head>
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">My Account</h1>
                </div>
                <div className="lg:w-3/4 md:w-2/3 mx-auto">
                    {/* <h3 className='my-2 text-lg font-semibold'>Delivery details</h3> */}
                    <div className="flex flex-wrap m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email <span className='text-sm text-gray-400'>(Cannot be updated)</span></label>
                                {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}

                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                <textarea onChange={handleChange} value={address} id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                <input onChange={handleChange} value={phone} placeholder='Your 10 digit phone number' type="tel" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                                <input onChange={handleChange} value={pincode} placeholder='Your 6 digit Pincode' type="tel" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <button onClick={updateDeliveryDetails} className="disabled:bg-blue-300 flex text-white bg-blue-500 border-0 m-3 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-lg">Update</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Myaccount
