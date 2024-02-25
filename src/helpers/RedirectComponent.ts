import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const RedirectComponent = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // הפנייה לאתר מסוים
        const redirectToSpecificSite = () => {
            navigate("/tradingArea/")
        }
        redirectToSpecificSite();
    }, []);
    return null;
};

export default RedirectComponent;
