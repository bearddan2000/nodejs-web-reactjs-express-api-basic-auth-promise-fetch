var app = require('express')();
const cors = require('cors')();
const basicAuth = require('express-basic-auth')

const data = [
    { breed: "Am Bulldog", color: "White", id: 1 },
    { breed: "Blue Tick", color: "Grey", id: 2 },
    { breed: "Labrador", color: "Black", id: 3 },
    { breed: "Gr Shepard", color: "Brown", id: 4 }
];
// middleware called before each route
app.use(cors);

app.use(basicAuth({
    users: { 'maria': 'pass' },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

app.get('/', function(req, res) {
    res.json(data);
    //res.send('Hello World');
});

app.listen(8000, () => {
    console.log('HTTPS Server running on port 8000');
});
