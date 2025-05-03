
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { validateCSVStructure, parseCSV } from '@/utils/csvParser';
import { Student } from '@/types/student';

interface FileUploadProps {
  onStudentsLoaded: (students: Student[]) => void;
}

const FileUpload = ({ onStudentsLoaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setIsLoading(true);
    try {
      const isValid = await validateCSVStructure(file);
      if (!isValid) {
        return;
      }

      const students = await parseCSV(file);
      toast.success(`Successfully loaded ${students.length} student records`);
      onStudentsLoaded(students);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing file. Please check the format and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Student Data</CardTitle>
        <CardDescription>
          Upload a CSV file containing student data. The file should include columns for id, name, testScores, 
          assignments, and attendance at minimum.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          } transition-all cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">
            {isDragging ? 'Drop the file here' : 'Drag and drop a CSV file here'}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">Or click to browse</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Required fields: id, name, testScores (;-separated), assignments (;-separated), attendance
          </p>

          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </div>

        <div className="mt-4">
          <Button
            onClick={() => document.getElementById('file-upload')?.click()}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Select CSV File'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
