"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('/api/verifyEmail', { token })
            setVerified(true)
            setLoading(false);
            setMessage(response.data.message)
            console.log(response)
        } catch (error: any) {
            setError(error.response.data.error)
            console.log(error)
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])
    return (
        <h2 className=' text-3xl font-semibold bg-red-500 text-white'>{token}</h2>
    )
}

export default Page