import {Timetable} from "../../typings/LessonTimes";
import React, {useMemo, useState} from "react";
import useCalendar from "../../hooks/useCalendar";
import TimeCalendarType from "react-google-calendar-api";

interface SubmitFormProps {
    timetable: Timetable;
}

const SubmitForm: React.FC<SubmitFormProps> = ({timetable}) => {

    const calendar = useCalendar();
    const [loading, setLoading] = useState<boolean>(false);

    const calendarName = useMemo<string>(() => {
        return "Timetable - " + new Date().toLocaleDateString("en-US");
    }, []);

    const getNextDateByName = (name: string) => {
        let currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        console.log(currentDate.toLocaleDateString('en-US', {weekday: 'short'}));
        while (currentDate.toLocaleDateString('en-US', {weekday: 'short'}) !== name) {
            currentDate.setTime(currentDate.getTime() + (24 * 60 * 60 * 1000));
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
        return {timeZone: 'UTC', dateTime: date ?? ''} as any;
    }

    const submit = async () => {
        if (calendar) {
            setLoading(true);
             const newCal = await calendar.createCalendar(calendarName);
             console.log(newCal);
             const calId = newCal.result.id;
            for (let i=1; i<=timetable.length; i++) {
                for (const lesson of timetable[i-1].lessons) {
                    console.log(getGoogleDate(i, lesson.startTime));
                    await calendar.createEvent({
                        start: getGoogleDate(i, lesson.startTime) as any,
                        end: getGoogleDate(i, lesson.endTime) as any,
                        summary: lesson.name,
                        recurrence: ['RRULE:FREQ=WEEKLY']
                        } as any, calId);
                }
            }
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <h2>
                Your calendar will be named "{calendarName}". Click the submit button to perform the timetable creation in your
                google calendar.
            </h2>
            {loading && (
                <div className="alert alert-primary">
                    The calendar is being created at the moment
                </div>
            )}
            <button className="btn btn-lg btn-primary" disabled={loading} onClick={submit}>Submit</button>
        </div>
    );
}

export default SubmitForm;
