import { useState,useEffect } from "react"

function Login(){

    const [login,setlogin]=useState("")
    const [newusername,setusername]=useState("")
    const [newpassword,setpassword]=useState("")


    const letuserlogin=async (e)=>{
        e.preventDefault()


        try{

            const responce=await fetch("http://localhost:3000/login",{
                method:"POST",
                credentials:"include",
                headers:{
                    "content-type":"application/Json"
                },
                body:JSON.stringify({            // converts a JavaScript object (or array) into a JSON string.
                    username:newusername,
                    password:newpassword
                })
            })

            const data=await responce.json()  // converts  JSON string  into  JavaScript object.

            alert(data.message)

            


        }
        catch(error){
            alert(error)
        }
    }
    
    return(

        <form onSubmit={letuserlogin}>
            <label className="text-blue-600">username</label>
            <input type="text" name="username" onChange={(e)=>setusername(e.target.value)} />
            <label>password</label>
            <input type="text"  name="password" onChange={(e)=>setpassword(e.target.value)}/>
            <button>submit</button>
        </form>
    )
}

export default Login