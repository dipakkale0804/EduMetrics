
export interface Student {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  testScores: number[];
  assignments: number[];
  attendance: number;
  loginTimes?: number;
  studyHours?: number;
  participation?: number;
  extracurricular?: number;
  riskScore?: number;
  riskLevel?: 'High Risk' | 'Medium Risk' | 'Low Risk';
  predictedGrade?: 'A' | 'B' | 'C' | 'D' | 'F';
}

export type RiskLevel = 'High Risk' | 'Medium Risk' | 'Low Risk';
