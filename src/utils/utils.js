const config = require('../config.json')
const axios = require('axios')
const fs = require('fs')





const formatJsonData = (json) => {
    const formattedData = json.map((word) => {
        const trimmedWord = word.trim()
        const synonyms = []
        const antonyms = []

        // const removedBlankSynonyms = synonyms.reduce((reducedSynonyms, synonym) => {
        //     return synonym === "" ? [...reducedSynonyms] : [ ...reducedSynonyms, synonym]    
        // },[])

        // const removedBlankAntonyms = antonyms.reduce((reducedAntonyms, antonym) => {
        //     return antonym === "" ? [...reducedAntonyms] : [ ...reducedAntonyms, antonym]    
        // },[])



        // return [ ...reducedData, { word, synonyms: removedBlankSynonyms, antonyms: removedBlankAntonyms}]
        return { word: trimmedWord, synonyms, antonyms, checked: false}
    })

    fs.writeFile("./src/data/word-data.json", JSON.stringify(formattedData, null, 2), err => {
        if (err) {
            console.error(err);
            return;
        }
        //file written successfully
        });


    // return formattedData
}

const checkWordObjectIsValid = (wordObject, synOrAnt, randomData) => {
if(synOrAnt === 'synonyms'){
            if(wordObject.synonyms.length < 1 || wordObject.antonyms.length < 2 || // make sure that for those pieces of data that 2 or more synonyms or antonyms exist 
                randomData.some(object => { // and make sure that the same word isnt randomly chosen twice
                    if(object.word === wordObject){ // removed trim
                        
                        return true
                    } else{
                        return false
                    }
                })
                ){ 
                return false
            }
            else{
                return true
            }
        } else if(synOrAnt === 'antonyms') {
            if(wordObject.antonyms.length < 1 || wordObject.synonyms.length < 2 || // make sure that for those pieces of data that 2 or more synonyms or antonyms exist 
                randomData.some(object => { // and make sure that the same word isnt randomly chosen twice
                    if(object.word === wordObject.word){
                        
                        return true
                    } else{
                        return false
                    }
                })
                ){ 
                return false
            }
            else{
                return true
            }
        }    
}


const createQAndAs = async (wordData, synOrAnt) => {
    
    const randomData = []
    const wordDataLength = wordData.length
    for (let i = 0; i < 1; i++) {  // get 20 random pieces of data
        
        const randomIndex = Math.floor(Math.random() * wordDataLength)
        const rootWord = wordData[randomIndex].word
        let wordObjectToEvaluate
        let noEntriesFound = false

        if(wordData[randomIndex].checked === true){
            wordObjectToEvaluate = wordData[randomIndex]    
        } else {
            const newWordData = await fetchWordInfos(rootWord)
            if(newWordData === 'NoEntriesFound'){
                i--
                noEntriesFound = true
            } else {
                wordObjectToEvaluate = formatFetchedDataAndWriteToFile(randomIndex, rootWord, newWordData)
            }
        }

        if(noEntriesFound === false){
            if(checkWordObjectIsValid(wordObjectToEvaluate, synOrAnt, randomData)) {
                randomData.push(wordObjectToEvaluate)
            } else {
                i--
            }
        } else {
            noEntriesFound = false
        }
        
             
    }
    

 
    
    const formattedQandAs = randomData.map((wordObject, index) => {
        // format to q and a 
        const randomIndex = Math.floor(Math.random() * wordObject[synOrAnt].length)
        if(synOrAnt === 'synonyms'){
            const word = wordObject.word
            const antonyms = wordObject.antonyms
            const correctAnswer = wordObject.synonyms[randomIndex]
            const randomIndexOptions = Math.floor(Math.random() * antonyms.length)
            const optionsWithCorrectAnswer = [...antonyms.slice(0, randomIndexOptions), correctAnswer, ...antonyms.slice(randomIndexOptions)]
            
            return { id: index + 1, word, options: optionsWithCorrectAnswer, correctAnswer  }
        } else if(synOrAnt === 'antonyms') {
            const word = wordObject.word
            const synonyms = wordObject.synonyms
            const correctAnswer = wordObject.antonyms[randomIndex]
            const randomIndexOptions = Math.floor(Math.random() * synonyms.length)
            const optionsWithCorrectAnswer = [...synonyms.slice(0, randomIndexOptions), correctAnswer, ...synonyms.slice(randomIndexOptions)]
            return { id: index + 1, word, options: optionsWithCorrectAnswer, correctAnswer  }
        }
        
    })
    console.log('questions: ', formattedQandAs)
    return formattedQandAs
    
    
}

const insertQuestionBackIntoStack = (qAndAs, questionIndex) => {
    // console.log('qAndAs: ',qAndAs)
    
    // console.log('questionIndex: ', questionIndex)
    const questionToInsert = qAndAs[questionIndex]
    const newQAndAs = [...qAndAs.slice(0, questionIndex + 3), questionToInsert, ...qAndAs.slice(questionIndex + 3)]

    return newQAndAs

}

const getTotalValidSynsAndAnts = (wordData) => {
    console.log('wordData.length: ', wordData.length)
    const maxWordSyn = wordData.reduce((accValidWordsData, datum) => {
        if(datum.synonyms.length < 1 || datum.antonyms.length < 2 || 
            accValidWordsData.some(wordObject => { // and make sure that the same word isnt randomly chosen twice      
                if(wordObject.word.trim() === datum.word.trim()){
                    return true
                } else{
                    return false
                }
            })
        ){
            return accValidWordsData
        } else {
            return [...accValidWordsData, datum]
        }
    },[])

    console.log('maxWordSyn.length: ', maxWordSyn.length)

    const maxWordAnt = wordData.reduce((accValidWordsData, datum) => {
        if(datum.antonyms.length < 1 || datum.synonyms.length < 2 || 
            accValidWordsData.some(wordObject => { // and make sure that the same word isnt randomly chosen twice      
                if(wordObject.word.trim() === datum.word.trim()){
                    return true
                } else{
                    return false
                }
            })
        ){
            return accValidWordsData
        } else {
            return [...accValidWordsData, datum]
        }
    },[])

    console.log('maxWordAnt.length: ', maxWordAnt.length)
    console.log(maxWordAnt)
    return { validSyns: maxWordSyn.length, validAnts: maxWordAnt.length }
    
    

}

const extractRootWords = data => {
    const rootWords = data.map(wordObject => {
      return wordObject.Word.trim()
    })

    fs.writeFile("./rootWords.json", JSON.stringify(rootWords), err => {
        if (err) {
            console.error(err);
            return;
        }
        //file written successfully
        });
    
    
}





const fetchWordInfos = async (rootWord) => {

        

    let response
    const URL = `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/thesaurus/en-gb/${rootWord}?strictMatch=false`;
        try{
            response = await axios.get(URL, config)
        
        }   catch(err) {
            console.log('error:',err.response.data)
            response = 'NoEntriesFound'
        }
        // console.log(response.data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms)
        return response

        // formatFetchedDataAndWriteToFile(rootWord, response)
        
}

const writeEmptyWordDataJson = (rootWords) => {
    const emptyJson = rootWords.map(word => {
        return {
            Word: word,
            "Synonym 1": "",
            "Synonym 2": "",
            "Synonym 3": "",
            "Synonym 4": "",
            "Antonym 1": "",
            "Antonym 2": "",
            "Antonym 3": "",
            "Antonym 4": "",
            checked: false
          }
    })

    fs.writeFile("./emptyWordData.json", JSON.stringify(emptyJson, null, 2), err => {
        if (err) {
            console.error(err);
            return;
        }
        //file written successfully
        });


}

const formatFetchedDataAndWriteToFile = (indexOfWord, rootWord, fetchedData) => {
    console.log('rootWord:', rootWord)
    const wordDataJson = require('../data/word-data.json')
    let antonyms
    let synonyms
    if(fetchedData.data.results[0].lexicalEntries[0].entries[0].senses[0].hasOwnProperty('antonyms')){
        antonyms = fetchedData.data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms
    } else {
        antonyms = []
    }

    if(fetchedData.data.results[0].lexicalEntries[0].entries[0].senses[0].hasOwnProperty('synonyms')){
        synonyms = fetchedData.data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms
    } else {
        synonyms = []
    }
     
    
    const formattedData = { word: rootWord, synonyms: [], antonyms: [], checked: true }
    
    
    if(synonyms.length !== 0){
        for(let i = 1; i <= 4 && i <= synonyms.length; i++){
            if('id' in synonyms[i-1]) formattedData.synonyms.push(synonyms[i-1].id)
            else if('text' in synonyms[i-1]) formattedData.synonyms.push(synonyms[i-1].text)
        }
        wordDataJson[indexOfWord].synonyms.push(...formattedData.synonyms)
    }
    
    if(antonyms.length !== 0){
        for(let i = 1; i <= 4 && i <= antonyms.length; i++){
            if('id' in antonyms[i-1]) formattedData.antonyms.push(antonyms[i-1].id)
            else if('text' in antonyms[i-1]) formattedData.antonyms.push(antonyms[i-1].text)
        }
        wordDataJson[indexOfWord].antonyms.push(...formattedData.antonyms)
    }

    wordDataJson[indexOfWord].checked = true

    fs.writeFile("./src/data/word-data.json", JSON.stringify(wordDataJson, null, 2), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('file written successfully')
        });
    console.log('formattedData: ', formattedData)    

    return formattedData
}

  module.exports = { formatJsonData, createQAndAs, insertQuestionBackIntoStack, getTotalValidSynsAndAnts, extractRootWords, fetchWordInfos, writeEmptyWordDataJson }