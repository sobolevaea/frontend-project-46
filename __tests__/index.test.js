import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import genDiff from '../src/index.js'

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')
const stylish = readFile('stylish.txt')
const plain = readFile('plain.txt')

test('json format', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  expect(genDiff(filepath1, filepath2)).toBe(stylish)
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(plain)
})

test('yaml format', () => {
  const filepath1 = getFixturePath('file1.yml')
  const filepath2 = getFixturePath('file2.yml')

  expect(genDiff(filepath1, filepath2)).toBe(stylish)
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(plain)
})
