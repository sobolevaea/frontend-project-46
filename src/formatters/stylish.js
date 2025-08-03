import _ from 'lodash'

const builder = (lines, bracketIndent) => ['{', ...lines, `${bracketIndent}}`].join('\n')

const calcIndents = (depth, spacesCount, replacer) => {
  const indentSize = depth * spacesCount
  const currentIndent = replacer.repeat(indentSize)
  const bracketIndent = replacer.repeat(indentSize - spacesCount)
  return [currentIndent, bracketIndent]
}

const iter = (currentValue, depth, spacesCount, replacer = ' ') => {
  if (!_.isObject(currentValue)) {
    return String(currentValue)
  }
  const [currentIndent, bracketIndent] = calcIndents(depth, spacesCount, replacer)
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1, spacesCount, replacer)}`)

  return builder(lines, bracketIndent)
}

const formatStylish = (tree, depth = 1) => {
  const spacesCount = 4
  const replacer = ' '

  const [currentIndent, bracketIndent] = calcIndents(depth, spacesCount, replacer)

  const lines = tree.map((el) => {
    switch (el.type) {
      case 'nested':
        return `${currentIndent}${el.key}: ${formatStylish(el.children, depth + 1)}`
      case 'added':
        return `${bracketIndent}  + ${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`
      case 'unchanged':
        return `${currentIndent}${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`
      case 'deleted':
        return `${bracketIndent}  - ${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`
      case 'changed':
        return [
          `${bracketIndent}  - ${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`,
          `${bracketIndent}  + ${el.key}: ${iter(el.value2, depth + 1, spacesCount, replacer)}`,
        ].join('\n')
      default:
        throw new Error(`Unknown type: ${el.type}`)
    }
  })

  return builder(lines, bracketIndent)
}

export default formatStylish
