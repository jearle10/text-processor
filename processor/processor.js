
class TextProcessor {

    text;
    sentences;
    words;
    frequency;
    rankings;
    prominenceSums;


    constructor(text) {
        this.text = text
    }

    getText(){
        return this.text
    }

    countSentences() {
        let sentences = this.text.split('.')
        this.sentences = sentences
        return sentences.length
    }

    countWords(){
        let words = [];
        this.sentences.forEach((sentence) => {
            let w = sentence.split(' ')
            words = [...words , ...w]
        })
        this.words = words
        return words.length
    }

    longestWord(){
        let longest = this.words[0].length
        this.words.forEach((word) => {
            if (word.length > longest){
                longest = word.length
            }
        })
        return longest
    }

    wordFrequency (){
        let frequency = new Map();
        this.words.forEach(word => {
            if (frequency.has(word)){
                frequency.set(word , frequency.get(word) + 1)
            } else {
                frequency.set(word , 1)
            }
        })
        this.frequency = frequency
        return this.frequency;
    }


    topWords(number){
        this.wordFrequency()
        let top = [];
        this.frequency.forEach( (value , key , map)  => {
            top.push( { word : key , count :  map.get(key) } )
        })
        top.sort((a , b) => b.count - a.count )

        top = top.map((word, ranking) => ( { rank : ranking + 1 , ...word }))

        this.rankings = top

        return top.slice(0 , number)
        // What to do if two words appear the same number of times ?
    }

    averageSentenceLength(){
        return this.words.length / this.sentences.length
    }

    appearNTimes(n){
        let count = 0;
        this.rankings.forEach((rank) => {
            if(rank.count === n){
                count += 1
            }
        })
        return count
    }

    occurrenceRate(wordLength) {
        return (this.appearNTimes(wordLength) / this.words.length) * 100
    }

    // Need to do some more thinking on this one
    topPhrase (){

    }

    calculateSums (){
        let sums = new Map();
        this.words.forEach((word, position) => {
            if (sums.has(word)){
                sums.set(word , {
                    positionSum : sums.get(word).positionSum + position + 1,
                    positionsNum : sums.get(word).positionsNum + 1
                })
            } else {
                sums.set(word , {
                    positionSum :  position + 1,
                    positionsNum :  1
                })
            }
        })

        this.prominenceSums = sums;
    }

    prominence (word) {
        this.calculateSums()
        let positionSum = this.prominenceSums.get(word).positionSum
        let positionsNum = this.prominenceSums.get(word).positionsNum
        return  (this.words.length - ((positionSum - 1) / positionsNum)) * (100 / this.words.length)
    }

    topNProminence(n){
        let prominences = [];
        this.rankings.forEach((ranking)=> {
            prominences.push({...ranking , prominence : this.prominence(ranking.word)})
        })
        return prominences.slice(0 , n)
    }
}

module.exports = { TextProcessor }
