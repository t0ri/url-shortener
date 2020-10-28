// Import Dependencies
const { nanoid } = require('nanoid')

// Import Model
const UrlModel = require('../models/url.models')

exports.getUrl = async (req, res) => {
  // Get `slug` from request
  const { slug } = req.params

  // Query `slug` in DB
  const foundSlug = await UrlModel.findOne({ slug })

  // If `slug` isn't in DB, create it
  if (!foundSlug || foundSlug.length === 0) {
    const fullUrl = `${req.protocol}://${req.get('Host')}${req.originalUrl}`
    res.status(404).json({ message: "URL not found.", body: { slug, url: fullUrl } })
  } else {
    res.status(302).redirect(foundSlug.url)
  }
}

exports.postUrl = async (req, res) => {
  // Get `url` and `slug` from request
  let { url, slug } = req.body

  // Generate `slug` if `undefined`
  if (!slug) { slug = nanoid(5) }
  slug.toLocaleLowerCase()

  // Query `slug` in DB
  const foundSlug = await UrlModel.find({ slug })

  // If `slug` isn't in DB, create it
  if (!foundSlug || foundSlug.length === 0) {
    // Create `newUrl` object
    const newUrl = new UrlModel(
      {
        slug,
        url,
      }
    )

    // Save `newUrl` in DB
    const response = await newUrl.save()
    
    res.status(200).json({ message: "Creation successful!", body: response })
  } else {
    res.status(409).json({ message: "Resource already exists.", body: { slug: "", url: "" } })
  }
}

