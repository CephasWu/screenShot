// file: public/javascripts/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mini Blog API',
            description: "API endpoints for a mini blog services documented on swagger",
            contact: {
                name: "Desmond Obisi",
                email: "info@miniblog.com",
                url: "https://github.com/DesmondSanctity/node-js-swagger"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server"
            },
            {
                url: "your live url here",
                description: "Live server"
            },
        ]
    },
    // 移除重复的配置，确保路径正确指向你的路由文件
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// 直接导出函数，而不是包装在对象中
function swaggerDocs(app) {
    // Swagger Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Documentation in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

// 正确的导出方式 - 直接导出函数
export default swaggerDocs;