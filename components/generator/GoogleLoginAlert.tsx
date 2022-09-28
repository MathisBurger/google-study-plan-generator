import React from "react";

/**
 * General purpose alert that is displayed to remind the
 * user to log in with his the Google account
 *
 * @constructor
 */
const GoogleLoginAlert: React.FC = () => {

    return (
        <div className="alert alert-warning" role="alert">
            Make sure you completed the google login process.
            Otherwise, the timetable cannot be created.
        </div>
    );
}

export default GoogleLoginAlert;
