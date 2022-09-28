export type LessonTimes = Day[];

export interface Day {
    name: string;
    lessons: Lesson[];
}

export interface Lesson {
    startTime: string;
    endTime: string;
}

export interface ExtendedLesson extends Lesson {
    name: string;
}

export interface ExtendedDay {
    name: string;
    lessons: ExtendedLesson[];
}

export interface Preset {
    name: string;
    preset: LessonTimes;
}

export type Timetable = ExtendedDay[];
