import { useContext, useEffect } from "react"
import { UserContext } from "../../components/context/ContextProvider";

export default function Logout(props) {
    const { handleUserData } = useContext(UserContext);

    useEffect(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        handleUserData("");
        props.history.push('/');
    }, [])

    return (
        null
    )
}