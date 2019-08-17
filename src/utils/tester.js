const { extractRootWords, writeEmptyWordDataJson, formatJsonData, createQAndAs } = require('./utils')
const wordData = require('../data/word-data.json')
const rootWords = require('../data/rootWords.json')

// extractRootWords(wordData)
// formatJsonData(rootWords)
createQAndAs(wordData, 'synonyms')
