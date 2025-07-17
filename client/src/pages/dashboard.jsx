import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Dash(){


    const navigate=useNavigate()



    useEffect(()=>{

        const validate=async ()=>{
            
            try{
                const userdata=await fetch("http://localhost:3000/dashboard",{
                    method: "GET",
                    credentials: "include", // send or reserve cookies
                    headers:{
                        "content-Type":"application/json"
                    }
                })

                const data=await userdata.json()
                
                if(data.status===401){
                    alert("you must login to access this page")
                    navigate("/login")
                }
            }
            catch(error){
                alert(error)
            }
        }

        validate()
    },[])


    const logout=async ()=>{

        try{
            const logoutuser=await fetch("http://localhost:3000/logout",{
                method: "POST",
                credentials: "include",
                headers :{
                    "content-Type" : "application/json"
                }

            })
            const data=await logoutuser.json()
            alert(data.message)
            navigate("/login")

        }
        catch(error){
            alert(error)
        }
    }

    
    return(

        <>
            <h1>this is dashboard</h1>

            <button onClick={logout}>log out</button>
        </>
    )
}

export default Dash