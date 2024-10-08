import React  from 'react'
import { useEffect, useState } from 'react';
import ShowMap from './ShowMap';
import { useNavigate } from "react-router-dom";

export default function Showallquiz() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        const checkToken = async () => {
            let token = '';
            token = sessionStorage.getItem('token') || '';
            // check på om det är en tom sträng 
            if (token.length > 0) {
                try {
                    const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`
                        }
                    });
                    const datalist = await response.json();
                    setData(datalist);
                         
                } catch (error) {
                    console.error(error);
                }
            }
        };
        checkToken();
        
    }, []);
    
  return (
    <>
    <h2>Show Quiz</h2>
    <ul className='grid-container'>
  
    { 
        data.quizzes?.map((item,index) => (
          <li key={index} onClick = {() =>  navigate('/showMap',{state:item})} >
            <span className='quizUsername'>
            Username: {item.username}
            </span>
            <span className='quizId'>
            ID: {item.quizId}
            </span>
          </li>
        ))}


    </ul>
    </>
    
    
  )

}
