const verseLines = [
    "One, two, three, four, five.",
    "Everybody in the car, so come on, let's ride.",
    "To the liquor store around the corner.",
    "The boys say they want some gin and juice.",
    "But I really don't wanna.",
    "Beer bust like I had last week.",
    "I must stay deep because talk is cheap.",
    "I like Angela, Pamela, Sandra and Rita.",
    "And as I continue you know they getting sweeter.",
    "So what can I do? I really beg you, my Lord.",
    "To me is flirting it's just like sport, anything fly.",
    "It's all good, let me dump it, please set in the trumpet.",
    "Jump up and down and move it all around.",
    "Shake your head to the sound.",
    "Put your hand on the ground.",
    "Take one step left and one step right.",
    "One to the front and one to the side.",
    "Clap your hand once and clap your hands twice.",
    "And if it looks like this then you doing it right.",
    "I do all to fall in love with a girl like you.",
    "'Cause you can't run and you can't hide.",
    "You and me gonna touch the sky."
]

const chorusLines = [
    "A little bit of Monica in my life.",
    "A little bit of Erica by my side.",
    "A little bit of Rita is all I need.",
    "A little bit of Tina is what I see.",
    "A little bit of Sandra in the sun.",
    "A little bit of Mary all night long.",
    "A little bit of Jessica, here I am.",
    "A little bit of you makes me your man.",
    "Ipsum Number Five.",
    "Lorem, the lorem."
]

const firstLine = "Ladies and gentlemen, this is Ipsum Number Five."

function shuffle(a) {
    return a.slice().sort(() => Math.random() - 0.5)
}

function getLines(arr, lines) {
    return shuffle(arr).slice(0, lines)
}

function* paragraphGenerator(singleParagraph = false, linesPer) {
    //the first line should always be firstLine
    if (singleParagraph) {
        //There there is only one paragraph, we should use the chorus lines.
        yield [firstLine, ...getLines(chorusLines, linesPer)];
    } else {
        //Every odd paragraph should be a verse, every even should be a chorus
        yield [firstLine, ...getLines(verseLines, linesPer)];
        for (let d = false ; ; d = !d) {
            yield getLines(d ? verseLines : chorusLines, linesPer);
        }
    }
}

const defaults = {
    paragraphSeparator : "\r\n\r\n",
    phraseSeparator : " ",
    linesPer : 6
}

export function ipsum(paragraphs, options = defaults) {
    const opts = Object.assign({}, defaults, options);
    let gen = paragraphGenerator(paragraphs === 1, opts.linesPer);
    return Array
        .apply(null, {length: paragraphs})
        .map(_ => gen.next())
        .map(it => it.value)
        .map(it => it.join(opts.phraseSeparator))
        .join(opts.paragraphSeparator);
}
