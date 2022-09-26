import {NextPage} from "next";
import useCalendar from "../hooks/useCalendar";


const Generator: NextPage = () => {

    const calendar = useCalendar();

    const loginWithGoogle = () => {
        if (calendar) {
            console.log("jshadgaj");
            calendar?.handleAuthClick();
        }
    }

    return (
        <button className="btn btn-primary" onClick={loginWithGoogle}>Login</button>
    );
}

export default Generator;
