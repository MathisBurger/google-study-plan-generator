import {Timetable} from "../../typings/LessonTimes";
import React, {useMemo} from "react";
import useCalendar from "../../hooks/useCalendar";
import TimeCalendarType from "react-google-calendar-api";

interface SubmitFormProps {
    timetable: Timetable;
}

const SubmitForm: React.FC<SubmitFormProps> = ({timetable}) => {

    const calendar = useCalendar();

    const calendarName = useMemo<string>(() => {
        return "Timetable - " + new Date().toLocaleDateString("en-US");
    }, []);

    const getNextDateByName = (name: string) => {
        let currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        while (currentDate.toLocaleDateString('en-US', {weekday: 'short'}) !== name) {
            currentDate.setDate(currentDate.getDate() + (24 * 60 * 60 * 1000));
        }
        return currentDate;
    }

    const prepareDateWithTime = (dayKey: string, time: string) => {
        let date =  getNextDateByName(dayKey);
        let t = new Date("01.01.1970 " + time);
        date.setTime(date.getTime() + t.getTime());
        return date.toISOString();
    }

    const getDateTimeString = (dayId: number, time: string) => {
        switch (dayId) {
            case 1:
                return prepareDateWithTime('Mon', time);
            case 2:
                return prepareDateWithTime('Tue', time);
            case 3:
                return prepareDateWithTime('Wed', time);
            case 4:
                return prepareDateWithTime('Thu', time);
            case 5:
                return prepareDateWithTime('Fri', time);
            case 6:
                return prepareDateWithTime('Sat', time);
            case 7:
                return prepareDateWithTime('Sun', time);

        }
    }

    const getGoogleDate = (dayId: number, time: string): TimeCalendarType => {
        const date = getDateTimeString(dayId, time);
        return {timeZone: 'UTC', dateTime: date ?? ''};
    }

    const submit = async () => {
        if (calendar) {
             const newCal = await calendar.createCalendar(calendarName);
             const calId = newCal.result.id;
            for (let i=1; i<=timetable.length; i++) {
                for (const lesson of timetable[i-1].lessons) {
                    const event = await calendar.createEvent({start: getGoogleDate(i, lesson.startTime), end: getGoogleDate(i, lesson.endTime)})
                    const updatedEvent = {summary: lesson.name, recurrence: [
                            'RRULE:FREQ=WEEKLY'
                        ],};
                    const afterUpdate = await calendar.updateEvent(updatedEvent, event.result.id);
                    console.log(afterUpdate);
                }
            }
            // TODO: Create events for all timetable entries
        }
    }

    return (
        <div className="container">
            <h2>
                Your calendar will be named "{calendarName}". Click the submit button to perform the timetable creation in your
                google calendar.
            </h2>
            <button className="btn btn-lg btn-primary" onClick={submit}>Submit</button>
        </div>
    );
}

export default SubmitForm;
