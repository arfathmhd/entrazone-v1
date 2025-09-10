import { FiFileText } from "react-icons/fi";
import { PiExam } from "react-icons/pi";
import React from 'react';
import { GiNotebook } from "react-icons/gi";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function SubjectCard({ subject }) {
  const navigate = useNavigate();

  const handleExploreClick = (id) => {
    navigate(`/chapters/${id}`);
  }

  return (
    <div className="h-full">
      <div className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-md transition-shadow h-full flex flex-col">
        <div
          className={`${subject.iconBg} rounded-2xl w-20 h-20 flex items-center justify-center mb-4 overflow-hidden`}
        >
          <GiNotebook className="w-9 h-9 text-white" />
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">
          {subject.subjectname}
        </h2>
        
        {subject.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {subject.description}
          </p>
        )}

        <div className="space-x-2 mb-6 flex justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FiFileText className="w-4 h-4" />
            <span>{subject.chapter_count} Chapter{subject.chapter_count !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <PiExam className="w-4 h-4" />
            <span>{subject.examcount} Exam{subject.examcount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="mt-auto">
          {subject.isFree && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
              Free Access
            </span>
          )}
          <Button
            onClick={() => handleExploreClick(subject.id)} 
            className="w-full cursor-pointer bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white font-semibold py-3 rounded-sm transition-all duration-200 hover:opacity-90"
          >
            EXPLORE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;