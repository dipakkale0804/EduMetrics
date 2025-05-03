
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/types/student';
import { ChevronRight, Search } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
}

const StudentTable = ({ students }: StudentTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<keyof Student>('riskScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof Student) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const filteredStudents = students
    .filter(student =>
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (riskFilter === 'all' || student.riskLevel === riskFilter)
    )
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      // Handle sorting for array values
      if (Array.isArray(aVal)) aVal = aVal.reduce((sum, val) => sum + val, 0) / aVal.length;
      if (Array.isArray(bVal)) bVal = bVal.reduce((sum, val) => sum + val, 0) / bVal.length;
      
      // Handle undefined values
      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;
      
      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : 1;
      } else {
        return aVal > bVal ? -1 : 1;
      }
    });

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all" onValueChange={(value) => setRiskFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="High Risk">High Risk</SelectItem>
              <SelectItem value="Medium Risk">Medium Risk</SelectItem>
              <SelectItem value="Low Risk">Low Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]" onClick={() => handleSort('id')}>
                ID {sortBy === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead onClick={() => handleSort('name')}>
                Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-center" onClick={() => handleSort('attendance')}>
                Attendance {sortBy === 'attendance' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-center" onClick={() => handleSort('riskScore')}>
                Performance {sortBy === 'riskScore' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-center">Risk Level</TableHead>
              <TableHead className="text-center" onClick={() => handleSort('predictedGrade')}>
                Predicted Grade {sortBy === 'predictedGrade' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="text-center">{student.attendance}%</TableCell>
                  <TableCell className="text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          student.riskScore && student.riskScore >= 70 ? 'bg-[#2ecc71]' : 
                          student.riskScore && student.riskScore >= 50 ? 'bg-[#f39c12]' : 
                          'bg-[#e74c3c]'
                        }`}
                        style={{width: `${student.riskScore || 0}%`}}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeClass(student.riskLevel)}`}>
                      {student.riskLevel || 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {student.predictedGrade}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/student/${student.id}`}>
                      <Button variant="outline" size="sm">
                        View <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No students match your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentTable;
