const User = require('../models/user');

module.exports.profile = async function (req, res) {
    if (req.cookies.user_id) {
        try {
            const user = await User.findById(req.cookies.user_id);
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        } catch (err) {
            console.log('Error in finding user profile:', err);
            return res.redirect('/users/sign-in');
        }
    } else {
        return res.redirect('/users/sign-in');
    }
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // });
};


// Sign out the user
module.exports.signOut = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
};


// Render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

// Render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

// Get the sign up data
module.exports.create = async function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in finding or creating user in signing up:', err);
        return res.redirect('back');
    }
};

// Sign in and create a session for the user
module.exports.createSession = async function (req, res) {
    try {
        // Find the user
        const user = await User.findOne({ email: req.body.email });

        // Handle user found
        if (user) {
            // Handle password which don't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            // Handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            // Handle user not found
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in finding user in signing in:', err);
        return res.redirect('back');
    }
}
