import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({children, authentication=true}){

    const [loader, setLoader] = useState(true)
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // TODO: more easy way 
        // if(authStatus === true){
        //     navigate('/')
        // }else if(authStatus === false){
        //     navigate('/login')
        // }

        if(authentication && authStatus !== authentication ){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    },[navigate,authentication,authStatus])
  return loader ? <h2>Loading...</h2> : <>{children}</>
}

