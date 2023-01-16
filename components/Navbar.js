import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineShoppingCart, AiOutlineClose, AiFillPlusCircle, AiFillMinusCircle, AiOutlineHome } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs'
import { BiMenu, BiLogInCircle } from 'react-icons/bi'
import { MdAccountCircle } from 'react-icons/md'
import { FaTshirt, FaMugHot } from 'react-icons/fa'
import { GiHoodie } from 'react-icons/gi'
import { TbSticker } from 'react-icons/tb'

const Navbar = ({ logout, cart, addtoCart, removeFromCart, subTotal, clearCart, user }) => {

  const [dropdown, setDropdown] = useState(false)
  const [mdropdown, setMdropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [menuBar, setMenuBar] = useState(false)
  const cartRef = useRef()
  const menuRef = useRef()
  const router = useRouter()

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true)
    let exempted = ['/order', '/orders', '/checkout', '/myaccount', '/login', '/signup', '/forgot-password']
    if (exempted.includes(router.pathname)) {
      setSidebar(false)
    }
  }, [])


  const toggleCart = () => {
    setSidebar(!sidebar)
    // if (cartRef.current.classList.contains('translate-x-full')) {
    //   cartRef.current.classList.remove('translate-x-full')
    //   cartRef.current.classList.add('translate-x-0')
    // }
    // else if (cartRef.current.classList.contains('translate-x-0')) {
    //   cartRef.current.classList.remove('translate-x-0')
    //   cartRef.current.classList.add('translate-x-full')
    // }

  }

  const toggleMenu = () => {
    setMenuBar(!menuBar)
  }
  return (
    <>
      <div className={`flex flex-col md:flex-row justify-center items-center shadow-xl fixed w-full top-0 z-10 bg-white h-16 ${sidebar && 'overflow-hidden'}`}>
        <div className='md:ml-6'>
          <Link href={'/'}><a><Image src="/mainlogo.png" alt="" width={200} height={50} /></a></Link>
        </div>
        <div className='nav-links flex mx-auto'>
          <ul className="hidden md:flex md:space-x-3 md:text-md lg:space-x-9 font-bold lg:text-xl">
            <Link href={'/tshirts'}><a><li className='hover:text-blue-600 flex items-center '><FaTshirt className='mx-1' />Tshirts</li></a></Link>
            <Link href={'/hoodies'}><a><li className='hover:text-blue-600 flex items-center '><GiHoodie className='mx-1' />Hoodies</li></a></Link>
            <Link href={'/mugs'}><a><li className='hover:text-blue-600 flex items-center '><FaMugHot className='mx-1' />Mugs</li></a></Link>
            <Link href={'/stickers'}><a><li className='hover:text-blue-600 flex items-center mr-36 '><TbSticker className='mx-1' />Stickers</li></a></Link>
          </ul>
        </div>
        <div className="hidden md:flex cursor-pointer items-center cart absolute right-0 mx-5 space-x-2">
          <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
            {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute right-8 top-5 md:right-10 md:top-7 py-4 bg-blue-100 w-44 rounded-md text-md">
              <ul>
                <Link href={'/myaccount'}><a><li className='py-1 px-4 hover:text-white hover:bg-blue-600'>My account</li></a></Link>
                <Link href={'/change-password'}><a><li className='py-1 px-4 hover:text-white hover:bg-blue-600'>Change Password</li></a></Link>
                <Link href={'/orders'}><a><li className='py-1 px-4 hover:text-white hover:bg-blue-600'>My Orders</li></a></Link>
                <li onClick={logout} className='py-1 px-4 hover:text-white hover:bg-blue-600'>Logout</li>
              </ul>
            </div>}
            {user.value && <MdAccountCircle className='text-xl md:text-3xl' />}
          </span>
          {!user.value && <Link href={'/login'}><a><button className="flex text-white bg-blue-500 border-0 py-1 px-2 mx-2 focus:outline-none hover:bg-blue-600 rounded-lg text-md">Login</button></a></Link>}
          <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl hover:text-blue-500' />
        </div>

        <div ref={cartRef} className={`sideCart overflow-y-scroll fixed top-0 bg-blue-50 py-10 px-8 w-4/5 md:w-2/4 h-[100vh] transition-all ${sidebar ? 'right-0' : '-right-full'}`}>
          {/* ${Object.keys(cart).length !== 0} ? 'translate-x-0' : 'translate-x-full' */}
          <h2 className='font-bold text-xl text-left mb-5'>Shopping Cart</h2>
          <hr className='bg-slate-300 h-[1px] border-0' />
          <span onClick={toggleCart} className="absolute top-10 right-8 cursor-pointer text-2xl text-slate-800"><AiOutlineClose /></span>
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 &&
              <div className="my-5 font-semibold">
                Your cart is empty!
              </div>}
            {/* {Object.keys(cart).map((k) => {
              return <li key={k} className='mx-6'>
                <div className="flex my-6">
                  <div className='w-2/4 md:w=2/3 flex items-center font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className='flex justify-center items-center w=1/3 ml-auto font-semibold text-lg'>
                    <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer text-xl' /><span className='mx-2 text-sm md:text-md font-semibold'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer text-xl' /></div>
                </div>
              </li>
            })} */}
            {Object.keys(cart).map((k) => {

              return <div key={k} className="mt-4 md:mt-6 flex flex-row md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                <div className="pb-4 md:pb-8 w-40">
                  <img className="w-full" src={cart[k].img} alt="dress" />
                  {/* <img className="w-full md:hidden" src={cart[k].img} alt="dress" /> */}
                </div>
                <div className="border-b border-gray-200 flex-row flex justify-between items-start w-full  pb-8 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start ml-2 space-y-8">
                    <h3 className="text-sm md:text-xl font-semibold leading-6 text-gray-800">{cart[k].name}<br/>({cart[k].size}/{cart[k].variant})</h3> 
                </div>
                  <div className='flex flex-col justify-center items-end w=1/3 ml-auto font-semibold text-lg'>
                    <span className=''> ₹{cart[k].price} </span>
                    <div className='flex mt-12'>
                    <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer text-xl' /><span className='mx-2 text-sm md:text-md font-semibold'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='text-blue-500 cursor-pointer text-xl' /></div>
                    </div>
                  </div>
              </div>
            })}
          </ol>
          <div className="subtotal font-bold text-lg mx-6">Subtotal: ₹{subTotal}</div>
          <div className="flex my-12 space-x-3 mx-6">
            <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-blue-300 flex text-white bg-blue-500 border-0 py-2 px-2 md:py-2 md:px-4 focus:outline-none hover:bg-blue-600 rounded text-md md:text-lg"><BsFillBagCheckFill className='m-1 mr-2' />Checkout</button></Link>
            <button onClick={clearCart} disabled={Object.keys(cart).length === 0} className="disabled:bg-blue-300 flex text-white bg-blue-500 border-0 py-2 px-2 md:py-2 md:px-4 focus:outline-none hover:bg-blue-600 rounded text-md md:text-lg">Clear</button>
          </div>
        </div>
      </div>
      <navbar id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        {/* <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> */}
        <div id="tabs" className="flex justify-between">
          <span className="w-full focus:text-blue-500 hover:text-blue-500 justify-center inline-block text-center pt-2 pb-1">
            <BiMenu onClick={toggleMenu} className='text-2xl inline-block mb-1' />
            <span className="tab tab-home block text-xs">Menu</span>
          </span>
          <Link href="/"><a className="w-full focus:text-blue-500 hover:text-blue-500 justify-center inline-block text-center pt-2 pb-1">
            <AiOutlineHome className='text-2xl inline-block mb-1' />
            <span className="tab tab-kategori block text-xs">Home</span>
          </a></Link>
          <span className="w-full focus:text-blue-500 hover:text-blue-500 justify-center inline-block text-center pt-2 pb-1">
            <AiOutlineShoppingCart onClick={toggleCart} className='text-2xl inline-block mb-1' />
            <span className="tab tab-whishlist block text-xs">Cart</span>
          </span>
          {mdropdown && <div onMouseOver={() => { setMdropdown(true) }} onMouseLeave={() => { setMdropdown(false) }} className='absolute right-8 bottom-14 py-4 bg-blue-100 w-44 rounded-md text-md'>
            <ul>
              <Link href={'/myaccount'}><a><li className='py-1 px-4 hover:text-white hover:bg-blue-600'>My account</li></a></Link>
              <Link href={'/change-password'}><a><li className='py-1 px-4 hover:text-white hover:bg-blue-600'>Change Password</li></a></Link>
              <Link href={'/orders'}><a><li className='py-1 px-4 hover:text-white hover:bg-blue-600'>My Orders</li></a></Link>
              <li onClick={logout} className='py-1 px-4 hover:text-white hover:bg-blue-600'>Logout</li>
            </ul>
          </div>}
          {user.value ? <span onMouseOver={() => { setMdropdown(true) }} onMouseLeave={() => { setMdropdown(false) }} className="w-full focus:text-blue-500 hover:text-blue-500 justify-center inline-block text-center pt-2 pb-1">
            <MdAccountCircle className='text-2xl inline-block mb-1' />
            <span className="tab tab-account block text-xs">Account</span>
          </span> : <Link href='/login'><a className="w-full focus:text-blue-500 hover:text-blue-500 justify-center inline-block text-center pt-2 pb-1">
            <BiLogInCircle className='text-2xl inline-block mb-1' />
            <span className="tab tab-account block text-xs">Login</span>
          </a></Link>}
        </div>
      </navbar>
      <div ref={menuRef} className={`menuCart overflow-y-scroll fixed top-0 bg-blue-50 py-10 px-8 w-4/5 md:w-2/4 h-[100vh] transition-all z-30 ${menuBar ? 'left-0' : '-left-full'}`}>
        <h2 className='font-bold text-xl text-left mb-5'>Menu</h2>
        <hr className='bg-slate-300 h-[1px] border-0' />
        <span onClick={toggleMenu} className="absolute top-10 right-8 cursor-pointer text-2xl text-slate-800"><AiOutlineClose /></span>
        <div className='nav-links my-5'>
          <ul className="flex flex-col space-x-4 space-y-4 font-bold md:text-lg ml-auto mb-4">
            <Link href={'/tshirts'}><a><li className='ml-4 hover:text-blue-600 flex item-center'><FaTshirt className='mt-1 mx-2' />Tshirts</li></a></Link>
            <Link href={'/hoodies'}><a><li className='hover:text-blue-600 flex item-center'><GiHoodie className='mt-1 mx-2' />Hoodies</li></a></Link>
            <Link href={'/mugs'}><a><li className='hover:text-blue-600 flex item-center'><FaMugHot className='mt-1 mx-2' />Mugs</li></a></Link>
            <Link href={'/stickers'}><a><li className='hover:text-blue-600 flex item-center'><TbSticker className='mt-1 mx-2' />Stickers</li></a></Link>
          </ul>
        </div>

      </div>
    </>
  )
}

export default Navbar