import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import genDiff from '../src/index.js'

test('json format', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.json`
  const filepath2 = `${__dirname}/../__fixtures__/file2.json`

  const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}'
  expect(genDiff(filepath1, filepath2)).toBe(expected)
})

test('yaml format', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.yml`
  const filepath2 = `${__dirname}/../__fixtures__/file2.yml`

  const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}'
  expect(genDiff(filepath1, filepath2)).toBe(expected)
})
