import React from 'react';
import { Course, GRADE_OPTIONS } from '../utils/gpaCalculator';
import { Trash2, HelpCircle } from 'lucide-react';

interface CourseInputProps {
  course: Course;
  onChange: (updatedCourse: Course) => void;
  onDelete: () => void;
}

export const CourseInput: React.FC<CourseInputProps> = ({ course, onChange, onDelete }) => {
  return (
    <div className="flex gap-4 items-start mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
        <input
          type="text"
          value={course.name}
          onChange={(e) => onChange({ ...course, name: e.target.value })}
          placeholder="e.g., Calculus 101"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="w-24">
        <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
        <select
          value={course.grade}
          onChange={(e) => onChange({ ...course, grade: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select</option>
          {GRADE_OPTIONS.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="w-24">
        <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
        <input
          type="number"
          value={course.credits === 0 ? '' : course.credits}
          onChange={(e) => {
            const value = e.target.value === '' ? 0 : Number(e.target.value);
            onChange({ ...course, credits: value });
          }}
          placeholder="0"
          min="0"
          max="6"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="w-24">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="flex items-center gap-1">
            Weighted
            <HelpCircle size={14} className="text-gray-400" title="Add 1.0 to GPA for honors/AP courses" />
          </span>
        </label>
        <div className="pt-2">
          <input
            type="checkbox"
            checked={course.isWeighted}
            onChange={(e) => onChange({ ...course, isWeighted: e.target.checked })}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
      </div>
      <div className="pt-6">
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Delete course"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};