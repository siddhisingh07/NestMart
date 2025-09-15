const databaseName = 'Grocery';
const database_url =`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.vlpgqcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

console.log(process.env.DATABASE_USERNAME)
export { databaseName, database_url };
