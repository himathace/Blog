import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"

function Details(){

    const params=useParams()
    const id=params.id

    const [data,displaydata]=useState("")


    useEffect(()=>{

        const displaydetails=async ()=>{

            try{
                const userdata=await fetch(`http://localhost:3000/details/${id}`)
                const datax=await userdata.json()
                displaydata(datax.fulldata)
            }
            catch(error){
                alert(error)
            }


        }

        displaydetails()
    },[])

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
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                    Edit
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200">
                    Delete
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Details