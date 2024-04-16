import swaggerJsDoc from 'swagger-jsdoc';

export const useSwaggerOptions = () => {
  const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
      openapi: '3.0.3',
      info: {
        version: '1.0.0',
        title: 'Template TS API',
        termsOfService: 'http://swagger.io/terms/',
        description: 'Template TS API',
        contact: {
          name: 'MuXeD',
          url: 'https://github.com/juananmuxed',
        },
      },
      servers: [
        {
          url: `http://${process.env.API_HOST}:${process.env.API_PORT}/api`,
          description: 'Development server',
        },
      ],
    },
    apis: ['src/docs/**/*.yml'],
  };
  if (process.env.NODE_ENV === 'production' && swaggerOptions.definition) {
    swaggerOptions.definition.servers = [{
      url: 'https://warpig.muxed.dev/api',
      description: 'Warpig API',
    }];
  }
  return swaggerOptions;
};

export const useSwagger = () => {
  const swaggerDocs = swaggerJsDoc(useSwaggerOptions());
  return swaggerDocs;
};
