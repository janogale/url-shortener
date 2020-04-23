//import Url model
const Url = require("../models/url.model.js")

//This is basically your domain name
const baseUrl = process.env.BASE_URL || "http://localhost:3000"

// import db module

const db = require("../db.js")

// connect to db
db.connect()

// create new short url
exports.handler = async (event, context, callback) => {
  //get the originalUrl and unique_name from the request's body
  let { originalUrl, unique_name } = JSON.parse(event.body)

  try {
    //check if unique_name alredy exists
    let nameExists = await Url.findOne({ unique_name })
    /** if unique_name already exists, send a response with an
        error message, else save the new unique_name and originalUrl */
    if (nameExists) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          error: "Unique name already exists, choose another",
          ok: false,
        }),
      })
    } else {
      const shortUrl = baseUrl + "/" + unique_name
      url = new Url({
        originalUrl,
        shortUrl,
        unique_name,
      })

      //save
      const saved = await url.save()
      //return success message shortUrl
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "success",
          ok: true,
          shortUrl,
        }),
      })
    }
  } catch (error) {
    ///catch any error, and return server error
    callback(JSON.stringify({ ok: false, error: error }))
  }
}
