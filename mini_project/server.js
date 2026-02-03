import app from './app.js';
import dotenv from 'dotenv';
import { initDatabase } from './src/config/dbinit.js';
dotenv.config();

try {
  await initDatabase();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error) {
  console.log('error while connecting to the database: ', error);
}
