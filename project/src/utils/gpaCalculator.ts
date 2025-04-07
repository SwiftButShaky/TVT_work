const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

export const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

export const calculateGPA = (courses: Course[]): GpaCalculation => {
  if (courses.length === 0) {
    return { weightedGPA: 0, unweightedGPA: 0, totalCredits: 0 };
  }

  let weightedPoints = 0;
  let unweightedPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const gradePoint = GRADE_POINTS[course.grade] || 0;
    const weightedGradePoint = course.isWeighted ? gradePoint + 1.0 : gradePoint;
    
    weightedPoints += weightedGradePoint * course.credits;
    unweightedPoints += gradePoint * course.credits;
    totalCredits += course.credits;
  });

  return {
    weightedGPA: Number((weightedPoints / totalCredits).toFixed(2)),
    unweightedGPA: Number((unweightedPoints / totalCredits).toFixed(2)),
    totalCredits
  };
};

export const calculateProjection = (
  currentGPA: number,
  targetGPA: number,
  currentCredits: number,
  remainingCredits: number
): GpaProjection => {
  const totalCredits = currentCredits + remainingCredits;
  const requiredPoints = targetGPA * totalCredits;
  const currentPoints = currentGPA * currentCredits;
  const requiredGPA = (requiredPoints - currentPoints) / remainingCredits;

  return {
    currentGPA,
    targetGPA,
    requiredGPA: Number(requiredGPA.toFixed(2)),
    remainingCredits,
    isAchievable: requiredGPA <= 4.0
  };
};