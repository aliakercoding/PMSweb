module.exports = {

    index : (req, res) => {
        res.render('main/index');
    },

    loginMethodGet: (req,res) =>{
        res.render('main/login');
    },

    loginMethodPost: (req,res) =>{
        res.render('');
    },
    
    addnewuserMethodGet:(req,res) =>{
        res.render('main/addnewuser');
    },

    addnewuserMethodPost:(req,res) =>{
        res.render('');
    },
}