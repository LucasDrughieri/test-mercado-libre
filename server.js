import express from 'express';  
import webpack from 'webpack';  
import path from 'path';  
import webpackConfig from './webpack.config';  
import open from 'open';  
import bodyParser from 'body-parser';
import config from './config/config';
import expressValidator from 'express-validator';

const compiler = webpack(webpackConfig);
var app = express();

app.set('view engine', 'ejs');

app.use(require('webpack-dev-middleware')(compiler, {  
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(express.static(path.join(__dirname, '/app/assets/images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(require('webpack-hot-middleware')(compiler)); 

// Routes
require('./config/routes')(app);

app.listen(config.port, (err) => {  
  if (err) { 
    console.log(err);
  }
  else {
    console.info(`App running on port: ${config.port}`);
    open(`http://localhost:${config.port}`);
  }
});