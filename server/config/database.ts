
  import mongoose from 'mongoose'
  import env from '#start/env'
  import logger from '@adonisjs/core/services/logger'
  

  mongoose.set("strictQuery", true);
const mongoUrl = env.get('MONGO_URL', 'mongodb://localhost:27017/photozone')
 mongoose.connect(mongoUrl)
  .then(() => {
    logger.info("connecté");
    
logger.info('this is an info message')
    
  })
  .catch(console.error)
  