// Import Dependencies
const mongoose = require('mongoose')

// `UrlModel` Schema
const UrlModel = mongoose.model('Url',
  mongoose.Schema(
    {
      slug: {
        type: String,
        minlength: [1, 'Slug does not contain enough characters'],
        maxlength: [5, 'Slug contains too many characters (Max: 5)'],
        trim: true,
        validate: {
          validator: slug => {
            return /[\w\-]/.test(slug)
          },
          message: props => `${props.value} is not a valid slug.`,
        },
      },
      url: {
        type: String,
        required: [true, 'A valid URL must be provided.'],
        trim: true,
      },
    },
    { timestamps: true },
  )
)

// Export Model
module.exports = UrlModel