import { useEffect, useState } from "react";
import Button from "./UI/Button";

import styles from "./CookieConsent.module.css";

const CookieConsent = () => {
    const cookieString = "indie.johnbrynte.harjagpollenallergi.consent";

    // default true, to avoid the element being rendered before checking
    const [cookieConsent, setCookieConsent] = useState(true);

    useEffect(() => {
        try {
            const consent = window.localStorage.getItem(cookieString);
            if (consent) {
                setCookieConsent(consent === "true");
            } else {
                // remember to set it to false here
                setCookieConsent(false);
            }
        } catch (e) { }
    }, []);

    const acceptCookieTerms = () => {
        setCookieConsent(true);

        window.localStorage.setItem(cookieString, true);
    }

    return !cookieConsent && (
        <div>
            <div className={styles.info}>Sidan använder "cookies" för att lagra den data du matar in. <Button compact click={acceptCookieTerms}>OK</Button></div>
        </div>
    );
};

export default CookieConsent;