import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import "../styles/style.css";

function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)

  const router = useRouter();

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i - keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }

    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
    const myUser = JSON.parse(localStorage.getItem("myUser"));
    if(myUser){
      setUser({value: myUser.token, email: myUser.email})
    }
    setKey(Math.random())
  }, [router.query])


  const addtoCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img }
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const buyNow = (itemCode, qty, price, name, size, variant, img) => {
    // saveCart({})
    let newCart = {}
    newCart[itemCode] = { qty: 1, price, name, size, variant, img } 
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]

    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const logout = ()=>{
    localStorage.removeItem('myUser')
    setUser({value: null})
    setKey(Math.random())
    router.push('/login')
    toast.success('Logged Out!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  return <>
  <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
    <ToastContainer />
    {key && <Navbar logout={logout} user={user} key={key} cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
    <Component cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} buyNow={buyNow} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>

}

export default MyApp
