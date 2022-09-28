import {Lesson, Preset} from "./typings/LessonTimes";

const defaultLessons: Lesson[] = [
    {startTime: '07:40', endTime: '08:25'},
    {startTime: '08:30', endTime: '09:15'},
    {startTime: '09:30', endTime: '10:15'},
    {startTime: '10:20', endTime: '11:05'},
    {startTime: '11:20', endTime: '12:05'},
    {startTime: '12:10', endTime: '12:55'},
    {startTime: '13:00', endTime: '13:45'}
]

export const defaultPreset: Preset = {
    name: 'Default',
    preset: [
        {name: 'Monday', lessons: defaultLessons},
        {name: 'Tuesday', lessons: defaultLessons},
        {name: 'Wednesday', lessons: defaultLessons},
        {name: 'Thursday', lessons: defaultLessons},
        {name: 'Friday', lessons: defaultLessons},
    ]
}
