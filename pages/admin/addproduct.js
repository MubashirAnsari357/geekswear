import React, {useEffect} from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../src/theme/theme";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../../src/createEmotionCache";
const clientSideEmotionCache = createEmotionCache();
import {
  Grid,
  Stack,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { useState } from 'react';

const Addproduct = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;
  const [form, setForm] = useState({ slug: "", title: "", category: "", desc: "", size: "", color: "", price: "", availableQty: "", })
  const [alert, setAlert] = useState(true)
  const [variant, setVariant] = useState("error")
  const [message, setMessage] = useState("")
  const { slug, title, category, desc, size, color, price, availableQty } = form
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false)
    }, 1000);

    return () => clearTimeout(timer);
  }, [])
  
  const handleSubmit = async () => {
    let data = { slug, title, category, desc, size, color, price, availableQty }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([data])
    })
    let response = await res.json()
    console.log(response)
    if (response) {
      setAlert(true)
      setVariant("success")
      setMessage(response.message)
    }
    else{
      setAlert(true)
      setVariant("error")
      setMessage(response.error)
    }
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
        <CssBaseline />
        <FullLayout>
          {alert && <Alert severity={variant}>
              {message}
            </Alert>}
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add Product">
                <Stack spacing={3}>
                  <TextField onChange={onChange} value={slug} name="slug" label="Slug" variant="outlined" />
                  <TextField onChange={onChange} value={title} name="title" label="Title" variant="outlined" />
                  <TextField onChange={onChange} value={desc} name="desc" label="Description" multiline rows={4} />
                  <TextField onChange={onChange} value={category} name="category" label="Category" />
                  <TextField onChange={onChange} value={size} name="size" label="Size" variant="outlined" />
                  <TextField onChange={onChange} value={color} name="color" label="Color" variant="outlined" />
                  <TextField onChange={onChange} value={price} name="price" label="Price" variant="outlined" />
                  <TextField onChange={onChange} value={availableQty} name="availableQty" label="Available Qty" variant="outlined" />
                </Stack>
                <br />
                <Button onClick={handleSubmit} variant="contained" mt={2}>
                  Submit
                </Button>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout >
      </ThemeProvider>
    </CacheProvider>
  )
}

export default Addproduct