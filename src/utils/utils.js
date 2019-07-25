export const formatJsonData = (json) => {
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

export const createQAndAs = (wordData, synOrAnt) => {
    
    const randomData = []
    const wordDataLength = wordData.length
    for (let i = 0; i < 20; i++) {  // get 20 random pieces of data
        const randomIndex = Math.floor(Math.random() * wordDataLength)
        if(synOrAnt === 'synonyms'){
            if(wordData[randomIndex].synonyms.length < 1 || wordData[randomIndex].antonyms.length < 2){ // make sure that for those pieces of data that 2 or more synonyms or antonyms exist 
                i--
            }
            else{
                randomData.push(wordData[randomIndex])
            }
        } else if(synOrAnt === 'antonyms') {
            if(wordData[randomIndex].antonyms.length < 1 || wordData[randomIndex].synonyms.length < 2){ // make sure that for those pieces of data that 2 or more synonyms or antonyms exist 
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
            return { id: index + 1, word: wordObject.word, options: wordObject.antonyms, correctAnswer: wordObject.synonyms[randomIndex]  }
        } else if(synOrAnt === 'antonyms') {
            return { id: index + 1, word: wordObject.word, options: wordObject.synonyms, correctAnswer: wordObject.antonyms[randomIndex]  }
        }
        
    })

    return formattedQandAs
    
    
}