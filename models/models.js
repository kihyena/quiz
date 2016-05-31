//Importar la definición de al tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importar la definicion de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;  // exportar definición de tabla Quiz
exports.Comment = Comment;  //exportar definición de tabla Comments
