module.exports = function SoftMiddleware(req, res, next) { 

    res.locals._sort = {
        enabled: false,
        type: 'default',
    };


    if (req.query.hasOwnProperty('_sort')) { 
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.colum = req.query.colum;

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            colum: req.query.colum,
        })
    }


    next();
}