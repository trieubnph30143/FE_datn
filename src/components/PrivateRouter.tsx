import { Navigate } from "react-router-dom"


const PrivateRouter = ({user,children}:any) => {
    if(user){
        return <>{children}</>
    }
    return <Navigate to={"/"} />;
}

export default PrivateRouter