//import Url model
const Url = require("../models/url.model.js")

//This is basically your domain name
const baseUrl = process.env.BASE_URL || "http://localhost:3000"

// import db module

const db = require("../db.js")

// connect to db
db.connect()

exports.handler = async (event, context, callback) => {
  //get the unique name from the req params (e.g olamide from shorten.me/olamide)
  const {
    queryStringParameters: { unique_name },
  } = event

  try {
    //find the Url model that has that unique_name
    let url = await Url.findOne({ unique_name })

    /** if such Url exists, redirect the user to the originalUrl 
       of that Url Model, else send a 404 Not Found Response */
    if (url) {
      callback(null, {
        success: true,
        statusCode: 200,
        body: url.originalUrl,
      })
    } else {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: "URL does not exist", success: false }),
      })
    }
  } catch (err) {
    //catch any error, and return server error to user
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ err, success: false }),
    })
  }
}
