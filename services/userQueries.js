const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const bcrypt = require('bcrypt');


const getUserByEmail = async(request, response, next) => {
    let { email } = request.params;
    db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
      })
}

const getUserById = async(request, response, next) => {
    let { id } = request.params;
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(200).json(results.rows)
      })
}

const createUser = async(request, response, next) => {
    let { name, email, password, password2 } = request.body;
    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({message: 'please enter all fields'})
    }
    if (password.length < 6) {
        errors.push({message: 'password should be atleast 6 characters'})
    }
    if (password != password2) {
        errors.push({message: 'passwords do not match'})
    }
    if (errors.length > 0) {
        response.redirect('/register', { errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
            console.log(user);
            if (error) {
                console.log('email not in database yet');
            }
        })
        if (user) {
            errors.push({message: 'user with that email already exists!!!'});
            response.render('/register', { errors });
        } else {
            db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword], (error, results) => {
                if (error) {
                    console.log(err);
                    return response.status(500).json(err);
                }
            })
            request.flash('success_msg', "you are now registered, please log in");
            console.log('here')
            response.redirect("/login")
        }    
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
}