const { Router } = require('express');
const router = Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/:type/:id', multipartMiddleware, async(req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ msg: 'File no found' });
    }
    console.log(req.files);
    const { type, id } = req.params;

    const validTypes = ['CV', 'avatar', 'equipment'];
    //valid types
    if (!validTypes.includes(type)) {
        res.status(401).status({ msg: 'Invalid Type' });
    }


    console.log(type, id);
    res.status(200).send({ msg: 'ok' });
})
module.exports = router;