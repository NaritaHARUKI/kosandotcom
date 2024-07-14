import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdministrator: {
    type: Boolean,
    required: true
  },
  attendLives: [{
    liveId :{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Live',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    createdAt:{
      type: Date,
      required: true
    }
  }
  ]
})

userSchema.index({ email: 1 }, { unique: true })

const User = mongoose.model('User', userSchema)

export default User
