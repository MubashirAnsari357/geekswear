import React, { useState, useEffect } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, addtoCart, removeFromCart, clearCart, subTotal }) => {

  const [state, setState] = useState("")
  const [district, setDistrict] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [email, setEmail] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [myUser, setmyUser] = useState({ value: null })

  useEffect(() => {
    const myUser = JSON.parse(localStorage.getItem("myUser"));
    if (myUser) {
      setmyUser(myUser)
      setEmail(myUser.email)
      fetchUser(myUser.token)
    }
  }, [])

  useEffect(() => {
    if (name.length>3 && email.length>3 && address.length>3 && phone.length>3 && pincode.length>3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [ name, email, address, phone, pincode ])

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
    getPincode(res.pincode)
}
  
const getPincode = async (pin)=>{
  if (pin.length === 6) {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setDistrict(pinJson[pin][0])
      setState(pinJson[pin][1])
    }
    else {
      setDistrict('')
      setState('')
    }
  }
  else {
    setDistrict('')
    setState('')
  }
}


  const handleChange = async (e) => {

    if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      getPincode(e.target.value)
    }
    else if (e.target.name == 'name') {
      setName(e.target.value)

    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)

    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)

    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)

    }
    else if (e.target.name == 'state') {
      setState(e.target.value)

    }
    else if (e.target.name == 'district') {
      setDistrict(e.target.value)
    }
    if (Object.keys(cart).length === 0) {
      setDisabled(true)
    }

  }

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());

    //Get a transaction token
    const data = { cart, subTotal, oid, email: email, name, address, pincode, phone, state, district };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnRes = await a.json()

    if(txnRes.cartClear){
      clearCart()
    }

    if (txnRes.success) {

      let txnToken = txnRes.txnToken
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subTotal /* update amount */
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });

    }
    else {
      toast.error(txnRes.error, {
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
  return (
    <section className="text-gray-800 body-font relative min-h-screen">
      <Head><title>Checkout | GeeksWear</title><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <div className="container px-5 pt-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout</h1>
        </div>
        <div className="lg:w-3/4 md:w-2/3 mx-auto">
          <h3 className='my-2 text-lg font-semibold'>1. Delivery details</h3>
          <div className="flex flex-wrap m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                {myUser && myUser.token ? <input value={myUser.email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}

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
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                <input value={state} onChange={handleChange} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="district" className="leading-7 text-sm text-gray-600">District</label>
                <input value={district} onChange={handleChange} type="text" id="district" name="district" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
              </div>
            </div>
          </div>
          <h3 className='my-2 mt-4 text-lg font-semibold'>2. Review Cart items</h3>
          <div className="flex flex-wrap m-3">
            <div className="sideCart bg-blue-200 py-4 px-8 w-full rounded-md">
              <ol className='list-decimal font-semibold'>
                {Object.keys(cart).length == 0 &&
                  <div className="my-5 font-semibold">
                    Your cart is empty!
                  </div>}
                {Object.keys(cart).map((k) => {
                  return <li key={k}>
                    <div className="flex my-6">
                      <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                      <div className='flex justify-center items-center mx-auto font-semibold text-lg'>
                        <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer' /></div>
                    </div>
                  </li>
                })}
              </ol>
              <div className="subtotal font-bold text-lg">Subtotal: ₹{subTotal}</div>
            </div>
            <div className="flex my-4 space-x-3">
              <button onClick={initiatePayment} disabled={disabled} className="disabled:bg-blue-300 flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-lg"><BsFillBagCheckFill className='m-1 mr-2' />Pay ₹{subTotal}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout