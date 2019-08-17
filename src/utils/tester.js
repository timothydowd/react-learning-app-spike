const { extractRootWords, writeEmptyWordDataJson, formatJsonData } = require('./utils')
// const wordData = require('../data/word-data.json')
const rootWords = require('../data/rootWords.json')

// extractRootWords(wordData)
formatJsonData(rootWords)