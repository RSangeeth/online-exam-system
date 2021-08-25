var express = require('express');
var router = express.Router();
var User = require('../models/user');
router.get('/', (req, res, next) => {
	return res.render('index.ejs');
});


    router.post('/', (req, res, next) => {
	console.log(req.body);
	var personInfo = req.body;

	if (!personInfo.email || !personInfo.username  || !personInfo.year ||
		 !personInfo.dept || !personInfo.place || !personInfo.mobnum || !personInfo.dateofj || !personInfo.dateofb ||!personInfo.password || !personInfo.passwordConf) {
		 res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, (err, data) => {
				if (!data) {
					var c;
					User.findOne({}, (err, data) => {

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						    var newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							year: personInfo.year,
							dept: personInfo.dept,
							place: personInfo.place,
							mobnum: personInfo.mobnum,
							dateofj: personInfo.dateofj,
							dateofb: personInfo.dateofb,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
							
						});

						newPerson.save((err, Person) => {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/login', (req, res, next) => {
	return res.render('login.ejs');
});

router.post('/login', (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		if (data) {

			if (data.password == req.body.password) {
				req.session.userId = data.unique_id;
				res.send({ "Success": "Success!" });
			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/dashboard', (req, res, next) => {
	console.log("dashboard");
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
		return res.render('dashboard.ejs', { "name": data.username, "email": data.email });
			
		}
		 
	});
});

router.get('/logout', (req, res, next) => {
	console.log("logout")
	if (req.session) {
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/login');
			}
		});
	}
});

 router.get('/forgetpass', (req, res, next) => {
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/dashboard');
		} else {
		return res.render('forget.ejs', { "name": data.username});
			
		}
	});
 
});


router.post('/forgetpass', (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save((err, Person) => {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});

router.get('/examslist', (req, res, next) => {
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/dashboard');
		} else {
		return res.render('examslist.ejs', { "name": data.username});
			
		}
	});
 
});

router.get('/userprofile', (req, res, next) => {
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/dashboard');
		} else {
		return res.render('userprofile.ejs', { "name": data.username, "email": data.email,  "year": data.year,
		"dept": data.dept,  "place": data.place, "mobnum": data.mobnum, "dateofj": data.dateofj , "dateofb": data.dateofb });
			
		}
	});
	 
});

router.get('/cart', (req, res, next) => {
	return res.render('cart.ejs');
	
});

router.get('/upcomming', (req, res, next) => {
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/dashboard');
		} else {
		return res.render('upcomming.ejs', { "name": data.username});
			
		}
	});
});

router.get('/cdc', (req, res, next) => {
	return res.render('cdc.ejs');
});

router.get('/completed', (req, res, next) => {
	User.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/dashboard');
		} else {
	return res.render('completed.ejs', { "name": data.username});
		}
});
});

router.get('/attendance', (req, res, next) => {
	return res.render('attendance.ejs');
});

router.get('/header', (req, res, next) => {
	return res.render('header.ejs');
});

module.exports = router;