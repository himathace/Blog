import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Details(){

    const params=useParams()
    const id=params.id

    const [data,displaydata]=useState("")
    const [displayedit,setdispalyedit]=useState(0)

    const navigate=useNavigate()


    useEffect(()=>{

        const displaydetails=async ()=>{

            try{
                const userdata=await fetch(`http://localhost:3000/details/${id}`,{
                    credentials:"include" // include credentials (cookies, authorization headers, and TLS client certificates) when making the HTTP request.
                })
                const datax=await userdata.json()
                displaydata(datax.fulldata)

                if(datax.status!=401 && datax.checkvalid===datax.fulldata.username ){
                    setdispalyedit(1)
                }
            }
            catch(error){
                alert(error)
            }


        }

        displaydetails()
    },[])


    const deletedata=async ()=>{

        try{

            const userdata=await fetch(`http://localhost:3000/delete/${id}`,{
                method:"DELETE",
                credentials: "include"
            })
            const data=await userdata.json()

            if(data.status===404){
                alert("blog not found")
            }

            if(data.status===200){
                alert("post deleted successfully")
                navigate("/")
            }

            if(data.status===400){
                alert("error")
            }


        }
        catch(error){
            alert(error)
        }
    }


    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 max-w-3xl w-full">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{data.title}</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                by <span className="font-medium text-gray-800">{data.username}</span>
                </p>

                <div className="text-gray-800 leading-relaxed space-y-4 text-base sm:text-lg">
                    <div>
                        <p>{data.content}</p>
                    </div>
                </div>

                <div className="mt-8 flex space-x-4">

                    {
                        displayedit===1 && (

                            <>
                                <a href={`/update/${data._id}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                Edit
                                </a>
                                <a  className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200 hover:cursor-pointer " onClick={deletedata}>
                                Delete
                                </a>
                            </>

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Details