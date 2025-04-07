import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Course } from './types';
import { calculateGPA } from './utils/gpaCalculator';
import { CourseInput } from './components/CourseInput';
import { GpaDisplay } from './components/GpaDisplay';
import { ProjectionCalculator } from './components/ProjectionCalculator';
import { FinalGradeCalculator } from './components/FinalGradeCalculator';
import { AcademicPlanner } from './components/AcademicPlanner';

function App() {
  const [courses, setCourses] = useState<Course[]>([
    { name: '', grade: '', credits: 3, isWeighted: false },
  ]);

  const handleAddCourse = () => {
    setCourses([...courses, { name: '', grade: '', credits: 3, isWeighted: false }]);
  };

  const handleUpdateCourse = (index: number, updatedCourse: Course) => {
    const newCourses = [...courses];
    newCourses[index] = updatedCourse;
    setCourses(newCourses);
  };

  const handleDeleteCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const gpaCalculation = calculateGPA(courses.filter(course => course.grade && course.credits > 0));

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GraduationCap size={48} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            GPA Calculator & Academic Planning
          </h1>
          <p className="text-gray-600">
            Calculate your GPA, project grades, and plan your academic journey
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
            {courses.map((course, index) => (
              <CourseInput
                key={index}
                course={course}
                onChange={(updatedCourse) => handleUpdateCourse(index, updatedCourse)}
                onDelete={() => handleDeleteCourse(index)}
              />
            ))}
            <button
              onClick={handleAddCourse}
              className="w-full mt-4 py-2 px-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              + Add Course
            </button>
          </div>

          <GpaDisplay gpa={gpaCalculation} />
        </div>

        <ProjectionCalculator
          currentGPA={gpaCalculation.weightedGPA}
          currentCredits={gpaCalculation.totalCredits}
        />

        <FinalGradeCalculator />

        <AcademicPlanner />

        <div className="text-center">
          <button
            onClick={handleExportPDF}
            className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition-colors"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;