import { formatSemester, getPrefix } from "../utils/helpers";
import { constants } from "./constants";

export const reducer = (state, action) => {
  const { type, payload } = action;
  const { ADD_COURSE, DELETE_COURSE, UPDATE_COURSE, ADD_SEMESTER, ADD_YEAR } =
    constants;
  // console.log(payload.course);
  switch (type) {
    case ADD_COURSE:
      return {
        ...state,
        [payload.year]: {
          ...state[payload.year],
          [payload.sid]: {
            ...state[payload.year][payload.sid],
            courses: [
              ...state[payload.year][payload.sid].courses,
              payload.course,
            ],
          },
        },
      };
    case UPDATE_COURSE:
      console.log(payload.course);
      const updatedCourses = state[payload.year][payload.sid].courses.map(
        (item) => {
          if (item.code === payload.course.code) {
            return payload.course;
          } else {
            return item;
          }
        }
      );
      return {
        ...state,
        [payload.year]: {
          ...state[payload.year],
          [payload.sid]: {
            ...state[payload.year][payload.sid],
            courses: updatedCourses,
          },
        },
      };
    case DELETE_COURSE:
      const filteredCourses = state[payload.year][payload.sid].courses.filter(
        (item) => item.code !== payload.code
      );
      return {
        ...state,
        [payload.year]: {
          ...state[payload.year],
          [payload.sid]: {
            ...state[payload.year][payload.sid],
            courses: filteredCourses,
          },
        },
      };
    case ADD_SEMESTER:
      return {
        ...state,
        [payload.year]: {
          ...state[payload.year],
          [payload.id + getPrefix(payload.id)]: formatSemester(payload.id),
        },
      };
    case ADD_YEAR:
      const totalYears = Object.keys(state).length;
      return {
        ...state,
        [1 + totalYears]: {},
      };

    default:
      return state;
  }
};
