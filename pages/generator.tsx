import {NextPage} from "next";
import useCalendar from "../hooks/useCalendar";
import LoginWithGooglePrompt from "../components/generator/LoginWithGooglePrompt";
import {useState} from "react";
import GoogleLoginAlert from "../components/generator/GoogleLoginAlert";
import SelectLessonTimes from "../components/generator/SelectLessonTimes";
import {LessonTimes, Timetable} from "../typings/LessonTimes";
import EnterTimetableForm from "../components/generator/EnterTimetableForm";

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
    const [lessonTimes, setLessonTimes] = useState<LessonTimes>([]);
    const [timetable, setTimetable] = useState<Timetable>([]);

    return (
        <div className="home-container">
            {step === Step.Login && (
                <LoginWithGooglePrompt nextStep={() => setStep(Step.SelectLessonTimes)} />
            )}
            {step !== Step.Login && (
                <GoogleLoginAlert />
            )}
            {step === Step.SelectLessonTimes && (
                <SelectLessonTimes nextStep={() => setStep(Step.EnterTimetable)} setLessonTimes={(times) => setLessonTimes(times)} />
            )}
            {step === Step.EnterTimetable && (
                <EnterTimetableForm
                    lessonTimes={lessonTimes}
                    nextStep={() => setStep(Step.CreateNewCalendar)}
                    setTimetableParent={(table) => setTimetable(table)}
                />
            )}
        </div>
    );
}

export default Generator;
