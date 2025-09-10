import { FiBookOpen } from "react-icons/fi";
import { Button } from "../ui/button";
import {  useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { authApi } from "../../lib/api/auth";

export function UnsubscribedCoursesGrid({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!courses || courses.length === 0) return null;

  const handleExploreClick = (course, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCourseSelect = async (courseId) => {
    try {
      const response = await authApi.selectedCourse({ course_id: courseId });
      console.log(response,"check this response");
      setIsModalOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Course selection failed:", err);
      setError("Failed to select course. Please try again.");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Array of light background colors
  const bgColors = [
    'bg-blue-100', 'bg-purple-100', 'bg-indigo-100',
    'bg-teal-100', 'bg-emerald-100', 'bg-rose-100',
    'bg-amber-100', 'bg-pink-100', 'bg-fuchsia-100',
    'bg-sky-100', 'bg-cyan-100', 'bg-lime-100'
  ];

  // Array of slightly darker hover colors
  const hoverColors = [
    'hover:bg-blue-100', 'hover:bg-purple-100', 'hover:bg-indigo-100',
    'hover:bg-teal-100', 'hover:bg-emerald-100', 'hover:bg-rose-100',
    'hover:bg-amber-100', 'hover:bg-pink-100', 'hover:bg-fuchsia-100',
    'hover:bg-sky-100', 'hover:bg-cyan-100', 'hover:bg-lime-100'
  ];

  // Assign random colors to each course
  const coursesWithColors = useMemo(() => {
    return courses.map(course => {
      const randomIndex = Math.floor(Math.random() * bgColors.length);
      return {
        ...course,
        bgColor: bgColors[randomIndex],
        hoverColor: hoverColors[randomIndex]
      };
    });
  }, [courses]);

  return (
    <div className="space-y-8">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {coursesWithColors.map((course) => (
          <motion.div
            key={course.course_id}
            variants={item}
            className={`group relative overflow-hidden border border-gray-200 rounded-xl ${course.bgColor} ${course.hoverColor} text-gray-800 shadow-sm hover:shadow-md transition-all duration-300`}
            whileHover={{ y: -5 }}
          >
            <div className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg transition-colors shadow-sm">
                    <FiBookOpen className="text-primary text-lg group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                    {course.course_name}
                  </h3>
                </div>
                
                <p className="text-xs text-gray-600 line-clamp-2">
                  {course.description || 'No description available'}
                </p>
                
                <div className="w-full mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-1/2 cursor-pointer text-primary flex justify-between bg-white hover:bg-primary/10 transition-colors"
                    onClick={(e) => handleExploreClick(course, e)}
                  >
                    Explore
                    <HiArrowTopRightOnSquare className="text-xl font-medium"/>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Course Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.course_name}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              {selectedCourse?.description || 'No description available'}
            </p>
            
            <h4 className="font-medium mb-2">Subjects in this course:</h4>
            <ul className="list-disc list-inside space-y-1 mb-4">
              {/* Replace with actual subjects data if available */}
              <li>Introduction to {selectedCourse?.course_name}</li>
              <li>Core Concepts</li>
              <li>Advanced Topics</li>
              <li>Practical Applications</li>
            </ul>
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            <Button 
              onClick={() => handleCourseSelect(selectedCourse?.course_id)}
              className="w-full"
            >
              Select This Course
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}