/**
 * Mongoose model AllowedEmail.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import val from 'validator'

// Create a schema.
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: val.isEmail
  }
}, {
  timestamps: true
})

// Create a model using the schema.
export const AllowedEmail = mongoose.model('AllowedEmail', schema)
