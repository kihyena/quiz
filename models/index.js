var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite
// DATABASE_URL = sqlite:///
// DATABASE_STORAGE = quiz.sqlite
//Usar BBDD Postgres:
// DATABASE_URL = postgres://mittroepwopciv:1ccVNFuW6my0ApR8TIwYLuJJFO@ec2-107-20-174-127.compute-1.amazonaws.com:5432/d4t9dqr6c482rs

var url, storage;

if(!process.env.DATABASE_URL){
  url="sqlite:///";
  storage = "quiz.sqlite";
}else{
  url = process.env.DATABASE_URL;
  storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, {storage: storage, omitNull: true});



//Importar la definición de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Importar la definicion de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));

//Importar la definicion de la tabla Attachments de attachment.js
var Attachment = sequelize.import(path.join(__dirname,'attachment'));

//Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

User.hasMany(Comment,{foreignKey: 'AuthorId'});
Comment.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

Attachment.belongsTo(Quiz);
Quiz.hasOne(Attachment);

exports.Quiz = Quiz;  // exportar definición de tabla Quiz
exports.Comment = Comment;  //exportar definición de tabla Comments
exports.User = User;
exports.Attachment = Attachment;
