import fs, { readFileSync } from 'node:fs'

export const parse = (filepath) => {
  const file = readFileSync(filepath, 'utf8')
  return JSON.parse(file)
}
