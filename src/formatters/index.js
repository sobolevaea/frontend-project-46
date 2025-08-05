import stylish from './stylish.js'
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
}

export default (formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatters[formatName]
}
