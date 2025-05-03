
import { Student } from '@/types/student';

interface DashboardHeaderProps {
  students: Student[];
}

const DashboardHeader = ({ students }: DashboardHeaderProps) => {
  const highRiskCount = students.filter(s => s.riskLevel === 'High Risk').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'Medium Risk').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'Low Risk').length;
  
  const totalStudents = students.length;
  const highRiskPercentage = totalStudents ? Math.round((highRiskCount / totalStudents) * 100) : 0;
  const mediumRiskPercentage = totalStudents ? Math.round((mediumRiskCount / totalStudents) * 100) : 0;
  const lowRiskPercentage = totalStudents ? Math.round((lowRiskCount / totalStudents) * 100) : 0;

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Student Performance Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Analyzing {totalStudents} students to identify those who may need additional support.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow border-l-4 border-[#e74c3c]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">High Risk Students</p>
              <h2 className="text-2xl font-bold">{highRiskCount}</h2>
            </div>
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-[#e74c3c]/10">
              <span className="text-[#e74c3c] font-bold">{highRiskPercentage}%</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow border-l-4 border-[#f39c12]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Medium Risk Students</p>
              <h2 className="text-2xl font-bold">{mediumRiskCount}</h2>
            </div>
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-[#f39c12]/10">
              <span className="text-[#f39c12] font-bold">{mediumRiskPercentage}%</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow border-l-4 border-[#2ecc71]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Risk Students</p>
              <h2 className="text-2xl font-bold">{lowRiskCount}</h2>
            </div>
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-[#2ecc71]/10">
              <span className="text-[#2ecc71] font-bold">{lowRiskPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
