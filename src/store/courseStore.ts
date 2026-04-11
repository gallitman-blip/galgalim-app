import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CourseType = 'moavil' | 'tsiburi';

interface CourseState {
  courseType: CourseType | null;
  setCourseType: (type: CourseType) => void;
  clearCourseType: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      courseType: null,
      setCourseType: (courseType) => set({ courseType }),
      clearCourseType: () => set({ courseType: null }),
    }),
    { name: 'galgalim-course' }
  )
);
