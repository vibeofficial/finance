const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Documentation",
      version: "1.0.0",
      description: "Documentation for Finance, a platform that helps manage your financial expenses",
      license: {
        name: "",
      },
      contact: {
        name: "Backend Repo",
        url: "https://github.com/vibeofficial/finance.git",
      },
    },
    servers: [
      {
        url: "https://finance-81fc.onrender.com/api/v1",
        description: "Production server",
      },
      {
        url: "http://localhost:7070/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./routers/*.js"],
};

exports.openapiSpecification = swaggerJsdoc(options);