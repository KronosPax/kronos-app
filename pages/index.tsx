import React, {useState} from "react";
import type { NextPage } from 'next'
import {Login} from "./Login";
import {Register} from "./Register"

const Home: NextPage = () => {
    const [currForm, setCurrForm] = useState('login')
    return (<>{
            currForm === 'login' ? <Login/> : <Register/>
    }</>
  )
}

export default Home
