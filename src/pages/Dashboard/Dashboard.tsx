import React, { useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie';

export default function Dashboard() {
    const [cookies, setCookie] = useCookies(['token']);
    console.log("THis is your tokens",cookies.token);
    return (
        <div>
            <h1 className="text-center text-3xl font-bold">Dashboard</h1>
            <div>
                
            </div>
        </div>
    )
}
