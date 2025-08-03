import _ from 'lodash'

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const formatPlain = (tree, parentName = '') => {
  const elements = tree.map((el) => {
    const fullName = parentName ? `${parentName}.${el.key}` : el.key

    switch (el.type) {
      case 'added':
        return `Property '${fullName}' was added with value: ${getValue(el.value1)}`
      case 'deleted':
        return `Property '${fullName}' was removed`
      case 'changed':
        return `Property '${fullName}' was updated. From ${getValue(el.value1)} to ${getValue(el.value2)}`
      case 'nested':
        return formatPlain(el.children, fullName)
      case 'unchanged':
        return null
      default:
        throw new Error(`Unknown type: ${el.type}`)
    }
  })

  return elements.filter(Boolean).join('\n')
}

export default formatPlain
