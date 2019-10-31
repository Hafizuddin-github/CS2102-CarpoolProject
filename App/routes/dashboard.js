const express = require('express');
const router = express.Router();
const sql_query = require('../sql');

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

/* SQL Query */
var sql_query2 = 'SELECT * FROM users WHERE username =';

router.get('/', function(req, res, next) {
	var get_user_info = sql_query2 +  "'" + req.signedCookies.user_id + "'";
	pool.query(get_user_info, (err, data) => {
		if(err){
            res.json({
                message : 'ERROR'
            }); 
		}
		else if (data.rows.length == 1) {
			pool.query(sql_query.query.check_driver,[req.signedCookies.user_id], (err2,data2) =>{
				if(err2){
					res.json({
						message : 'ERROR2'
					}); 
				}
				if (data2.rows.length == 1){
					res.render('dashboard', { title: req.signedCookies.user_id , data: data.rows, isLoggedin: req.signedCookies.user_id, status: "Registered" });
				}
				else{
					res.render('dashboard', { title: req.signedCookies.user_id , data: data.rows, isLoggedin: req.signedCookies.user_id, status: "Not Registered" });
				}
			});
		}
		else {
			next(new Error('Error more than 2 entries found.'));
		}
	});
});

module.exports = router;