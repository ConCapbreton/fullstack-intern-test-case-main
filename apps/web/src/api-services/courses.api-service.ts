import { Course } from "../models/course.model";

export async function fetchCourses() {
  const res = await fetch('http://localhost:3000/api/courses');
  return res.json() as Promise<Course[]>;
};

export async function fetchCourse(courseCode: String) {
  const res = await fetch(`http://localhost:3000/api/courses/${courseCode}`);
  return res.json() as Promise<Course>;
};


