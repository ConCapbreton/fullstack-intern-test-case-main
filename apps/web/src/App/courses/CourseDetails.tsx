import { useEffect, useState } from "react"; 
import { Link, useParams } from "react-router-dom";
import { Course, Question } from "../../models/course.model";
import { Button, Card, Table, Modal, Space } from 'antd';
import { fetchCourse, fetchQuestions, updateQuestion, duplicateQuestion } from "../../api-services/courses.api-service";

type DataSource = {
  key: string;
  question: string;
  questionNumber: string;
}

function transformCourseToDataSource(questionsArray: Question[]) {
  let dataSourceArray: DataSource[] = [] 
  let count = 1
  questionsArray.forEach(question => {
    dataSourceArray.push({
      key: question._id,
      question: question.title,
      questionNumber: `${count}. `
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
    async function getQuestions (courseId: String) {
      const questionPayload = await fetchQuestions(courseId)
      setDataSource(transformCourseToDataSource(questionPayload))
    }
    if (course) {
      getQuestions(course._id)
    }
  }, [course]);

  //MODAL CODE WITH EDIT AND DUPLICATE FUNCTIONS
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [questionId, setQuestionId] = useState<String>()
  
  const columns = [
    {
      title: '',
      dataIndex: 'questionNumber',
      key: 'questionNumber',
      width: '60px', //width is fine up to 999 questions
    },
    {
      title: 'Questions',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Action',
      key: 'action',
      render: (question: DataSource) => (
        <Space size="middle">
          <Button onClick={() => handleEditClick(question)}>Edit question</Button>
          <Button onClick={() => handleDuplicateClick(question)}>Duplicate question</Button>
        </Space>
      ),
    },
  ];

  async function handleDuplicateClick (question: DataSource) {
    if (course) {
      await duplicateQuestion(course._id, question.key)
      window.location.reload()
    }
  };

  const handleEditClick = (question: DataSource) => {
    setQuestionId(question.key)
    setModalText(question.question)
    setOpen(true)
  };

  const handleOk = async () => {
    let newQuestion = document.getElementById("question") as HTMLInputElement
    setConfirmLoading(true);

    if (questionId) {
      await updateQuestion(questionId, newQuestion.value)
    }

    setOpen(false);
    setConfirmLoading(false);
    window.location.reload()
    
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
        scroll={{ y: '80vh' }}
        pagination={{ pageSize: 15 }}
      />
      <Modal
        title={"Edit Question"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <label htmlFor="question" style={{display: "none"}}>Question:  </label>
        <input id="question" defaultValue={modalText} style={{width: "90%"}}/>
      </Modal>
    </Card>
  );
};
