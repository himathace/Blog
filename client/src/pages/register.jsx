import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register(){

    const navigate=useNavigate()

    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState(null)

    const send_credentails=async ()=>{

        try{

            const userdata=await fetch("http://localhost:3000/register",{
                method:"POST",
                headers:{
                    "content-type":"application/Json"
                },
                body:JSON.stringify({
                    inputname:username,
                    inputemail:email,
                    inputpassword:password
                })
            })

            const data=await userdata.json()

            if(data.status===200){
                alert("register success")
                navigate("/login")

            }
            else{
                
                if(data.errors && data.errors.length > 0){
                    // alert(data.errors[0].msg)
                    seterror(data.errors[0].msg)
                }
                else{
                    alert("registration falid")
                }

            }
        }
        catch(error){
            alert(error)
        }
    }


    return(

        <div className="flex min-h-screen justify-center items-center bg-[#f5f5f5]">
            <div className=" w-96 rounded-xl p-10 bg-white shadow-xl">
                <div className="text-center text-2xl  mb-2 font-medium">Create account</div>
                <div className="text-slate-500 mb-10 text-center text-sm">Please fill in your details to sign up</div>
                <div className="mb-6">
                    <label for="email" className="block mb-3 text-sm font-semibold">username</label>
                    <input type="email" id="email" placeholder="Enter your username" className={`w-full rounded-md h-10 p-4 border focus:outline-none focus:ring-2 focus:ring-gray-700 ${error && error.includes("Username") ? " border-2 border-red-800" : "border-[#e1e1e1]"}  `} onFocus={()=>seterror(null)} required onChange={(e)=>{setusername(e.target.value)}} ></input>
                    <p className="text-xs text-red-800" >{error && error.includes("Username") && error}</p>
                </div>
                <div className="mb-6">
                    <label for="email" className="block mb-3 text-sm font-semibold">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" className={`w-full rounded-md h-10 p-4 border  focus:outline-none focus:ring-2 focus:ring-gray-700  ${error && error.includes("Email") ? "border-2 border-red-800" : "border-[#e1e1e1]" } `} required onChange={(e)=>{setemail(e.target.value)}} onFocus={()=> seterror(null)} ></input>
                    <p className="text-xs text-red-800" >{error && error.includes("Email") && error}</p>
                </div>
                <div className="mb-4">
                    <label for="password" className="block mb-3 text-sm font-semibold">Password</label>
                    <input type="password" id="password" placeholder="••••••••" className={`w-full rounded-md h-10 p-4 border   focus:outline-none focus:ring-2 focus:ring-gray-700 ${ error && error.includes("Password") ? "border-2 border-red-800" : "border-[#e1e1e1]" } `} required onChange={(e)=>{setpassword(e.target.value)}} onFocus={()=> seterror(null)} ></input>
                    <p className="text-xs text-red-800" >{error && error.includes("Password") && error}</p>
                </div>
                <div className=" text-gray-500 mb-4 space-x-3 flex items-start">
                    <input type="checkbox" className="mt-1"></input>
                    <label className="text-sm">By creating an account, you agree to our <span className="font-bold">Terms of Service</span>  and <span className="font-bold"> Privacy Policy</span></label>
                </div>
                <div className="mb-4">
                    <button className="w-full h-12 bg-black rounded-lg text-white font-medium hover:bg-gray-800" onClick={send_credentails} >Create account</button> 
                </div>
                <div className="mb-4 flex items-center" >
                    <div className="flex-1 border-t border-[#e1e1e1]"></div>
                    <span className="px-6 text-slate-500 text-sm">or</span>
                    <div className="flex-1 border-t border-[#e1e1e1]"></div>
                </div>
                <div className="mb-6">
                    <button className="w-full flex justify-center items-center border h-12 rounded-lg gap-x-3 text-sm text-[#333]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <div className="flex justify-center text-sm text-[#666] gap-x-2">
                    Don't have an account? <a href="/login" className="text-black font-semibold"> Sign in</a>
                </div>

            </div>
        </div>
    )
}

export default Register