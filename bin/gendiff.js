#!/usr/bin/env node

import { program } from 'commander'
import { parse } from '../src/utils.js'
import { genDiff } from '../src/utils.js'

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const parsed1 = parse(filepath1)
    const parsed2 = parse(filepath2)
    console.log(genDiff(parsed1, parsed2))
  })

program.parse()
