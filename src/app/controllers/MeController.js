const Course = require('../model/Course');
const {multipleMongooseToObject} = require('../../until/mongoose')

class MeController {
    //[GET]  /me

    storeCourses(req, res, next) {

        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) { 
            courseQuery = courseQuery.sort({
                [req.query.colum] : req.query.type,
            }); 
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>
            res.render('me/stored-courses',
                {
                    deleteCount,
                courses: multipleMongooseToObject(courses)
                })
            )

       
    }

    //[GET]  /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);

    }
   
}

module.exports = new MeController;