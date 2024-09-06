import React  from 'react'
import { useEffect, useState } from 'react';

export default function Showallquiz() {
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
                    if(data){
                        console.log(data);  
                    }
                         
                
                } catch (error) {
                    console.error(error);
                }
            }
        };
        checkToken();
        
        
    });
    if(data) {     
  return (
    <>
    <div>Showallquiz</div>
    <ul>
  {
    data.quizzes.map((item, index) => {
     
     <li key={index}>{item.username}</li>
    })  
}
    </ul>
    </>
    
    
  )
} 
}
