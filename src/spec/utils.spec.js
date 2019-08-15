const { expect } = require('chai')
const { fetchWordInfos}  = require('../utils/utils')
const data = require('../data/word-data.json')



describe('fetchWordInfos', () => {
    

    it('when passed an array rootwords, and a criteria of synonym, and 1 word to be returned, returns an array', async () => {
        const rootWords = ['Because']
        const result = await fetchWordInfos(rootWords,'synonyms', 1)
        expect(result).to.be.an('array')
    });

    it.only('when passed an array of rootwords, and a criteria of synonym, and 1 word to be returned, returns an array', async function () {
        this.timeout(120000)
        const result = await fetchWordInfos(data,'synonyms', 5)
        expect(result).to.have.lengthOf(5)
    });


});

