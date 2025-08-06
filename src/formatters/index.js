import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
}

export default (tree, formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatters[formatName](tree)
}
