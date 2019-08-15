const config = require('../config.json')
const axios = require('axios')
const fs = require('fs')


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
    
    return rootWords
}





const fetchWordInfos = async (data, synAnt, nToBeReturned) => {

        const extractedRootWords = extractRootWords(data)
        
        let randomData = []
        let antonyms =''
        let synonyms = ''

        for(let i = 0; i < nToBeReturned; i++){
            const randomIndex = Math.floor(Math.random() * extractedRootWords.length)
            const rootWord = extractedRootWords[randomIndex]
            const URL = `https://od-api.oxforddictionaries.com/api/v2/thesaurus/en-gb/${rootWord}?strictMatch=false`;
                try{
                    const response = await axios.get(URL, config)
                antonyms = response.data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms
                console.log('rootWord: ', rootWord, '///////////////////////////////////////////')
                
                synonyms = response.data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms
                
                } catch(err) {
                            console.log('error:',err.response.data)
                        }
            
            if(synAnt === 'synonyms'){
                if(!antonyms || !synonyms || antonyms.length < 2 || synonyms.length < 1){
                    i--
                    console.log('no diggity')
                } else { 
                    console.log('anotnyms: ', antonyms)
                    console.log('synonyms: ', synonyms)
                    randomData.push({rootWord, synonyms: synonyms, antonyms: antonyms })
                }
            } else if(synAnt === 'antonyms'){
                if(!antonyms || !synonyms || synonyms.length < 2 || antonyms.length < 1){
                    i--
                    console.log('no diggity')
                } else { 
                    console.log('anotnyms: ', antonyms)
                    console.log('synonyms: ', synonyms)
                    randomData.push({rootWord, synonyms: synonyms, antonyms: antonyms })
                }
            }
        }

        fs.writeFile("./writeFileData.json", JSON.stringify(randomData), err => {
            if (err) {
              console.error(err);
              return;
            }
            //file written successfully
          });
        
            
        return randomData

    
}

const formatFetchedData = (fetchedData) => {
    const formattedData = fetchedData.reduce((reducedData, object) => {
        const word = object["rootWord"].trim()
        const synonyms = [object.synonyms[0].id || object.synonyms[0].text, object.synonyms[1].id || object.synonyms[1] || "", object.synonyms[2].id || object.synonyms[2] || "", object.synonyms[3].id || object.synonyms[3] || ""]
        const antonyms = [object.antonyms[0].id || object.antonyms[0].text, object.antonyms[1].id || object.antonyms[1] || "", object.antonyms[2].id || object.antonyms[2] || "", object.antonyms[3].id || object.antonyms[3] || ""]
        // const synonyms = [object["Synonym 1"], object["Synonym 2"], object["Synonym 3"], object["Synonym 4"]]
       

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

  module.exports = { formatJsonData, createQAndAs, insertQuestionBackIntoStack, getTotalValidSynsAndAnts, extractRootWords, fetchWordInfos }