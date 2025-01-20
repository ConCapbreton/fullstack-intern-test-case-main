import { Course, Question } from "../models/course.model";

export async function fetchCourses() {
  const res = await fetch('http://localhost:3000/api/courses');
  return res.json() as Promise<Course[]>;
};

export async function fetchCourse(courseCode: String) {
  const res = await fetch(`http://localhost:3000/api/courses/${courseCode}`);
  return res.json() as Promise<Course>;
};

export async function fetchQuestions(courseId: String) {
  const res = await fetch(`http://localhost:3000/api/courses/${courseId}/questions`);
  return res.json() as Promise<Question[]>;
}

export async function updateQuestion(questionId: String, newQuestionValue: String) {
  const res = await fetch(`http://localhost:3000/api/courses/:courseId/questions/${questionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newQuestionValue}),
  })
  return res.json() as Promise<Question[]>;
}



