import React, {useState} from "react";
import {Lesson, LessonTimes} from "../../typings/LessonTimes";
import SavePresetModal from "../presets/SavePresetModal";
import LoadPresetModal from "../presets/LoadPresetModal";

interface SelectLessonTimesProps {
    /**
     * Goes to the next step
     */
    nextStep: () => void;
    /**
     * Sets the lesson times
     *
     * @param times The lesson times
     */
    setLessonTimes: (times: LessonTimes) => void;
}

/**
 * Default lesson
 */
const defaultLesson: Lesson = {
    startTime: "00:00",
    endTime: "00:00"
};

/**
 * Component that is used to select the lesson times
 *
 * @constructor
 */
const SelectLessonTimes: React.FC<SelectLessonTimesProps> = ({nextStep, setLessonTimes}) => {

    const [days, setDays] = useState<string[]>(['Monday']);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [savePresetOpen, setSavePresetOpen] = useState<boolean>(false);
    const [loadPresetOpen, setLoadPresetOpen] = useState<boolean>(false);
    const [preset, setPreset] = useState<LessonTimes>([]);

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

    const saveAsPreset = () => {
        const lessonTimes: LessonTimes = [];
        for (const day of days) {
            lessonTimes.push({
                name: day,
                lessons: lessons
            });
        }
        setPreset(lessonTimes);
        setSavePresetOpen(true);
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

    const loadPreset = (p: LessonTimes) => {
        const days = p.map((d) => d.name);
        let lessons: Lesson[] = [];
        if (days.length > 0) {
            lessons = p[0].lessons;
        }
        setDays(days);
        setLessons(lessons);
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

          <div className="row mt-3">
              <div className="col-md-3">
                  <button className="btn btn-lg btn-primary" onClick={goToNextStep}>
                      Next step
                  </button>
              </div>
              <div className="col-md-4">
                  <button className="btn btn-outline-primary btn-lg" onClick={saveAsPreset}>
                      Save as preset
                  </button>
              </div>
              <div className="col-md-3">
                  <button className="btn btn-outline-primary btn-lg" onClick={() => setLoadPresetOpen(true)}>
                      Load preset
                  </button>
              </div>
          </div>
          {savePresetOpen && (
              <SavePresetModal preset={preset} onClose={() => setSavePresetOpen(false)} />
          )}
          {loadPresetOpen && (
              <LoadPresetModal loadPreset={loadPreset} onClose={() => setLoadPresetOpen(false)} />
          )}
      </div>
    );
}

export default SelectLessonTimes;
