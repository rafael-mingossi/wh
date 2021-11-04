const expressJwt = require('express-jwt');

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;

  return expressJwt({
    //this will check if the secret was created throug the API
    secret,
    algorithms: ['HS256'], //this was taken from www.jwt.io website
  }).unless({
    //the unless will make routes LOGIN and REGISTER NOT NEED THE TOKEN
    path: [
      { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'POST', 'OPTIONS'] },
      { url: /\/api\/v1\/adds(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/rates(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/invoices(.*)/, methods: ['GET', 'OPTIONS'] },
    ],
  });
}

module.exports = authJwt;
