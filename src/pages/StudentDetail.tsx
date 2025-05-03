
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import StudentProfile from '@/components/StudentProfile';
import { Student } from '@/types/student';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get student data from session storage
    const savedData = sessionStorage.getItem('studentData');
    
    if (savedData) {
      try {
        const students = JSON.parse(savedData) as Student[];
        const foundStudent = students.find(s => s.id === id);
        
        if (foundStudent) {
          setStudent(foundStudent);
        } else {
          console.error('Student not found');
          // Student not found, redirect to dashboard
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error parsing saved student data:', error);
      }
    } else {
      // No data in session storage, redirect to dashboard
      navigate('/', { replace: true });
    }
    
    setIsLoading(false);
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading student profile...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!student) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center card max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2">Student Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested student profile could not be found.</p>
            <Link to="/">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Student Profile</h1>
      </div>
      
      <div className="card">
        <StudentProfile student={student} />
      </div>
    </Layout>
  );
};

export default StudentDetail;
