import createError from 'http-errors';
import express from'express';
import path from'path';
import cookieParser from'cookie-parser';
import logger from'morgan';
import swaggerDocs from'./public/javascripts/swagger.js';
import { fileURLToPath } from 'url';
import indexRouter from'./routes/index.js';
import helloRouter from "./routes/hello.js";

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// view engine setup，swagger需要前端畫面
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
// 解析 URL 編碼的表單數據
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', helloRouter);
app.use('/screenShot', indexRouter);

swaggerDocs(app);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export default app ;

