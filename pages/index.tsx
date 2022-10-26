import React, {useState} from "react";
import type { NextPage } from 'next'
import {Login} from "./Login";
import {Register} from "./Register"

const Home: NextPage = () => {
    const [currForm, setCurrForm] = useState('login')

    const toggleForm = (formName) => {
        setCurrForm(formName);
    }
    return (<>{
            currForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    }</>
  )
}

export default Home
