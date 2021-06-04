const multer = require("multer");
const moment  = require("moment");
const dir = "./uploads/";
const path = require("path");


const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,dir+file.fieldname+"/");
    },
    filename:(req,file,fn)=>{
    
        filename = moment().unix() + path.extname(file.originalname);
        fn(null,filename);
    }
});

const upload = multer({
    storage:storage,
    fileFilter:(req,file,fn)=>{
       
        if(!file) {
           
            return fn(null,false)}
        else if(!file.mimetype.includes("image") && file.fieldname === "image"){
      
            req.params = {"error-img":"format-error"}
            fn(null,false)
        }
        else if(!file.mimetype.includes("pdf") && file.fieldname === "CV"){
         
            req.params = {"error-pdf":"format-error"}
            fn(null,false)
        }
        else {
        
            return fn(null,true)}
    },
});

module.exports = upload;