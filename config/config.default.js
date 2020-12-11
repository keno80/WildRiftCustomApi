exports.keys = 'WildRift'

// exports.mysql = {
//   client: {
//     host: '110.43.44.58',
//     port: '3306',
//     user: 'root',
//     password: 'Kai123..',
//     database: 'wildrift'
//   },
//   app: true,
//   agent: false
// }

exports.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Kai123..',
    database: 'wildrift'
  },
  app: true,
  agent: false
}

exports.security = {
  csrf: {
    enable: false
  },
  domainWhiteList: ['*']
}

exports.cors = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
}
