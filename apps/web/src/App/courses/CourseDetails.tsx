import {  ReactElement, useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import { Course } from "../../models/course.model";
import { Button, Card, Table } from 'antd';
import { fetchCourse } from "../../api-services/courses.api-service";
import { Question } from "../../models/course.model";

const columns = [
  {
    title: 'Questions',
    dataIndex: 'question',
    key: 'question',
  },
]

type DataSource = {
  key: string;
  question: string;
}

function transformCourseToDataSource(questionsArray: Question[]) {
  let dataSourceArray: DataSource[] = [] 
  let count = 1
  questionsArray.forEach(question => {
    question.title = `${count}. ${question.title}`
    dataSourceArray.push({
      key: question._id,
      question: question.title
    })
    count++
  })
  return dataSourceArray
}

export const CourseDetails = () => {
  const {courseCode} = useParams() as {courseCode: string};
  const [course, setCourse] = useState<Course>()
  const [dataSource, setDataSource] = useState<DataSource[]>()

  useEffect(() => {
    async function getCourse() {
      const coursesPayload = await fetchCourse(courseCode);
      setCourse(coursesPayload);
    }
    getCourse();
  }, []);

  useEffect(() => {
      if (course) {
        const courseQuestions: Question[] = course.questions
        setDataSource(transformCourseToDataSource(courseQuestions))
      }
    }, [course]);

  return (
    <Card 
      title={
        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
          <Link to="/courses"><Button>Back to Courses</Button></Link>
          <h1>{course?.title}</h1>
        </div>
      }
    >
      <Table 
        dataSource={dataSource}
        columns={columns}
      />
    </Card>
  );
};
