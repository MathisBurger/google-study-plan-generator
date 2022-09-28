import {NextPage} from "next";
import LoginWithGooglePrompt from "../components/generator/LoginWithGooglePrompt";
import {useState} from "react";
import GoogleLoginAlert from "../components/generator/GoogleLoginAlert";
import SelectLessonTimes from "../components/generator/SelectLessonTimes";
import {LessonTimes, Timetable} from "../typings/LessonTimes";
import EnterTimetableForm from "../components/generator/EnterTimetableForm";
import SubmitForm from "../components/generator/SubmitForm";

/**
 * All steps of the stepper process
 */
enum Step {
    Login,
    SelectLessonTimes,
    EnterTimetable,
    Submit
}

/**
 * The general purpose generator page.
 *
 * @constructor
 */
const Generator: NextPage = () => {

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
                    nextStep={() => setStep(Step.Submit)}
                    setTimetableParent={(table) => setTimetable(table)}
                />
            )}
            {step === Step.Submit && (
                <SubmitForm timetable={timetable} />
            )}
        </div>
    );
}

export default Generator;
