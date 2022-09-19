import { connect, ConnectionStates, Mongoose } from 'mongoose';

interface DatabaseConnection {
  isConnected?: ConnectionStates;
}

const connection: DatabaseConnection  = {};

const connectDb = async () => {
  if (connection.isConnected === 1) return;
  var db: Mongoose = await connect(process.env.MONGO_DB_URL);

  connection.isConnected = db.connections[0].readyState;
};

export default connectDb;
