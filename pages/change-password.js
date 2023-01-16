import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Change = () => {
  const [password, setPassword] = useState('')
  const [npassword, setNpassword] = useState('')
  const [cpassword, setCpassword] = useState('')
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
        }
  }, [])

  const handleSubmit = async (e) => {
    try {
        e.preventDefault()
        let res
        if(npassword === cpassword){
            const data = { token: user.token, password, cpassword, npassword };
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            res = await a.json()
            console.log(res)
            setPassword('')
            setNpassword('')
            setCpassword('')
        }
        else{       
            res = {success: false, "message": "Confirm Password doesn't match!"}
        }
        if(res.success){     
            toast.success(res.message, {
                position: "bottom-center",
                autoClose: 1000,
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
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
      
    } catch (error) {
      console.error({error: "Internal Server error"})
    }
  }

  const handleChange = (e) => {
    if (e.target.name == 'password') {
        setPassword(e.target.value)
    }
    else if (e.target.name == 'npassword') {
        setNpassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
        setCpassword(e.target.value)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head><title>Change Password | GeeksWear</title></Head>
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-1/4 w-1/4" src="/logo.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change Password</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={'/login'}><a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Login </a></Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="password" className="sr-only">Old Password</label>
              <input id="password" name="password" type="password" autoComplete="password" value={password} onChange={handleChange} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Old Password" />
            </div>
            <div>
              <label htmlFor="npassword" className="sr-only">New Password</label>
              <input id="npassword" name="npassword" type="password" autoComplete="npassword" value={npassword} onChange={handleChange} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="New Password" />
            </div>
            <div>
              <label htmlFor="cpassword" className="sr-only">Confirm New Password</label>
              <input id="cpassword" name="cpassword" type="password" value={cpassword} onChange={handleChange} autoComplete="cpassword" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password" />
            </div>
          </div>


          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Change