import express from 'express';
import users from './routes/users';
import bodyParser from 'body-parser';
const app = express();

app.use('/js', express.static(__dirname + '/js'))
app.set('view engine', 'pug')


app.use(bodyParser.json());
app.use('/api/users', users)

app.get('/*', function(req, res){
	res.render('../client/views/index')
})

app.listen(3000, function(){
	console.log('listening to port 3000')
})