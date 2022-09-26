import {NextPage} from "next";
import useCalendar from "../hooks/useCalendar";
import LoginWithGooglePrompt from "../components/generator/LoginWithGooglePrompt";
import {useEffect, useState} from "react";
import GoogleLoginAlert from "../components/generator/GoogleLoginAlert";
import SelectLessonTimes from "../components/generator/SelectLessonTimes";

enum Step {
    Login,
    SelectLessonTimes,
    EnterTimetable,
    CreateNewCalendar,
    Submit
}


const Generator: NextPage = () => {

    const calendar = useCalendar();
    const [step, setStep] = useState<Step>(Step.Login);

    return (
        <div className="home-container">
            {step === Step.Login && (
                <LoginWithGooglePrompt nextStep={() => setStep(Step.SelectLessonTimes)} />
            )}
            {step !== Step.Login && (
                <GoogleLoginAlert />
            )}
            {step === Step.SelectLessonTimes && (
                <SelectLessonTimes nextStep={() => setStep(Step.EnterTimetable)} setLessonTimes={() => {}} />
            )}
        </div>
    );
}

export default Generator;
