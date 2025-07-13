import Header from "./Header";
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Login (){

    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem("user-info")){
          navigate("/add-product");
      }
    })
    
    return (
        <div>
            <Header />
            <h1>Login Page</h1>
        </div>
    )
}

export default Login;