import { useState, useEffect } from 'react';

interface CourseData {
  data: any[];
}

const useCourseData = (idCourse: string, idLop: string) => {
  const [program, setProgram] = useState<any[]>([]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/unit/${idCourse}/${idLop}`);
      const data: CourseData = await response.json();
      setProgram(data.data);
      console.log('Dữ liệu khóa học ở api.ts:', data.data);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [idCourse, idLop]);

  return { program, fetchCourse };
};

export default useCourseData;
