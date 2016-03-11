var express    = require('express'),
    app        = express(),
    port       = 3000;
app
    .use(express.static(__dirname + '/public'))
    .set('view engine', 'jade')
    .get('/', function(req, res) {
        res.render('index');
    })
    .listen(port);
console.log('server running on port ' + port);
