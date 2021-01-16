import mongoose from 'mongoose';
import config from '../config';

export default async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: config.dbName
    })
    .catch(error => {
      console.log(process.env.DB_PASS)

      console.error('Error connecting to database.');
      console.error(' > ' + error);

      throw error;
    });
};
