import { useEffect, useState } from "react";
import Button from "./UI/Button";

import styles from "./CookieConsent.module.css";

const CookieConsent = () => {
    const cookieString = "indie.johnbrynte.harjagpollenallergi.consent";

    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect(() => {
        try {
            const consent = window.localStorage.getItem(cookieString);
            if (consent) {
                setCookieConsent(consent === "true");
            }
        } catch (e) { }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(cookieString, cookieConsent);
    }, [cookieConsent]);

    return !cookieConsent && (
        <div>
            <div className={styles.info}>Sidan använder "cookies" för att lagra den data du matar in. <Button compact click={() => setCookieConsent(true)}>OK</Button></div>
        </div>
    );
};

export default CookieConsent;