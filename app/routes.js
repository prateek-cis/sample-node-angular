var Theme = require('./models/theme');

function getThemes(res) {
    Theme.find(function (err, themes) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(themes); // return all themes in JSON format
    });
}
;

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all themes
    app.get('/api/themes', function (req, res) {
        // use mongoose to get all themes in the database
        getThemes(res);
    });

    // create theme and send back all themes after creation
    app.post('/api/themes', function (req, res) {
        // create a theme, information comes from request from Angular
        Theme.create({
            themeName: req.body.themeName,
            font: req.body.font.face,
            fontNo: req.body.fontNo.size
        }, function (err, theme) {
            if (err)
                res.send(err);

            // get and return all the themes after you create another
            getThemes(res);
        });

    });

    // delete a theme
    app.delete('/api/themes/:theme_id', function (req, res) {
        Theme.remove({
            _id: req.params.theme_id
        }, function (err, theme) {
            if (err)
                res.send(err);

            getThemes(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};