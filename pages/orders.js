import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Head from 'next/head' 
const Orders = () => {
    const router = useRouter()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myUser')).token }),
            })
            let res = await a.json()
            setOrders(res.orders)
        }

        if (!localStorage.getItem('myUser')) {
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
        else {
            fetchOrders();
        }
    }, [])
    return (
        <div className="container mx-auto w-3/4 my-16 min-h-screen">
            <Head><title>Orders | GeeksWear</title></Head>
            <h1 className='font-semibold md:text-2xl text-xl text-center my-6'>My Orders</h1>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                #
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Placed On
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Payment Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Payment
                            </th>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Details</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item) => {
                            return <tr key={item} className="bg-white border-b hover:bg-blue-50">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                                    {item.orderId}
                                </th>
                                <td scope="row" className="py-4 px-6">
                                    {item.email}
                                </td>
                                <td scope="row" className="py-4 px-6">
                                    {item.createdAt.slice(0, 10)}
                                </td>
                                <td scope="row" className="py-4 px-6">
                                    {item.status}
                                </td>
                                <td scope="row" className="py-4 px-6">
                                    ₹{item.amount}
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <Link href={'order?id=' + item._id}><a className="font-medium text-blue-600 hover:underline">Details</a></Link>
                                </td>
                            </tr>
                        })}

                    </tbody>
                    {/* <tfoot>
                        <tr className="font-semibold text-gray-900">
                            <th scope="row" className="py-3 px-6 text-base"></th>
                            <th scope="row" className="py-3 px-6 text-base"></th>
                            <th scope="row" className="py-3 px-6 text-base"></th>
                            <th scope="row" className="py-3 px-6 text-base">Total</th>
                            <td className="py-3 px-6 text-base">₹10,000</td>
                        </tr>
                    </tfoot> */}
                </table>
            </div>

        </div>
    )
}

export default Orders