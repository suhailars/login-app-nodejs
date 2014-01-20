
exports.index = function(req, res){
 if(Parse.User.current()){
   res.render('index', { title: 'Homepage' });
 }else{
  res.redirect('/login');
 }
};
