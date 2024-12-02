import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import './wrkout.css';
import { data } from 'react-router-dom';


// const wrkout = () => {

//     const handleClick = () => {
//         alert('hello am here ')
//     }

//     return (

//         <div className="simple-container">
//             <h1>Welcome to My Page</h1>
//             <button onClick={handleClick}>Click Me</button>
//         </div>

//     )
// }


// export default wrkout
// export  const MyContext=createContext(null)

// const ContextDummy=()=>{
//     return (
//         <MyContext.Provider value={'Hello From Child'}>
//             <ChildComponent/>
//         </MyContext.Provider>
//     )
// }

// const ChildComponent=()=>{
//     const value=useContext(MyContext)
//     return (
//         <div>
//             <p>{value}</p>
//         </div>
//     )
// }

// export default ContextDummy

// const Child=React.memo(({onClick})=>{
//     console.log('child rendered........');
//     return (
//         <button onClick={onClick}>clcik child btn</button>
//     )
// })

// const Parent=()=>{
//     const [count,setCount]=useState(0)

//     const handleClick=useCallback(()=>{
//        console.log('child button clicked');

//     })

//     return (
//         <div>
//             <p>Parent count:{count}</p>
//             <button onClick={()=>setCount(count+1)}>Parent btn</button>
//             <Child onClick={handleClick}/>
//         </div>

//     )
// }

// export default Parent


// export const CounterComponent=createContext()

//  const CounterProvide=()=>{
//     const [count,setCounter]=useState(0)

//     const increment=()=>setCounter(count+1)
//     const decrement=()=>setCounter(count-1)
//     const rest=()=>setCounter(0)

//     return (
//         <>
//         <CounterComponent.Provider value={{count,increment,decrement,rest}}>
//             <Counter/>
//         </CounterComponent.Provider>
//         </>
//     )
// }

// const Counter=()=>{
//     const {count,increment,decrement,rest}=useContext(CounterComponent)

//     console.log(useContext(CounterComponent),'=======================');


//     return (
//         <div>
//             <h1>Counter</h1>
//             <p>{count}</p>
//             <button onClick={increment}>increment</button>
//             <button onClick={decrement}>decrement</button>
//             <button onClick={rest}>rest</button>
//         </div>
//     )
// }

// export default CounterProvide


















// const Counter=()=>{
//     const [count,setCout]=useState(0)

//     const handleCount=useCallback(()=>{
//         setCout((pre))
//     })
// }