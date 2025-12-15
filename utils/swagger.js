const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quicklah Customer Service Documentation",
      version: "1.0.0",
      description: "Documentation for Quicklah, a food delivery platform",
      license: {
        name: "BASE URL: https://quicklah-customer-service.onrender.com/api/v1",
      },
      contact: {
        name: "Backend Repo",
        url: "https://github.com/Quicklah/QUICKLAH_CUSTOMER_SERVICE.git",
      },
    },
    servers: [
      {
        url: "https://quicklah-customer-service.onrender.com/api/v1",
        description: "Production server",
      },
      {
        url: "http://localhost:4860/api/v1",
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