export interface Course {
  name: string;
  grade: string;
  credits: number;
  isWeighted: boolean;
}

export interface GpaCalculation {
  weightedGPA: number;
  unweightedGPA: number;
  totalCredits: number;
}

export interface GpaProjection {
  currentGPA: number;
  targetGPA: number;
  requiredGPA: number;
  remainingCredits: number;
  isAchievable: boolean;
}