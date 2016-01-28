var express = require("express");
var app     = express();

var exports = module.exports = {}; //This will be usefull to tests

var path    = require("path");

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// To make these folders availables
LIBPATH = path.join(process.env.PWD, 'lib');
app.use('/lib', express.static(LIBPATH, { maxAge: 86400000 }));

JSPATH = path.join(process.env.PWD, 'js');
app.use('/js', express.static(JSPATH, { maxAge: 86400000 }));

CSSPATH = path.join(process.env.PWD, 'css');
app.use('/css', express.static(CSSPATH, { maxAge: 86400000 }));




/**
 * Redict to index.html when no url is specified.
 *
 * @param {object} req - A object that represents the request
 * 
 * @param {object} res - The object that is used to response
 */
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/view/index.html'));
	//__dirname : It will resolve to your project folder.
});


/**
 * Redict to index.html 
 *
 * @param {object} req - A object that represents the request
 * 
 * @param {object} res - The object that is used to response
 */
app.get('/index.html',function(req,res){
	res.sendFile(path.join(__dirname+'/view/index.html'));
	//__dirname : It will resolve to your project folder.
});



/**
 * Post request to convert the number
 */
app.post('/convertNumber', function(req, res) {	
    if(req.body.rawNumber){
        var rawNumber = req.body.rawNumber.toString();
        if(!isNaN(rawNumber)){
            rawNumber = rawNumber.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            
            rawNumber = rawNumber.split(".")[0];
            
            
            var size = rawNumber.length; 
            if( size <= 6){ //Small number
                res.status(200).jsonp({prettifiedNumber: rawNumber});    
            }else if(size > 6 && size < 10){ // Million
                var ans = _formatNumber(rawNumber,6,'M');
                
                res.status(200).jsonp({prettifiedNumber: ans});    
            }else if(size > 9 && size < 13){// Billion
                var ans = _formatNumber(rawNumber,9,'B');
                res.status(200).jsonp({prettifiedNumber: ans});
            }else if(size > 12 && size < 16){// Trillion
                var ans = _formatNumber(rawNumber,12,'T');                
                res.status(200).jsonp({prettifiedNumber: ans});
            }else{// Big number
                res.status(200).jsonp({error: "This number is too big to be converted."});    
            }
  
        }else{
            res.status(200).jsonp({error: "Bad parameters. You should send a valid number."});    
        }
    }else{
        res.status(200).jsonp({error: "Bad parameters. Please check your POST call."});
    }
});

/**
 * Formats the number to Prettified
 * @private
 * @param {string} rawNumber - The raw number
 * @param {integer} base - The magnitude of the number (ex.: 6 for million)
 * @param {char} simbol - The simbol of the magnitude
 * 
 * @return {string} The prettified number
 * 
 */
function _formatNumber(rawNumber, base, simbol){
    var ans = ""; // return
    var size = rawNumber.length;  
    
    var diff = size - base;
    
    ans = rawNumber.substring(0, diff);
    
    if(rawNumber[diff] != 0){
        ans = ans.concat("."+rawNumber[diff]);
    } 
    
    ans = ans.concat(simbol);
    
    return ans;
}


var server = app.listen(3000);

console.log("The server is running in the port 3000");

exports.closeServer = function(){
    server.close();
};