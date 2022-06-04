
class TextProcessor {

    text : string

    sentences : string[] = []
    sentenceCount : number = 0;
    words : string[] = []
    wordCount : number = 0;

    frequency : Map<string , number > = new Map();
    prominenceSums : Map<string , ProminenceSum>  = new Map();
    rankings : Rank[] = []


    constructor(text : string) {
        this.text = text
        this.processText()
    }

    getText(){
        return this.text
    }

    processText() : void {
        this.parseSentences()
        this.parseWords()
        this.countSentences()
        this.countWords()
        this.rankWords()
    }

    parseSentences() : void {
        this.sentences = this.text.split('.')
    }

    parseWords() : void {
        this.sentences.forEach((sentence) => {
            let words = sentence.split(' ')
            this.words = [...this.words, ...words]
        })
    }

    countSentences() : void {
        this.sentenceCount = this.sentences.length
    }

    countWords() : void {
        this.wordCount = this.words.length
    }

    longestWord() : string {
        let longest = this.words[0].length
        let longestWord = this.words[0]
        this.words.forEach((word, index) => {
            if (word.length > longest){
                longest = word.length
                longestWord = this.words[index]
            }
        })
        return longestWord
    }

    wordFrequency () : void {
        this.words.forEach(word => {
            if (this.frequency.has(word)){
                // @ts-ignore
                this.frequency.set(word , this.frequency.get(word) + 1)
            } else {
                this.frequency.set(word , 1)
            }
        })
    }

    rankWords () : void {
        this.wordFrequency()
        this.frequency.forEach( (value , key)  => {
            // @ts-ignore
            this.rankings.push( { word : key , count : this.frequency.get(key) } )
        })
        this.rankings.sort((a , b) => b.count - a.count )
        // @ts-ignore
        this.rankings = this.rankings.map((word, ranking) => ( { rank : ranking + 1 , ...word }))
    }

    topWords(rankLength : number){
        return this.rankings.slice(0 , rankLength)
        // What to do if two words appear the same number of times ?
    }

    averageSentenceLength  () : number {
        return this.words.length / this.sentences.length
    }

    appearNTimes(occurrences : number){
        let count = 0;
        this.rankings.forEach((rank) => {
            if(rank.count === occurrences){
                count += 1
            }
        })
        return count
    }

    occurrenceRate(wordLength: number) : number {
        return (this.appearNTimes(wordLength) / this.words.length) * 100
    }

    // Need to do some more thinking on this one
    topPhrase (){
    }

    calculateSums () : void {
        this.words.forEach((word, position) => {
            if (this.prominenceSums.has(word)){
                this.prominenceSums.set(word , {
                    // @ts-ignore
                    positionSum :  this.prominenceSums.get(word).positionSum + position + 1,
                    // @ts-ignore
                    positionsNum : this.prominenceSums.get(word).positionsNum + 1
                })
            } else {
                this.prominenceSums.set(word , {
                    positionSum :  position + 1,
                    positionsNum :  1
                })
            }
        })
    }

    prominence (word : string) {
        this.calculateSums()
        let positionSum = this.prominenceSums.get(word)?.positionSum
        let positionsNum = this.prominenceSums.get(word)?.positionsNum
        // @ts-ignore
        return  (this.words.length - ((positionSum - 1) / positionsNum)) * (100 / this.words.length)
    }

    topNProminence(topWords : number){
        let prominences : Rank[] = [];
        this.rankings.forEach((ranking)=> {
            prominences.push({
                rank : ranking.rank ,
                word : ranking.word,
                count : ranking.count ,
                prominence : this.prominence(ranking.word)})
        })
        return prominences.slice(0 , topWords)
    }
}

interface Rank {
    rank? : number,
    word : string,
    count : number
    prominence : number
}

interface ProminenceSum {
    positionSum : number,
    positionsNum : number
}

export  { TextProcessor }
