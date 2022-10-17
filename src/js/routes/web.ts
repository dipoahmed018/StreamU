import { Router } from "express";

const router = Router()

router.get('/', (req , res): void => {
    res.render('index', {title: "StreamU"})
})

module.exports = router;