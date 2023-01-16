import React from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import mongoose from 'mongoose';
import Order from '../../models/Order';
import AllOrders from '../../src/components/dashboard/AllOrders';

const Allorders = ({orders}) => {

  return (
      <ThemeProvider theme={theme}>
        <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
        <CssBaseline />
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <AllOrders orders={orders}/>
            </Grid>
          </Grid>
        </FullLayout >
      </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let orders = await Order.find({ })
  

  return {
    props: { orders: JSON.parse(JSON.stringify(orders))},
  }
}



export default Allorders