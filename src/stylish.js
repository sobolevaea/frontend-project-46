import _ from 'lodash'

const builder = (lines, bracketIndent) => ['{', ...lines, `${bracketIndent}}`,].join('\n')

const iter = (currentValue, depth, spacesCount, replacer = ' ') => {
  if (!_.isObject(currentValue)) {
    return String(currentValue)
  }

  const indentSize = depth * spacesCount
  const currentIndent = replacer.repeat(indentSize)
  const bracketIndent = replacer.repeat(indentSize - spacesCount)
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1, spacesCount, replacer)}`)

  return builder(lines, bracketIndent)
}

export const formatStylish = (tree, depth = 1) => {
  const spacesCount = 4
  const replacer = ' '

  const indentSize = depth * spacesCount
  const currentIndent = replacer.repeat(indentSize)
  const bracketIndent = replacer.repeat(indentSize - spacesCount)
  const symbolIndent = replacer.repeat(indentSize - 2)

  const lines = tree.map((el) => {
    switch (el.type) {
      case 'nested':
        return `${currentIndent}${el.key}: ${formatStylish(el.children, depth + 1)}`
      case 'added':
        return `${symbolIndent}+ ${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`
      case 'unchanged':
        return `${currentIndent}${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`
      case 'deleted':
        return `${symbolIndent}- ${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`
      case 'changed':
        return [
          `${symbolIndent}- ${el.key}: ${iter(el.value1, depth + 1, spacesCount, replacer)}`,
          `${symbolIndent}+ ${el.key}: ${iter(el.value2, depth + 1, spacesCount, replacer)}`,
        ].join('\n')
      default:
        throw new Error(`Unknown type: ${el.type}`)
    }
  })

  return builder(lines, bracketIndent)
}
