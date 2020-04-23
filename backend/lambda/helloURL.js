exports.handler = (event, context, callback) => {
  const {
    queryStringParameters: { name },
    ...rest
  } = event
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ name, rest }),
  })
}
