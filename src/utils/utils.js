const config = require('../config.json')
const axios = require('axios')
const fs = require('fs')
const wordData = require('../data/word-data.json')


const formatJsonData = (json) => {
    const formattedData = json.reduce((reducedData, object) => {
        const word = object["Word"].trim()
        const synonyms = [object["Synonym 1"], object["Synonym 2"], object["Synonym 3"], object["Synonym 4"]]
        const antonyms = [object["Antonym 1"], object["Antonym 2"], object["Antonym 3"], object["Antonym 4"]]

        const removedBlankSynonyms = synonyms.reduce((reducedSynonyms, synonym) => {
            return synonym === "" ? [...reducedSynonyms] : [ ...reducedSynonyms, synonym]    
        },[])

        const removedBlankAntonyms = antonyms.reduce((reducedAntonyms, antonym) => {
            return antonym === "" ? [...reducedAntonyms] : [ ...reducedAntonyms, antonym]    
        },[])

        return [ ...reducedData, { word, synonyms: removedBlankSynonyms, antonyms: removedBlankAntonyms}]
    },[])

    
    return formattedData
}


const createQAndAs = (wordData, synOrAnt) => {
    
    const randomData = []
    const wordDataLength = wordData.length
    for (let i = 0; i < 20; i++) {  // get 20 random pieces of data
        const randomIndex = Math.floor(Math.random() * wordDataLength)
        if(synOrAnt === 'synonyms'){
            if(wordData[randomIndex].synonyms.length < 1 || wordData[randomIndex].antonyms.length < 2 || // make sure that for those pieces of data that 2 or more synonyms or antonyms exist 
                randomData.some(wordObject => { // and make sure that the same word isnt randomly chosen twice
                    
                    if(wordObject.word.trim() === wordData[randomIndex].word.trim()){
                        
                        return true
                    } else{
                        return false
                    }
                })
                ){ 
                i--
            }
            else{
                randomData.push(wordData[randomIndex])
            }
        } else if(synOrAnt === 'antonyms') {
            if(wordData[randomIndex].antonyms.length < 1 || wordData[randomIndex].synonyms.length < 2 || // make sure that for those pieces of data that 2 or more synonyms or antonyms exist 
                randomData.some(wordObject => { // and make sure that the same word isnt randomly chosen twice
                   
                    
                    if(wordObject.word.trim() === wordData[randomIndex].word.trim()){
                        
                        return true
                    } else{
                        return false
                    }
                })
                ){ 
                i--
            }
            else{
                randomData.push(wordData[randomIndex])
            }
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





const fetchWordInfos = async (data, rootWord) => {

        

        let response
        const URL = `https://od-api.oxforddictionaries.com/api/v2/thesaurus/en-gb/${rootWord}?strictMatch=false`;
            try{
                response = await axios.get(URL, config)
            
            }   catch(err) {
                console.log('error:',err.response.data)
            }

            formatFetchedDataAndWriteToFile(rootWord, response)
        
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
            "Antonym 4": ""
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

const formatFetchedDataAndWriteToFile = (rootWord, fetchedData) => {
    
    const antonyms = fetchedData.data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms
    const synonyms = fetchedData.data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms
    const formattedData = { rootWord }

    for(let i = 1; i <= 4; i++){
        if('id' in synonyms[i-1]) formattedData[`Synonym ${i}`] = synonyms[i-1].id
        else if('text' in synonyms[i-1]) formattedData[`Synonym ${i}`] = synonyms[i-1].text
        else formattedData[`Synonym ${i}`] = ''
    }

    for(let i = 1; i <= 4; i++){
        if('id' in antonyms[i-1]) formattedData[`Antonym ${i}`] = antonyms[i-1].id
        else if('text' in antonyms[i-1]) formattedData[`Antonym ${i}`] = antonyms[i-1].text
        else formattedData[`Antonym ${i}`] = ''
    }

    fs.writeFile("./writeFileData.json", JSON.stringify(formattedData), err => {
        if (err) {
            console.error(err);
            return;
        }
        //file written successfully
        });

    return formattedData   
}

  module.exports = { formatJsonData, createQAndAs, insertQuestionBackIntoStack, getTotalValidSynsAndAnts, extractRootWords, fetchWordInfos, writeEmptyWordDataJson }