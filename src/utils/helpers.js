export const calculateGPA = (courses, grades) => {
  // total scores
  const totalScores = courses.reduce((a, b) => {
    const grade = grades[b.grade];
    const score = grade * b.unit;
    return a + score;
  }, 0);

  // total units
  const totalUnits = courses.reduce((a, b) => {
    return a + b.unit;
  }, 0);

  // (grades*units)/grades
  const gpa = totalScores / totalUnits;
  return gpa.toFixed(2);
};
export const grades = {
  A: 4,
  "A-": 3.75,
  "B+": 3.25,
  B: 3,
  "B-": 2.75,
  "C+": 2.25,
  C: 2,
  "C-": 1.75,
  D: 1,
  F: 0,
};
export function formatSemester(sid) {
  return {
    sid: sid + getPrefix(sid),
    courses: [],
  };
}

export function getPrefix(id) {
  return (
    {
      1: "st",
      2: "nd",
      3: "rd",
    }[id] || "th"
  );
}
export function getAnnualGPA(yearRecord) {
  const allCourses = [];
  Object.values(yearRecord).map((semester) => {
    return semester.courses.map((course) => {
      allCourses.push(course);
      return null;
    });
  });

  return calculateGPA(allCourses, grades);
}

export function getCummulativeGPA(records) {
  const allCourses = [];
  Object.values(records).map((year) => {
    return Object.values(year).map((semester) => {
      return semester.courses.map((course) => {
        allCourses.push(course);
        return null;
      });
    });
  });

  return calculateGPA(allCourses, grades);
}
