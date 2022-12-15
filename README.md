<div align="center">
    <img src="https://www.smarty.com/img/advent-of-code-2022.png" alt="Advent Of Code 2022 banner">
    <hr />
</div>

<div align="center">
    <img src="https://img.shields.io/badge/node.js%20-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/javascript%20-%23323330?style=for-the-badge&logo=javascript" />
    <img src="https://img.shields.io/badge/python-%23FFD343?style=for-the-badge&logo=python&logoColor=black" />
    <img src="https://img.shields.io/badge/ruby-%23CC342D?style=for-the-badge&logo=ruby&logoColor=white" />
</div>
<hr />

## About
This repository contains solutions for Advent of Code. Feel free to compare these against your own implementations.

## Prerequisites
 * [Node.js](https://nodejs.org)
 * [Python](https://python.org)
 * [Ruby](https://www.ruby-lang.org)

## Setup
To set up a development environment, copy the contents of `.env.example` to `.env` in the root of the project. It should look as follows:
```env
SESSION_SECRET="YOUR_AOC_SESSION_KEY"
```

## Development
To get your input for a solution, run `node aoc.js input <day>` in the root of the project (only supported by AoC 2022 solutions).
To run the solutions for a day using your input, run `node aoc.js run <day>`.

To run solutions of other languages, navigate to the directory of the solution itself, and run it in the terminal using the respective command-line invokation.
For example, if you wanted to run the solution to the first part of a day's solution:
```sh
node P1.js # JavaScript
py P1.py # Python
ruby P1.rb # Ruby
```

**NOTE:** Double carriage returns on Windows can appear as either `\n\n` or `\n\r` (depending on whether you used the tool to generate your input or if the input was copied manually). Please adjust the solution accordingly if you are running into a related error.
