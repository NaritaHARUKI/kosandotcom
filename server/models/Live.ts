import mongoose from 'mongoose'

const liveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Band',
        required: true
    },
    valid_date: {
        type: Date,
        required: true
    },
})

liveSchema.index({ valid_date: 1 }, { unique: false })

const Live = mongoose.model('Live', liveSchema)

export default Live