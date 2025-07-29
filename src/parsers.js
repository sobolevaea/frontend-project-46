import yaml from 'js-yaml'

export const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data)
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data, 'utf8')
  }
}
