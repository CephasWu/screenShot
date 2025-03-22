import express from 'express';

const app = express();
app.use(express.json());
/**
 * @swagger
 * /:
 *   get:
 *     summary: 根路由，返回 Hello 訊息
 *     responses:
 *       200:
 *         description: 成功回應一個 hello 訊息
 */
/* GET home page. */
app.get('/', function (req, res) {
    res.json({message: 'This is a HELLO API response，please goto /screenShot or /screenShot/base64'});
});

export default app;