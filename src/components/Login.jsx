import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [isSubmmited, setisSubmmited] = useState(false); 
    const navigate = useNavigate();
   /*  const handleShowClick = () => {
        setShow(true);
      } */

    // när vi loggar in ska vi få tillbaka en token
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { username, password };
        console.log('here we are');
        const API_URL = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login";
        try {
            console.log(userData);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Något gick snett med POST-förfrågan vi gjorde :(((')
            }
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('token', data.token);
            const token = sessionStorage.getItem('token')
            console.log(token)
            if(token.length > 0){
                console.log(token)
             navigate('/createquiz') 
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
        <article>
            <form onSubmit={handleSubmit}>
                <div className="m-2">
                <label>
                    Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    ></input>
                </div>
                <div className="m-2">
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </label>
                </div>
{/*                  <button onClick={handleShowClick} type="submit">Login</button> 
 */}                 <button type="submit">Login</button>
                
          
            </form>
      
        </article>
        
        </div>
    )
}