export type LessonTimes = Day[];

export interface Day {
    name: string;
    lessons: Lesson[];
}

export interface Lesson {
    startTime: string;
    endTime: string;
}
