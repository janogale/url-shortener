exports.handler = (event, context, callback) => {
  const {
    queryStringParameters: { name },
  } = event
  callback(null, {
    statusCode: 200,
    body: event.body,
  })
}
