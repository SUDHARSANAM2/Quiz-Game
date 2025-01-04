import React, { useRef, useState } from 'react';
import './Quiz.css';
import {data} from '../Assets/data.js'


const Quiz = () => {

    const [index,setIndex]= useState(0);
    const [question,setQuestion]= useState(data[index]);

    // lock the options

    const [lock,setLock]=useState(false);

    // set the score
    const [score,setScore]=useState(0);

    // Result 
    const [result,setResult]=useState(false);
    
    // show the correct answer in the option
    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const optionArray = [option1,option2,option3,option4];

    const checkAnswer = (e,ans) => {
        if(lock===false){

            if(question.ans===ans){
                e.target.classList.add("Correct");
                setLock(true);
                setScore(prev=> prev+1);
            }
            else{
                e.target.classList.add("Wrong");
                setLock(true);
                optionArray[question.ans-1].current.classList.add("Correct");
            }
        }
       
    }

    // Reset Button 
    const resetButton=() =>{
        setIndex(0);
        setQuestion(data[index]);
        setScore(0);
        setLock(false);
        setResult(false);

    }

    // Next Question when next button Clicks
    const next=()=>{
        if(lock===true){ 
            if(index=== data.length-1){
                setResult(true);
                return null;
            }
            setIndex(index+1);
            setQuestion(data[index+1]);
            setLock(false);
            optionArray.map((option)=>{
                option.current.classList.remove("Correct");
                option.current.classList.remove("Wrong");
                return null;
            })
        } 
    }

    return (
        <div className='Container' >
            <h1>Quiz </h1>
            <hr />
            {result?
            <>
                <p className='ScoreCard'>Your Score is {score}</p>
                <button className='reset-Btn' onClick={resetButton}>Reset</button>
            </>:<>
            <h2>{index+1}.{question.question}</h2>
            <ul className='option-list' >
                <li ref={option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.option1}</li>
                <li ref={option2} onClick={(e)=>{checkAnswer(e,2)}} >{question.option2}</li>
                <li ref={option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.option3}</li>
                <li ref={option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={next} >Next</button>
            <p className='index' >{index+1} of {data.length} question</p>
            </>}
           
        </div>

    );          

}
export default Quiz;