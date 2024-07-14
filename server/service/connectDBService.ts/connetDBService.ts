import mongoose from 'mongoose'

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/band-app'

const connetDBService = async () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => {
        console.error('MongoDB connection error:', err.message)
        setTimeout(connetDBService, 5000)
    })
}

export default connetDBService