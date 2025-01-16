const courseModel = require("../db/models/course-model");
const CourseModel = require("../db/models/course-model");

/**
 * Retrieve the list of all courses
 * @returns {Promise<Array<Course>>} List of courses
 */
const getAll = () => {
  return CourseModel.find({});
};

/**
 * Retrieve a course by its ID
 * @param {String} courseId Course ID
 * @returns {Promise<Course>} Course
 */
const getById = (courseId) => {
  return CourseModel.findById(courseId);
};

/**
 * Retrieve a course by its code
 * @param {String} courseCode Course code
 * @returns {Promise<Course>} Course
 */
const getByCode = (courseCode) => {
  return CourseModel.findOne({ code: courseCode });
};

/**
 * Create a new course
 * @param {Course} course Course properties
 * @returns {Promise<Course>} Created course
 */
const create = async (course, next) => {
  let newCode = await codeGenerator(next)

  const newCourse = new CourseModel({
    ...course, code: newCode,
  });

  return newCourse.save();
};

const codeGenerator = async (next) => {
  //COULD ALSO ADD A PACKAGE TO GENERATE A CODE, FOR EXAMPLE: 
  // npm install randomstring
  // let provisionalCode = randomstring.generate({length: 6, charset: 'alphabetic'}).toUpperCase();
  
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  let codeArray = []

  for (let i = 0; i < 6; i++) {
    codeArray.push(alphabet[Math.floor(Math.random()*26)])
  }

  let provisionalCode = codeArray.join("")
  
  try {
    const course = await courseModel.findOne({ code: provisionalCode });
    if (course) {
      codeGenerator(next)
    } else {
      return provisionalCode
    }
  } catch (err) {
    next(err)
  }
  
}

/**
 * Update a course
 * @param {String} courseId Course ID
 * @param {Object} partialCourse Course properties to update
 * @returns {Promise<Course>} Updated course
 */
const update = async (courseId, partialCourse) => {
  await CourseModel.findOneAndUpdate(
    { _id: courseId },
    {
      $set: {
        ...partialCourse,
      },
      upsert: true,
    }
  );

  return CourseModel.findById(courseId);
};

/**
 * Delete a course
 * @param {String} courseId Course ID
 */
const remove = async (courseId) => {
  await CourseModel.deleteOne({ _id: courseId });
};

module.exports = {
  getAll,
  getById,
  getByCode,
  create,
  update,
  remove,
};
