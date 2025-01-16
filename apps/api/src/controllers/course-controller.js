const courseService = require("../services/course-service");

/**
 * List courses
 */
const list = async (_req, res, next) => {
  try {
    const courses = await courseService.getAll();
    const coursesSubset = courses.map(course => {
      return {
        _id: course._id,
        code: course.code,
        title: course.title,
        description: course.description,

      }
    })
    res.status(200).json(coursesSubset);
  } catch (err) {
    return next(err);
  }
};

/**
 * Get a specific course
 */
const get = async (req, res, next) => {
  try {
    const course = await courseService.getById(req.params.courseId);

    res.status(200).json(course);
  } catch (err) {
    return next(err);
  }
};

/**
 * Search courses by title or code
 */
const search = async (req, res, next) => {
 
  try {
    let {courseCodeOrTitle} = req.query
    const searchResult = await courseService.getByCodeOrTitle(courseCodeOrTitle)
    const searchResultSubset = searchResult.map(course => {
      return {
        _id: course._id,
        code: course.code,
        title: course.title,
        description: course.description,

      }
    })
    res.status(200).json(searchResultSubset);
  } catch (err) {
    return next(err);
  }
};

/**
 * Create a course
 */

const create = async (req, res, next) => {
  
  try {
    const course = await courseService.create(req.body, next);

    res.status(201).json(course);
  } catch (err) {
    return next(err);
  }
};

/**
 * Update a course
 */
const update = async (req, res, next) => {
  try {
    const course = await courseService.update(req.params.courseId, req.body);

    res.status(200).json(course);
  } catch (err) {
    return next(err);
  }
};

/**
 * Remove a course
 */
const remove = async (req, res, next) => {
  try {
    await courseService.remove(req.params.courseId);

    res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  list,
  get,
  create,
  update,
  remove,
  search,
};
