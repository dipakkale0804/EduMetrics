
import { Student } from '@/types/student';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StudentProfileProps {
  student: Student;
}

const StudentProfile = ({ student }: StudentProfileProps) => {
  const getRiskBadgeClass = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'High Risk':
        return 'risk-high';
      case 'Medium Risk':
        return 'risk-medium';
      case 'Low Risk':
        return 'risk-low';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Prepare chart data from test scores
  const testScoreData = student.testScores.map((score, index) => ({
    name: `Test ${index + 1}`,
    score
  }));
  
  // Prepare chart data from assignment scores
  const assignmentData = student.assignments.map((score, index) => ({
    name: `Assignment ${index + 1}`,
    score
  }));
  
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-primary">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{student.name}</CardTitle>
              <CardDescription>Student ID: {student.id}</CardDescription>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeClass(student.riskLevel)}`}>
              {student.riskLevel}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Attendance</h3>
              <div className="flex items-center justify-between">
                <Progress value={student.attendance} className="h-2" />
                <span className="text-sm font-medium ml-2">{student.attendance}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Performance Score</h3>
              <div className="flex items-center justify-between">
                <Progress value={student.riskScore} className={`h-2 ${
                  student.riskScore && student.riskScore >= 70 ? 'bg-[#2ecc71]' : 
                  student.riskScore && student.riskScore >= 50 ? 'bg-[#f39c12]' : 
                  'bg-[#e74c3c]'
                }`} />
                <span className="text-sm font-medium ml-2">{student.riskScore}/100</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Predicted Grade</h3>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  student.predictedGrade === 'A' || student.predictedGrade === 'B' ? 'bg-[#2ecc71]/10 text-[#2ecc71]' :
                  student.predictedGrade === 'C' ? 'bg-[#f39c12]/10 text-[#f39c12]' :
                  'bg-[#e74c3c]/10 text-[#e74c3c]'
                }`}>
                  Grade {student.predictedGrade}
                </span>
              </div>
            </div>
          </div>
          
          {/* Additional Student Details */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {student.age && (
              <div>
                <h3 className="text-sm font-medium mb-1">Age</h3>
                <p className="text-sm">{student.age} years</p>
              </div>
            )}
            
            {student.gender && (
              <div>
                <h3 className="text-sm font-medium mb-1">Gender</h3>
                <p className="text-sm">{student.gender}</p>
              </div>
            )}
            
            {student.studyHours !== undefined && (
              <div>
                <h3 className="text-sm font-medium mb-1">Study Hours</h3>
                <p className="text-sm">{student.studyHours} hours/week</p>
              </div>
            )}
            
            {student.participation !== undefined && (
              <div>
                <h3 className="text-sm font-medium mb-1">Participation</h3>
                <p className="text-sm">{student.participation}/10</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Scores</CardTitle>
            <CardDescription>Performance on all tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={testScoreData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#1a3a6e" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Assignment Scores</CardTitle>
            <CardDescription>Performance on all assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={assignmentData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#4a9fd8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
