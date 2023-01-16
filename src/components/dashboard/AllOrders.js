import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Image from "next/image";

const AllOrders = ({ orders }) => {

    const [deliveryStatus, setDeliveryStatus] = useState('')
    useEffect(() => {
        console.log(orders)
    }, [])

    return (
        <BaseCard title="All orders">
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Order Id
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Customer Name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Phone/Email
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Pincode
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Status
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Delivery Status
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography color="textSecondary" variant="h6">
                                Amount
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {order.orderId}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {order.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "600",
                                            }}
                                        >
                                            {order.phone}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                fontSize: "13px",
                                            }}
                                        >
                                            {order.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {order.pincode}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                </Typography>
                                {order.status == 'Initiated' && <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: "orange",
                                        color: "black",
                                    }}
                                    size="small"
                                    label={order.status}
                                ></Chip>}
                                {order.status == 'Pending' && <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: "red",
                                        color: "white",
                                    }}
                                    size="small"
                                    label={order.status}
                                ></Chip>}
                                {order.status == 'Paid' && <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: "green",
                                        color: "white",
                                    }}
                                    size="small"
                                    label={order.status}
                                ></Chip>}
                            </TableCell>
                            <TableCell>
                            <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                </Typography>
                                {order.deliveryStatus == 'unshipped' && <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: "gray",
                                        color: "white",
                                    }}
                                    size="small"
                                    label={order.deliveryStatus}
                                ></Chip>}
                                {order.deliveryStatus == 'shipped' && <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: "orange",
                                        color: "black",
                                    }}
                                    size="small"
                                    label={order.deliveryStatus}
                                ></Chip>}
                                {order.deliveryStatus == 'delivered' && <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: "green",
                                        color: "white",
                                    }}
                                    size="small"
                                    label={order.deliveryStatus}
                                ></Chip>}
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6">₹{order.amount}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseCard>
    );
};


export default AllOrders;
