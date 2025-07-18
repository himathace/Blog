import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"

function Dash(){

    const [display,setdispaly]=useState(0)

    const navigate=useNavigate()



    useEffect(()=>{

        const validate=async ()=>{
            
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
                    return setdispaly(0)
                }

                if(data.status===200){
                    return setdispaly(1)
                }
            }
            catch(error){
                alert(error)
                setdispaly(0)
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
            navigate("/")
            setdispaly(0)

        }
        catch(error){
            alert(error)
        }
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
                                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                            Create
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                            user
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
                    {/* Blog Post 1 */}
                    <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-900">The Art of Minimalist Design</h2>
                        <p className="text-gray-600 mb-4">
                        by <span className="font-medium text-gray-700">Jane Doe</span>
                        </p>
                        <a href="#" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium group">
                        Read More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        </a>
                    </article>

                    {/* Blog Post 2 */}
                    <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Understanding Server Components in Next.js</h2>
                        <p className="text-gray-600 mb-4">
                        by <span className="font-medium text-gray-700">John Smith</span>
                        </p>
                        <a href="#" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium group">
                        Read More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        </a>
                    </article>

                    {/* Blog Post 3 (Example) */}
                    <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-900">The Future of Web Development</h2>
                        <p className="text-gray-600 mb-4">
                        by <span className="font-medium text-gray-700">Alice Johnson</span>
                        </p>
                        <a href="#" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium group">
                        Read More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        </a>
                    </article>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Dash