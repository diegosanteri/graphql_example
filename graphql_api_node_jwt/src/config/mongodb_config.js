import mongoose from 'mongoose';

class MongoDBConfig {
    
    init() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DB_HOST);
        mongoose.connection
            .once('open', () => console.log('Connected to Mongo.'))
            .on('error', error => console.log('Error connecting to Mongo', error));
    }
}

export default new MongoDBConfig();

