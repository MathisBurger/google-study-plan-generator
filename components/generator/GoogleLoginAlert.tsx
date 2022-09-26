import React from "react";


const GoogleLoginAlert: React.FC = () => {

    return (
        <div className="alert alert-warning" role="alert">
            Make sure you completed the google login process.
            Otherwise, the timetable cannot be created.
        </div>
    );
}

export default GoogleLoginAlert;
