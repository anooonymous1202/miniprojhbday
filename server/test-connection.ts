import { Pool } from '@neondatabase/serverless';
import ws from 'ws';
import { neonConfig } from '@neondatabase/serverless';

neonConfig.webSocketConstructor = ws;

const DATABASE_URL = "postgresql://neondb_owner:npg_hE3wbWyv0VpH@ep-falling-poetry-a1cnm9wc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

async function testConnection() {
  try {
    const pool = new Pool({ connectionString: DATABASE_URL });
    
    // Test basic connection
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Check existing tables
    const tablesQuery = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\nExisting tables:');
    console.log(tablesQuery.rows);
    
    // Check users table structure
    const usersStructure = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
    `);
    
    console.log('\nUsers table structure:');
    console.log(usersStructure.rows);
    
    // Check feedbacks table structure
    const feedbacksStructure = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'feedbacks'
    `);
    
    console.log('\nFeedbacks table structure:');
    console.log(feedbacksStructure.rows);
    
    // Check if there's any data
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    const feedbackCount = await client.query('SELECT COUNT(*) FROM feedbacks');
    
    console.log('\nData counts:');
    console.log('Users:', userCount.rows[0].count);
    console.log('Feedbacks:', feedbackCount.rows[0].count);
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection(); 