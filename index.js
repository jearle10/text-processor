const { TextProcessor} = require("./processor/processor");


const sampleTest = `

lorem ipsum dolor sit amet consectetur lorem ipsum et mihi quoniam et 
adipiscing elit.sed quoniam et advesperascit et mihi ad villam revertendum 
est nunc quidem hactenus ex rebus enim timiditas non ex vocabulis nascitur.nummus 
in croesi divitiis obscuratur pars est tamen divitiarum.nam quibus rebus efficiuntur 
voluptates eae non sunt in potestate sapientis.hoc mihi cum tuo fratre convenit.qui ita 
affectus beatum esse numquam probabis duo reges constructio interrete.de hominibus dici 
non necesse est.eam si varietatem diceres intellegerem ut etiam non dicente te intellego 
parvi enim primo ortu sic iacent tamquam omnino sine animo sint.ea possunt paria non 
esse.quamquam tu hanc copiosiorem etiam soles dicere.de quibus cupio scire quid sentias.
universa enim illorum ratione cum tota vestra confligendum puto.ut nemo dubitet eorum omnia
officia quo spectare quid sequi quid fugere debeant nunc vero a primo quidem mirabiliter
occulta natura est nec perspici nec cognosci potest.videmusne ut pueri ne verberibus quidem
a contemplandis rebus perquirendisque deterreantur sunt enim prima elementa naturae quibus 
auctis virtutis quasi germen efficitur.nam ut sint illa vendibiliora haec uberiora certe 
sunt.cur deinde metrodori liberos commendas.mihi inquam qui te id ipsum rogavi nam adhuc
meo fortasse vitio quid ego quaeram non perspicis.quibus ego vehementer assentior.cur 
iustitia laudatur mihi enim satis est ipsis non satis.quid est enim aliud esse versutum
nobis heracleotes ille dionysius flagitiose descivisse videtur a stoicis propter oculorum
dolorem.diodorus eius auditor adiungit ad honestatem vacuitatem doloris.nos quidem 
virtutes sic natae sumus ut tibi serviremus aliud negotii nihil habemus.
`

// ALl lowercase
// Letters, fullstops and single whitespace chars
// A word defined as a sequence of letters that is delimited by single whitespace or fullstop
// A full stop is not a word. No whitepsace before after fullstops
// Words seperated by fullstop whitespace character or fullstop
// sentence is delimited by fullstop

let control_text = "test i am testing me a test to challenge ten eleven twelve thirteen fourteen test"

const Text = new TextProcessor(sampleTest)

console.log("Total sentences: ", Text.countSentences())

console.log("Total words: ",  Text.countWords())

console.log("Longest word: ", Text.longestWord())

console.log(Text.topWords(8))

console.log("Average sentence length: " , Text.averageSentenceLength())

console.log("% of words occurring once: " , Text.occurrenceRate(1) ,"%")

// console.log("Prominence: " , Text.prominence("test"))

console.log("Prominence: " , Text.topNProminence(5))
