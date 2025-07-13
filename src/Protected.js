import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props){
    let Cmp = props.Cpm;
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("user-info")) {
            navigate("/register");
        }
    }, [navigate]);
    
    return (
        <div>
            <Cmp />
        </div>
    )
}

export default Protected;