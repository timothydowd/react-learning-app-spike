const { extractRootWords, writeEmptyWordDataJson } = require('./utils')
const wordData = require('../data/word-data.json')
const rootWords = require('../data/rootWords.json')

// extractRootWords(wordData)
writeEmptyWordDataJson(rootWords)