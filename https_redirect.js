const express = require('express');
const redirect = express();

try {

  // set up a route to redirect http to https
  redirect.get('*', function (req, res) {
    res.redirect('https://' + req.headers.host + req.url);
  });

  redirect.listen(80);
  console.log(`redirecting port 80 traffic to 443`);
} catch (err) {
  console.log('started http server');
}

