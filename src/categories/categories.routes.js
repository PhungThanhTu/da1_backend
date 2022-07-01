const express = require('express');
const model = require('./categories.model')

const router = express.Router();


router.get('/',async (req,res) => {
    try {
        const categories = await model.getCategories();
        const result = categories.map(category => category.name);
        res.status(200).send(result);
    }
    catch {
        res.send({
            message: "Error"
        })
    }

})

router.post('/',async (req,res) => {
    try {
        const result = await model.newCategory(req.body);
        res.status(200).send(result);
    }
    catch {
        res.status(403).send({
            message:"Cannot create new category"
        })
    }
})

module.exports = router;