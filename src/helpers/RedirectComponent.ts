import { useEffect } from 'react';

const RedirectComponent = () => {
    useEffect(() => {
        // הפנייה לאתר מסוים
        const redirectToSpecificSite = () => {
            const desiredUrl = "https://bargains-deals-front.onrender.com/tradingArea";
            window.location.replace(desiredUrl);
        }
        redirectToSpecificSite();
    }, []);
    return null;
};

export default RedirectComponent;
