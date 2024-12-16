const Hapi = require('@hapi/hapi');
const connectDB = require('./utils/db');
const categoryRoutes = require('./routes/categoryRoutes');

const startServer = async () => {
 
  await connectDB();

 
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: 'localhost',
  });

  
  server.route(categoryRoutes);

  
  await server.start();
  console.log('Server running at:', server.info.uri);
};

startServer().catch(err => {
  console.error(err);
  process.exit(1);
});
