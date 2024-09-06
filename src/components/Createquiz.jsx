import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GetQuiznameContext } from "../App";


export default function Createquiz() {
  const [quiz, setQuiz] = useState('');
  //const [quizList, setquizList] = useState([]);
  const navigate = useNavigate();
  const setQuizValue = useContext(GetQuiznameContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = '';
    token = sessionStorage.getItem('token') || '';
    console.log(token.length)
    const API_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': token ? `Bearer ${token}`: '',
        },
        body: JSON.stringify({name: quiz}),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error("Något gick snett med POST-förfrågan vi gjorde :(((");
      }
      const resdata = await res.json();
      console.log(resdata);
    } catch (error) {
      console.error(error);
    }

    /* setquizList(quizList)
            quizList.push(quiz) */

    //console.log(quizList);
  };
  //const listItems = quizList.map((q, i) => <li key={i}>{q}</li>);

  return (
    <>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-2">
          <label>
            Quiz:
            <input
              type="text"
              onChange={(e) => {
                setQuiz(e.target.value);
                setQuizValue(e.target.value);
                
              }}
            ></input>
          </label>
        </div>
        
       {/*  <button type="submit">Create</button> */}

        
        <button type="submit" onClick={()=> navigate('/createQAmap')}>Create Quiz</button>
        
      </form>

      <ul></ul>
    </>
  );
}
