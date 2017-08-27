'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

// var Article = db.define('article', {
//   title: {
//     type: db.Sequelize.STRING,
//     validate: {
//       notEmpty: true
//     }
//   },
//   content: {
//     type: db.Sequelize.TEXT,
//     allowNull: false
//   },
//   version: {
//     type: db.Sequelize.INTEGER,
//     defaultValue: 0
//   },
//     tags: {
//       type: db.Sequelize.ARRAY(db.Sequelize.STRING),
//       defaultValue: []
//     }
// },{
//   getterMethods:{
//     snippet: function(){
//       if (this.content === undefined)
//         return '';
//       return this.content.substring(0,23) + '...';
//     },
//     tags: function(){
//       var arrTags = this.getDataValue('tags');
//       return arrTags.join(', ');
//     }
//   },
//   instanceMethods: {
//     truncate: function(num){
//       this.content = this.content.substring(0,num);
//     }
//   },
//   classMethods: {
//     findByTitle: function(findTitle){
//       return Article.findOne({
//         where: { title: findTitle}
//       })
//     }
//   },
//   hooks: {
//     beforeCreate: function(article){
//       article.version = article.version++;
//     },
//     afterUpdate: function(article){
//       article.version = ++article.version;
//     }
//   }
// });

// Article.belongsTo(User, {as: 'author'});

//---------^^^---------  your code above  ---------^^^----------

//new code testing again below

const Article = db.define('article', {
  name: {
    type: db.Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: db.Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: db.Sequelize.TEXT,
    allowNull: false
  },
  version: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING),
    defaultValue: [],
    get: function(){
      return this.getDataValue('tags').join(', ')
    }
  }
},{
  getterMethods: {
    snippet: function(){
      if(this.content === undefined) return '';
      return this.content.slice(0,23) + '...'
    },
    // tags: function(){
    //   let args = this.getDataValue('tags');
    //   return args.join(', ');
    // }
  },
  instanceMethods: {
    truncate: function(num){
      this.content = this.content.slice(0,num);
     // return this.content;
    }
  },
  classMethods: {
    findByTitle: function(title){
      return Article.findOne({
        where: { title: title }
      })
    }
  },
  hooks: {
    afterUpdate: function(article){
      ++article.version;
    }
  }

})

Article.belongsTo(User, { as: 'author'})
module.exports = Article;
