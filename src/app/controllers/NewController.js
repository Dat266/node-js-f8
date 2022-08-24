

class NewControllers {
    //[GET] /new
    index(req, res) {
        res.render('new')
    }

    // [GET] /new/:slug

    show(req, res) {
        res.send('detail ! success!');
    }
}

module.exports = new NewControllers;