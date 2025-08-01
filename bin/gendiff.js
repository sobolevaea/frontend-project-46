#!/usr/bin/env node

import { program } from 'commander'
import genDiff from '../src/index.js'

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format
    console.log(genDiff(filepath1, filepath2, formatName))
  })

program.parse()
