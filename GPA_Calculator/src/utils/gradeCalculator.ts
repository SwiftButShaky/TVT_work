export const calculateRequiredGrade = (
  currentGrade: number,
  remainingWeight: number,
  targetGrade: number
) => {
  // Convert weight to decimal
  const weight = remainingWeight / 100;
  
  // Calculate the required grade
  const completedWeight = 1 - weight;
  const required = (targetGrade - (currentGrade * completedWeight)) / weight;
  
  return {
    required: Math.min(required, 100),
    possible: required <= 100
  };
};