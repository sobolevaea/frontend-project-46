# Project "gendiff":
[![Actions Status](https://github.com/sobolevaea/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/sobolevaea/frontend-project-46/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sobolevaea_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=sobolevaea_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sobolevaea_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=sobolevaea_frontend-project-46)

## Description
"gendiff" is an utility that identifies the differences between two data structures. This is a common task with many online solutions (e.g., [jsondiff.com](http://www.jsondiff.com/)). It's frequently used in test outputs and automated tracking of configuration file changes.

## Features
- Supports input formats: `JSON`, `YAML`
- Generates reports in formats:  
  `stylish` (tree view) | `plain` (text) | `json`

## Getting Started
1. Clone git repository
```
git clone git@github.com:sobolevaea/frontend-project-46.git
```
2. Move to the project folder
```
cd frontend-project-46/
```
3. Install the dependencies
```
make install
```

## How to Use
```bash
gendiff -h
Usage: gendiff [options] <filepath1> <filepath>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

## Output examples
### 1. Stylish format (default):
[![asciicast](https://asciinema.org/a/X2Kp7xbJcbYF8gcsFPov8wZmH.svg)](https://asciinema.org/a/X2Kp7xbJcbYF8gcsFPov8wZmH)

### 2. Plain format:
[![asciicast](https://asciinema.org/a/VFwQqkTcCI3rLVeq6FTxTRXBJ.svg)](https://asciinema.org/a/VFwQqkTcCI3rLVeq6FTxTRXBJ)

### 3. JSON format:
[![asciicast](https://asciinema.org/a/1iYoAIxe58Kemn0yNLGljxhzL.svg)](https://asciinema.org/a/1iYoAIxe58Kemn0yNLGljxhzL)