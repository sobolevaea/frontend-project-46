import _ from 'lodash'

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value1: data2[key],
      }
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value1: data1[key],
      }
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildTree(data1[key], data2[key]),
      }
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        value1: data1[key],
        value2: data2[key],
      }
    }
    return {
      type: 'unchanged',
      key,
      value1: data1[key],
    }
  })
}

export default buildTree
