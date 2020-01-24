const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ConnRouter = require('./Routes/ConnectRoute');
const UploadDocRouter = require('./Routes/UploadDocRoute');
const FetchRouter = require('./Routes/FetchRoute');
const InsertRouter = require('./Routes/InsertRoute');
const DeleteRouter = require('./Routes/DeleteRoute');
const UpdateRouter = require('./Routes/UpadateRoute');
const FindByNameRouter = require('./Routes/FindByNameRoute');
const GetDataByNameRouter = require('./Routes/GetDataByNameRoute');
const GetDocHolderRouter = require('./Routes/GetDocHolderRoute');
const GetDocsRouter = require('./Routes/GetDocRoute');
const GetAllDocsDataRouter = require('./Routes/GetAllDocsDataRoute');
const GetDocsDetailsRouter = require('./Routes/GetDocsDetails');
const GetSelectedRecordDetailsRouter = require('./Routes/GetSelectedRecordDetailsRoute');
const GetDocPicRouter = require('./Routes/GetDocPicRoute');
const AuthRouter = require('./Routes/AuthRoute');

const app = express();

const PORT = process.env.PORT || 3500;

app.listen( PORT, () => console.log(` Server Running... PORT: ${ PORT } `) );

app.use( express.json() );  
app.use( bodyParser.urlencoded({ extended : true }) );
app.use( bodyParser.json() );

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect( 'mongodb://localhost:27017/some', err => {

    if( err ) 
        console.log( err );
    else 
        console.log("DataBase Connected..");
});

app.use('/Connection', ConnRouter );
app.use('/Fetch', FetchRouter );
app.use('/Data', InsertRouter);
app.use('/Record', DeleteRouter );
app.use('/UpdateRecord', UpdateRouter );
app.use('/Find', FindByNameRouter );
app.use('/FindData', GetDataByNameRouter );
app.use('/Doc', GetDocHolderRouter );
app.use('/Upload', UploadDocRouter );
app.use('/GetDocs', GetDocsRouter );
app.use('/All', GetAllDocsDataRouter);
app.use('/Details', GetDocsDetailsRouter);
app.use('/Record', GetSelectedRecordDetailsRouter );
app.use('/Pic', GetDocPicRouter );
app.use('/Auth', AuthRouter );