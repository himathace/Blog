function Postcard({post}){

    return(

        <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">{post.title}</h2>
            <p className="text-gray-600 mb-4">
            by <span className="font-medium text-gray-700">{post.author}</span>
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
    )
}

export default Postcard