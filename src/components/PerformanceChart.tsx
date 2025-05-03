
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Student } from '@/types/student';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceChartProps {
  students: Student[];
}

const PerformanceChart = ({ students }: PerformanceChartProps) => {
  // Calculate grade distribution
  const gradeDistribution = {
    A: students.filter(s => s.predictedGrade === 'A').length,
    B: students.filter(s => s.predictedGrade === 'B').length,
    C: students.filter(s => s.predictedGrade === 'C').length,
    D: students.filter(s => s.predictedGrade === 'D').length,
    F: students.filter(s => s.predictedGrade === 'F').length,
  };

  const gradeData = [
    { name: 'A', count: gradeDistribution.A, color: '#2ecc71' },
    { name: 'B', count: gradeDistribution.B, color: '#27ae60' },
    { name: 'C', count: gradeDistribution.C, color: '#f39c12' },
    { name: 'D', count: gradeDistribution.D, color: '#e67e22' },
    { name: 'F', count: gradeDistribution.F, color: '#e74c3c' },
  ];

  // Calculate average scores
  const calculateClassAverage = (metric: keyof Student) => {
    return students.reduce((total, student) => {
      // Handle array values
      if (Array.isArray(student[metric])) {
        const arr = student[metric] as number[];
        return total + (arr.reduce((sum, val) => sum + val, 0) / arr.length);
      }
      // Handle numeric values
      return total + (student[metric] as number || 0);
    }, 0) / students.length;
  };

  const avgTestScore = calculateClassAverage('testScores');
  const avgAssignmentScore = calculateClassAverage('assignments');
  const avgAttendance = calculateClassAverage('attendance');

  const performanceData = [
    { name: 'Test Scores', average: Math.round(avgTestScore) },
    { name: 'Assignments', average: Math.round(avgAssignmentScore) },
    { name: 'Attendance', average: Math.round(avgAttendance) },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="hover-card animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-primary">Grade Distribution</CardTitle>
          <CardDescription>
            Predicted grade distribution across all students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gradeData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Legend />
                <Bar dataKey="count" name="Students">
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-card animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-primary">Class Performance</CardTitle>
          <CardDescription>
            Average scores across different metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Legend />
                <Bar dataKey="average" name="Class Average %">
                  {performanceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#3498db' : index === 1 ? '#9b59b6' : '#2ecc71'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceChart;
