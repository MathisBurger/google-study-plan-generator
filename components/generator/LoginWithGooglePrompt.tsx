import React from "react";
import useCalendar from "../../hooks/useCalendar";

interface LoginWithGooglePromptProps {
    /**
     * Goes to the next step
     */
    nextStep: () => void;
}

/**
 * Prompts the user to log in with his google
 * account.
 *
 * @constructor
 */
const LoginWithGooglePrompt: React.FC<LoginWithGooglePromptProps> = ({nextStep}) => {

    const calendar = useCalendar();

    const loginWithGoogle = () => {
        if (calendar) {
            calendar?.handleAuthClick();
            nextStep();
        }
    }

    return (
        <div>
            <h3>Bitte melden sie sich zuerst mit ihrem Google-Konto an, um ihren Stundenplan generieren zu können</h3>
            <button className="btn btn-primary" onClick={loginWithGoogle}>Login</button>
        </div>
    );
}

export default LoginWithGooglePrompt;
