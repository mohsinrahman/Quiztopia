
import './App.css'
import { useState, createContext } from 'react';
import CreateAccount from './components/Createaccount'
import Login from './components/Login'
import Createquiz from "./components/Createquiz";
import CreateQAmap from './components/createQAmap';
import Showallquiz from './components/Showallquiz';

//import AddQA from './components/AddQA'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const QuizContext = createContext();
const GetQuiznameContext = createContext();


function App() {
 
  const [quizname, setQuizname] = useState('');
  return (
    <BrowserRouter>
     <QuizContext.Provider value={quizname}>
        <GetQuiznameContext.Provider value={setQuizname}>
      <Routes>
      <Route path="/" element={<CreateAccount/>}></Route> 
      <Route path="/login" element={<Login/>}></Route> 
      <Route path="/createquiz" element={<Createquiz/>}></Route> 
      <Route path="/createQAmap" element={<CreateQAmap/>}></Route> 
      <Route path="/showallquiz" element={<Showallquiz/>}></Route> 
      </Routes>
      </GetQuiznameContext.Provider>
      </QuizContext.Provider>
    </BrowserRouter>
    
  )
}
export { QuizContext, GetQuiznameContext };
export default App
