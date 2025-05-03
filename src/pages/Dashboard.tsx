
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import DashboardHeader from '@/components/DashboardHeader';
import StudentTable from '@/components/StudentTable';
import PerformanceChart from '@/components/PerformanceChart';
import { Student } from '@/types/student';
import { predictRisk } from '@/utils/predictionModel';

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  const handleStudentsLoaded = (loadedStudents: Student[]) => {
    const studentsWithRisk = predictRisk(loadedStudents);
    setStudents(studentsWithRisk);
    setIsDataLoaded(true);
    
    // Save to session storage for persistence
    sessionStorage.setItem('studentData', JSON.stringify(studentsWithRisk));
  };

  useEffect(() => {
    // Check if we have data in session storage
    const savedData = sessionStorage.getItem('studentData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setStudents(parsedData);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error parsing saved student data:', error);
      }
    }
  }, []);

  return (
    <Layout>
      {!isDataLoaded ? (
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Academic Risk Compass
            </h1>
            <p className="text-muted-foreground mb-8">
              Upload student data to identify those who may need academic intervention.
            </p>
          </div>
          
          <div className="card">
            <FileUpload onStudentsLoaded={handleStudentsLoaded} />
          </div>
          
          <div className="mt-8 card bg-muted/30">
            <h2 className="font-semibold mb-2">CSV Format Guidelines</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Your CSV file should include the following columns:
            </p>
            <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
              <li><strong>Required:</strong> id, name, testScores, assignments, attendance</li>
              <li><strong>Optional:</strong> age, gender, loginTimes, studyHours, participation, extracurricular</li>
              <li>Use semicolons (;) to separate multiple values in testScores and assignments columns</li>
              <li>For example: <code className="px-1 py-0.5 bg-muted rounded text-xs">1,John Doe,85;90;78,92;88;90,95,19,Male,8,7</code></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <DashboardHeader students={students} />
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
            <PerformanceChart students={students} />
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Student List</h2>
            <StudentTable students={students} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
