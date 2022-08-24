const Course = require('../model/Course');
const {multipleMongooseToObject} = require('../../until/mongoose')

class SiteControllers {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses:multipleMongooseToObject(courses)
                })
            })
            .catch(next)
            
            
    }
        // res.render('home')
   

    // [GET] /new/search

    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteControllers;