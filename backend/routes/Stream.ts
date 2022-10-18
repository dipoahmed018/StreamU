import { Router } from "express";
import { startStream } from "../app/controller/StreamController"
const router = Router();

router.post('/stream', startStream)

module.exports = router