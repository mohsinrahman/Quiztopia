import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();
   
    const handleSubmit = async (event) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan
        // fetch mot API:et
        // API:ets endpoint tar ett objekt med un, ps, fn, ln
        const userData = {username, password, firstname,lastname};
        const URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup';
        try {
            const response = await fetch(URL, {
                method: 'POST', // använd post-metoden här!
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Något gick galet');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="m-2">
        <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
            ></input>
        </label>
        </div>
        <div className="m-2">
        <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            ></input>
        </label>
        </div>
        <div className="m-2">
        <label>
            First name:
            <input
                type="text"
                value={firstname}
                onChange={(e) => {setFirstname(e.target.value)}}
            ></input>
        </label>
        </div>
        <div className="m-2">
        <label>
            Last namn:
            <input
                type="text"
                value={lastname}
                onChange={(e) => {setLastname(e.target.value)}}
            ></input>
        </label>
        </div>
        <button type="submit" onClick={()=> navigate('/login')}>Signup</button>
    </form>
  )
}