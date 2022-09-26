import React, {useState} from "react";
import {LessonTimes} from "../../typings/LessonTimes";

interface SelectLessonTimesProps {
    nextStep: () => void;
    setLessonTimes: (times: LessonTimes) => void;
}

const SelectLessonTimes: React.FC<SelectLessonTimesProps> = ({nextStep, setLessonTimes}) => {

    const [days, setDays] = useState<string[]>(['Monday']);

    const changeDay = (newValue: string, index: number) => {
        let arr = [...days];
        arr[index] = newValue;
        setDays(arr);
    }


    return (
      <div className="container">
          <h3>Days</h3>
          <table className="table">
              <thead>
                <tr>
                    {days.map((day, index) => (
                        <th scope="col">
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
      </div>
    );
}

export default SelectLessonTimes;
