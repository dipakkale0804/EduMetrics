
import { Student, RiskLevel } from '../types/student';

// Simple prediction model based on weighted factors
export const predictRisk = (students: Student[]): Student[] => {
  // Calculate class averages for normalization
  const avgTestScores = calculateAverage(students.map(s => calculateAverage(s.testScores || [])));
  const avgAssignments = calculateAverage(students.map(s => calculateAverage(s.assignments || [])));
  const avgAttendance = calculateAverage(students.map(s => s.attendance || 0));
  
  return students.map(student => {
    // Calculate individual scores
    const testScoreAvg = calculateAverage(student.testScores || []);
    const assignmentAvg = calculateAverage(student.assignments || []);
    const attendanceScore = student.attendance || 0;
    
    // Weights for different factors (can be adjusted)
    const weights = {
      testScores: 0.4,
      assignments: 0.3,
      attendance: 0.3,
      studyHours: 0.1,
      participation: 0.1
    };
    
    // Calculate normalized scores (0-1, higher is better)
    const normalizedTestScore = testScoreAvg / 100; // Assuming max score is 100
    const normalizedAssignmentScore = assignmentAvg / 100; // Assuming max score is 100
    const normalizedAttendance = attendanceScore / 100; // Assuming it's a percentage
    
    // Additional factors if available
    const normalizedStudyHours = student.studyHours !== undefined ? 
      Math.min(student.studyHours / 10, 1) : 0.5; // Assuming 10+ hours is excellent
    const normalizedParticipation = student.participation !== undefined ? 
      student.participation / 10 : 0.5; // Assuming scale of 0-10
    
    // Calculate weighted risk score (higher score = lower risk)
    let weightedScore = 
      weights.testScores * normalizedTestScore +
      weights.assignments * normalizedAssignmentScore +
      weights.attendance * normalizedAttendance;
    
    // Add additional factors if available
    if (student.studyHours !== undefined) {
      weightedScore += weights.studyHours * normalizedStudyHours;
    }
    
    if (student.participation !== undefined) {
      weightedScore += weights.participation * normalizedParticipation;
    }
    
    // Normalize final score to 0-100 scale
    const finalScore = Math.round(weightedScore * 100);
    
    // Determine risk level
    let riskLevel: RiskLevel;
    let predictedGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    
    if (finalScore >= 85) {
      riskLevel = 'Low Risk';
      predictedGrade = 'A';
    } else if (finalScore >= 70) {
      riskLevel = 'Low Risk';
      predictedGrade = 'B';
    } else if (finalScore >= 60) {
      riskLevel = 'Medium Risk';
      predictedGrade = 'C';
    } else if (finalScore >= 50) {
      riskLevel = 'Medium Risk';
      predictedGrade = 'D';
    } else {
      riskLevel = 'High Risk';
      predictedGrade = 'F';
    }
    
    // Return student with risk assessment
    return {
      ...student,
      riskScore: finalScore,
      riskLevel,
      predictedGrade
    };
  });
};

// Helper function to calculate average of an array
function calculateAverage(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
