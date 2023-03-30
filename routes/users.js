
// const { request } = require('express');
let NeDB = require('nedb');

let db = new NeDB({
    filename: 'users.db',
    autoload: true

});


module.exports = (app) => {

    let route = app.route('/users');

    route.get((req, res) => {


        db.find({}).sort({ name: 1 }).exec((err, users) => {

            if (err) {

                app.utils.error.send(err, req, res);

            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    // users: users  como o chave tem o mesmo nome que a variavel, pode ser escrito como abaixo:
                    users
                });

            }

        });

    });

    route.post((req, res) => {

        req.assert('name', 'O Nome é obrigatório.').notEmpty();
        req.assert('email', 'O e-mail está inválido.').notEmpty().isEmail();

        let errors = req.validationErrors();

        if (errors) {
            app.utils.error.send(errors, req, res);
            return false;
        }

        db.insert(req.body, (err, user) => {

            if (err) {

                app.utils.error.send(err, req, res);

            } else {

                res.status(200).json(user);

            }

        });

    });

    let routeID = app.route('/users/:id');

    routeID.get((req, res) => {

        db.findOne({ _id: req.params.id }).exec((err, user) => {

            if (err) {

                app.utils.error.send(err, req, res);

            } else {

                res.status(200).json(user);
            }
        });

    });

    routeID.put((req, res) => {

        db.update({ _id: req.params.id }, req.body, err => {

            if (err) {

                app.utils.error.send(err, req, res);

            } else {

                res.status(200).json(Object.assign(req.params, req.body));
            }
        });

    });

    routeID.delete((req, res) => {

        db.remove({ _id: req.params.id }, {}, err => {

            if (err) {

                app.utils.error.send(err, req, res);

            } else {

                res.status(200).json(req.params);
            }
        });

    });

};