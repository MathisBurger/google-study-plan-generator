import React, {useEffect, useState} from "react";
import {LessonTimes, Timetable} from "../../typings/LessonTimes";

interface EnterTimetableFormProps {
    lessonTimes: LessonTimes;
    setTimetableParent: (timetable: Timetable) => void;
    nextStep: () => void;
}

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
                    <div className="col-md-2">
                        <div className="col">
                            <div className="row-md-2">
                                <b>{day.name}</b>
                            </div>
                            {day.lessons.map((lesson, lessonId) => (
                                <div className="row-md-2 mt-2">
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
