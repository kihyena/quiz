var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
//Autoload de parametros
router.param('quizId', quizController.load); //Autoload :quizId
router.param('userId', userController.load); //autoload :userId

//Definición de rutas de cuenta
router.get('/users', userController.index);
router.get('/users/:userId(\\d+)', userController.show);
router.get('/users/new', userController.new);
router.post('/users', userController.create);
router.get('/users/:userId(\\d+)/edit', userController.edit);
router.put('/users/:userId(\\d+)', userController.update);
router.delete('/users/:userId(\\d+)', userController.destroy);

//router.get('/question', quizController.question);
router.get('/quizzes.:format(\\w+)?', quizController.index);
router.get('/quizzes/:quizId(\\d+).:format(\\w+)?', quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);
router.get('/quizzes/new', quizController.new);
router.post('/quizzes', quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizzes/:quizId(\\d+)', quizController.update);
router.delete('/quizzes/:quizId(\\d+)', quizController.destroy);
//router.get('/check', quizController.check);
router.get('/author', function(req, res, next){
  res.render('author');
});

router.get('/quizzes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
