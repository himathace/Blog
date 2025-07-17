import { useState,useEffect } from 'react'

function App() {

  const [display,setdisplay]=useState("")

  
  useEffect(()=>{

    const fetchdata=async ()=>{
      try{
        const responce=await fetch("http://localhost:3000/pages")
        const data=await responce.json()
        setdisplay(data.message)
      }
      catch(error){
        alert(error)
      }
    }

    fetchdata()


  },[])

  
  

  return (
    <>
      <h1 className='text-red-600'>{display}</h1>
      

    </>
  )
}

export default App
