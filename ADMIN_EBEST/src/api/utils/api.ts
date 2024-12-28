export const fetchCourseData = async (idCourse: string, idLop: string) => {
  const response = await fetch(`http://localhost:5000/api/unit/${idCourse}/${idLop}`);
  const data = await response.json();
  return data.data;
};
