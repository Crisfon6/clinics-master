const { Router } = require("express");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const FileType = require("file-type");
const fs = require('fs');
const moment = require("moment");
const validators = require("express-validators");
const validatePlaces = require("../middleware/validatePlaces.middleware");


const router = Router();

router.post("/:type/:id",
    // params("type").not().isIn(["CV", "avatar", "equipment"]),


    multipartMiddleware, async(req, res) => {
        const key = Object.keys(req.files)[0];
        const file = req.files[key];
        let mime = await FileType.fromFile(file.path);

        //validate file extension
        if (!mime) {
            console.log('first mime');
            return res.status(400).send({ msg: 'File not allowed' });
        }
        mime = mime.mime;
        if (!mime.startsWith('image') && !mime.endsWith('pdf')) {
            console.log('segundo mime');
            return res.status(400).send({ msg: 'File not allowed' });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({ msg: "File no found" });
        }
        // the type is allow 
        //type = folder where save this file
        const { type, id } = req.params;
        const validTypes = ["CV", "avatar", "equipment", ];
        console.log(validTypes);
        console.log(type);
        if (!validTypes.includes(type)) {
            return res.status(401).send({ msg: "Type no allowed" });
        }
        const ext = mime.split("/")[1];
        const url = req.protocol + "://" + req.get("host") + "/";
        const serverImg = "./uploads/" + type + "/" + moment().unix() + "." + ext;

        fs.createReadStream(file.path).pipe(
            fs.createWriteStream(serverImg)
        );
        res.status(200).send({ msg: "ok" });
        res.destroy();
    });
module.exports = router;