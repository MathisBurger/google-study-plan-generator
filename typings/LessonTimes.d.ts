export type LessonTimes = Day[];

export interface Day {
    /**
     * Name of the day
     */
    name: string;
    /**
     * The lessons of the day
     */
    lessons: Lesson[];
}

export interface Lesson {
    /**
     * The start time of the lesson
     */
    startTime: string;
    /**
     * The end time of the lesson
     */
    endTime: string;
}

export interface ExtendedLesson extends Lesson {
    /**
     * The name of the lesson
     */
    name: string;
}

export interface ExtendedDay {
    /**
     * The name of the day
     */
    name: string;
    /**
     * The lessons of the day
     */
    lessons: ExtendedLesson[];
}

export interface Preset {
    /**
     * The name of the preset
     */
    name: string;
    /**
     * The preset
     */
    preset: LessonTimes;
}

export type Timetable = ExtendedDay[];
