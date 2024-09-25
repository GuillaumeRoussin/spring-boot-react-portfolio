import {useNavigate} from "react-router-dom";
import {useMeContext} from "@/pages/header";
import React from "react";

export function Profiles() {
    const me = useMeContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!me.authorities.includes({authority: "\"ROLE_ADMIN\""})) {
            navigate("/");
        }
    }, [me, navigate])
    return <>
        Profiles
    </>
}