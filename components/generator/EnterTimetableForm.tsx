import React, {useEffect, useState} from "react";
import {LessonTimes, Timetable} from "../../typings/LessonTimes";

interface EnterTimetableFormProps {
    /**
     * The initial lesson times
     */
    lessonTimes: LessonTimes;
    /**
     *  Sets the timetable
     *
     * @param timetable The timetable
     */
    setTimetableParent: (timetable: Timetable) => void;
    /**
     * Goes to the next step
     */
    nextStep: () => void;
}

/**
 * Component that is used to enter the timetable
 * based on the lesson times that are given.
 */
const EnterTimetableForm: React.FC<EnterTimetableFormProps> = ({lessonTimes, setTimetableParent, nextStep}) => {

    const [timetable, setTimetable] = useState<Timetable>([]);

    const goToNext = () => {
        setTimetableParent(timetable);
        nextStep();
    }

    useEffect(() => {
        let timetable = [];
        for (const day of lessonTimes) {
            let lessons = [];
            for (const lesson of day.lessons) {
                lessons.push({...lesson, name: ''});
            }
            timetable.push({name: day.name, lessons: lessons});
        }
        setTimetable(timetable);
    }, [lessonTimes]);

    const changeLessonName = (newName: string, day: number, lesson: number) => {
        let specificDay = timetable[day];
        let specificLesson = specificDay.lessons[lesson];
        let lessons = [...specificDay.lessons];
        specificLesson.name = newName;
        lessons[lesson] = specificLesson;
        specificDay.lessons = lessons;
        let newTimetable = [...timetable];
        newTimetable[day] = specificDay;
        setTimetable(newTimetable);
    }

    return (
        <div className="container">
            <div className="row">
                {timetable.map((day, dayId) => (
                    <div className="col-md-2" key={day.name + dayId}>
                        <div className="col">
                            <div className="row-md-2">
                                <b>{day.name}</b>
                            </div>
                            {day.lessons.map((lesson, lessonId) => (
                                <div className="row-md-2 mt-2" key={dayId + lesson.startTime + lessonId}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lesson.name}
                                        onChange={(e) => changeLessonName(e.target.value, dayId, lessonId)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-lg btn-primary mt-5" onClick={goToNext}>
                Next Step
            </button>
        </div>
    );
}

export default EnterTimetableForm;
