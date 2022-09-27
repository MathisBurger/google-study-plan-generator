import React, {useState} from "react";
import {Lesson, LessonTimes} from "../../typings/LessonTimes";

interface SelectLessonTimesProps {
    nextStep: () => void;
    setLessonTimes: (times: LessonTimes) => void;
}

const defaultLesson: Lesson = {
    startTime: "00:00",
    endTime: "00:00"
};

const SelectLessonTimes: React.FC<SelectLessonTimesProps> = ({nextStep, setLessonTimes}) => {

    const [days, setDays] = useState<string[]>(['Monday']);
    const [lessons, setLessons] = useState<Lesson[]>([]);

    const changeDay = (newValue: string, index: number) => {
        let arr = [...days];
        arr[index] = newValue;
        setDays(arr);
    }

    const changeLesson = (lesson: Lesson, index: number) => {
        let arr = [...lessons];
        arr[index] = lesson;
        setLessons(arr);
    }

    const goToNextStep = () => {
        const lessonTimes: LessonTimes = [];
        for (const day of days) {
            lessonTimes.push({
                name: day,
                lessons: lessons
            });
        }
        setLessonTimes(lessonTimes);
        nextStep();
    }


    return (
      <div className="container">
          <h3>Days</h3>
          <table className="table">
              <thead>
                <tr>
                    {days.map((day, index) => (
                        <th scope="col" key={day + index}>
                            <input className="form-control" value={day} onChange={(e) => changeDay(e.target.value, index)} />
                        </th>
                    ))}
                    {days.length < 7 && (
                        <th>
                            <button className="btn btn-sm btn-primary" onClick={() => setDays([...days, ''])}>
                                Add
                            </button>
                        </th>
                    )}
                </tr>
              </thead>
          </table>
          <h3>Lessons</h3>
          <div className="row">
              {lessons.map((lesson, index) => (
                  <div className="col-md-4" key={lesson.startTime + index}>
                      <div className="col">
                          <div className="row-md-6">
                              <b>Lesson {index+1}</b>
                          </div>
                          <div className="row-md-6 mt-1">
                              <div className="row">
                                  <div className="col col-md-6">
                                      <input
                                          type="time"
                                          value={lesson.startTime}
                                          onChange={(e) =>
                                              changeLesson({...lesson, startTime: e.target.value}, index)}
                                      />
                                  </div>
                                  <div className="col col-md-6">
                                      <input
                                          type="time"
                                          value={lesson.endTime}
                                          onChange={(e) =>
                                              changeLesson({...lesson, endTime: e.target.value}, index)}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              ))}
              <div className="col-md-4">
                  <div className="col">
                      <div className="row-md-6">
                          <b>New</b>
                      </div>
                      <div className="row-md-6 mt-1">
                          <button className="btn btn-sm btn-primary" onClick={() => setLessons([...lessons, defaultLesson])}>
                              Add
                          </button>
                      </div>
                  </div>

              </div>
            </div>

          <button className="btn btn-lg btn-primary mt-3" onClick={goToNextStep}>
              Next step
          </button>
      </div>
    );
}

export default SelectLessonTimes;
