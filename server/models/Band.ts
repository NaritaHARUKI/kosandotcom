import mongoose from 'mongoose'

const bandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    administrator:[{
        type: String,
        required: true,
        ref: 'User'
    }],
    links: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    images: [{
        url:{
            type: String,
            required: true,
        },
        hash:{
            type: String,
            required: true,
        }
    }],
    movies: {
        type: Array,
        required: false
    },
})

bandSchema.index({ name: 1 }, { unique: false })

const Band = mongoose.model('Band', bandSchema)

export default Band