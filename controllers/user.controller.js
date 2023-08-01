module.exports.profile = (req, res, next) => {
    res.render('users/profile', { user: req.user });
    }