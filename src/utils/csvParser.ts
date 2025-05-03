
import { Student } from '../types/student';
import { toast } from '@/components/ui/sonner';

export const parseCSV = (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        // Validate required headers
        const requiredHeaders = ['id', 'name', 'testScores', 'assignments', 'attendance'];
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
        
        if (missingHeaders.length > 0) {
          toast.error(`CSV is missing required headers: ${missingHeaders.join(', ')}`);
          reject(new Error(`Missing required headers: ${missingHeaders.join(', ')}`));
          return;
        }
        
        const students: Student[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const values = line.split(',').map(val => val.trim());
          const student: any = {};
          
          headers.forEach((header, index) => {
            if (header === 'testScores' || header === 'assignments') {
              // Handle array fields by parsing them as comma-separated values
              student[header] = values[index].split(';').map(Number);
            } else if (['age', 'attendance', 'loginTimes', 'studyHours', 'participation', 'extracurricular'].includes(header)) {
              // Convert numeric fields to numbers
              student[header] = Number(values[index]);
            } else {
              student[header] = values[index];
            }
          });
          
          students.push(student as Student);
        }
        
        resolve(students);
      } catch (error) {
        toast.error('Error parsing CSV file');
        reject(error);
      }
    };
    
    reader.onerror = () => {
      toast.error('Error reading file');
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

export const validateCSVStructure = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split('\n');
        
        if (lines.length < 2) {
          toast.error('CSV file must contain at least a header row and one data row');
          resolve(false);
          return;
        }
        
        const headers = lines[0].split(',').map(header => header.trim());
        
        // Check for required columns
        const requiredHeaders = ['id', 'name', 'testScores', 'assignments', 'attendance'];
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
        
        if (missingHeaders.length > 0) {
          toast.error(`CSV is missing required headers: ${missingHeaders.join(', ')}`);
          resolve(false);
          return;
        }
        
        resolve(true);
      } catch (error) {
        toast.error('Error validating CSV structure');
        reject(error);
      }
    };
    
    reader.onerror = () => {
      toast.error('Error reading file');
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};
