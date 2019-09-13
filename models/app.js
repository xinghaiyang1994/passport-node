const mysql = require('../middlewares/mysql')

module.exports = mysql.Model.extend({
  tableName: 'app'     // 表名
})
