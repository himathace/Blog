import { useEffect,useState,useRef } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import Postcard from "../cards/postcard"

function Dash(){

    const [display,setdispaly]=useState(0)
    const [loading,setLoading]=useState(true)
    const [myname,setmyname]=useState("")
    const inputref=useRef(null)
    const [databsedata,setdatabasedata]=useState([])

    const navigate=useNavigate()
    const location=useLocation()



    useEffect(()=>{

        const validate=async ()=>{

            setLoading(true)
            
            try{
                const userdata=await fetch("http://localhost:3000/dashboard",{
                    method: "GET",
                    credentials: "include", // send or reserve cookies
                    headers:{
                        "content-Type":"application/json",
                    }
                })

                const data=await userdata.json()
                
                if(data.status === 401){
                    setdatabasedata(data.dbdata)
                    setdispaly(0)
                }

                if(data.status===200){
                    setmyname(data.name)
                    setdatabasedata(data.dbdata)
                    setdispaly(1)
                }
            }
            catch(error){
                alert(error)
                setdispaly(0)
            }
            finally{
                setLoading(false)
            }
        }

        validate()

        
    },[location.pathname,location.key]) // run use effect every time path change


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
            setdispaly(0)
            navigate("/")


        }
        catch(error){
            alert(error)
        }
    }


    if(loading){

        return(
             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        )
    }

    
    return(

        <>
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
                {/* Navbar */}
                <nav className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 md:px-8">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="text-lg font-bold text-gray-900">My Blog</div>
                    <ul className="flex space-x-6">

                        {
                            display === 1 ?  (
                                <>
                                    <li>
                                        <a className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:cursor-pointer" onClick={logout}>log out</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/create" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                            Create
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200" >
                                            {myname}
                                        </a>
                                    </li>
                                </>

                            ) : (
                                <li>
                                    <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                        Login
                                    </a>
                                </li>
                            )

                        }
                    </ul>
                    </div>
                </nav>

                {/* Main Content - Blog Posts */}
                <main className="max-w-4xl mx-auto py-10 px-6 md:px-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">BLOG POSTS</h1>

                    <div className="space-y-8">

                        {
                            databsedata.map((val)=>{
                                return <Postcard post={val} key={val._id}  />
                            })
                        }
                    </div>
                </main>
            </div>
        </>
    )
}

export default Dash