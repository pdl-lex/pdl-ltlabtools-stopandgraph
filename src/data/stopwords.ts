// Standard Stopword Lists
// These are common stopwords for various languages

export type StopwordLanguage = 'de' | 'en';

export const standardStopwords: Record<StopwordLanguage, string[]> = {
  de: [
    // Articles
    'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'einem', 'einen', 'eines',
    // Pronouns
    'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'mich', 'dich', 'sich', 'uns', 'euch',
    'mir', 'dir', 'ihm', 'ihr', 'ihnen', 'mein', 'dein', 'sein', 'unser', 'euer',
    'meiner', 'deiner', 'seiner', 'unserer', 'eurer', 'ihrer',
    'meine', 'deine', 'seine', 'unsere', 'eure', 'ihre',
    'meinen', 'deinen', 'seinen', 'unseren', 'euren', 'ihren',
    'meinem', 'deinem', 'seinem', 'unserem', 'eurem', 'ihrem',
    'meines', 'deines', 'seines', 'unseres', 'eures', 'ihres',
    'dieser', 'diese', 'dieses', 'diesen', 'diesem',
    'jener', 'jene', 'jenes', 'jenen', 'jenem',
    'welcher', 'welche', 'welches', 'welchen', 'welchem',
    'was', 'wer', 'wen', 'wem', 'wessen',
    'man', 'selbst', 'selber', 'einander',
    // Prepositions
    'an', 'auf', 'aus', 'bei', 'bis', 'durch', 'für', 'gegen', 'hinter', 'in', 'mit',
    'nach', 'neben', 'ohne', 'über', 'um', 'unter', 'von', 'vor', 'während', 'wegen',
    'zwischen', 'zu', 'zum', 'zur', 'ab', 'außer', 'binnen', 'entlang', 'gegenüber',
    'gemäß', 'laut', 'mittels', 'samt', 'seit', 'statt', 'trotz', 'via',
    // Conjunctions
    'und', 'oder', 'aber', 'sondern', 'denn', 'doch', 'jedoch', 'weil', 'da', 'wenn',
    'als', 'ob', 'obwohl', 'obgleich', 'falls', 'sofern', 'soweit', 'damit', 'dass',
    'daß', 'bevor', 'ehe', 'nachdem', 'sobald', 'solange', 'sooft', 'während', 'indem',
    'wodurch', 'wohingegen', 'obschon', 'wenngleich', 'entweder', 'weder', 'noch', 'sowohl',
    // Auxiliary verbs
    'sein', 'ist', 'sind', 'war', 'waren', 'bin', 'bist', 'gewesen', 'sei', 'seien',
    'haben', 'hat', 'hatte', 'hatten', 'habe', 'hast', 'gehabt', 'hätte', 'hätten',
    'werden', 'wird', 'wurde', 'wurden', 'wirst', 'werde', 'geworden', 'würde', 'würden',
    'können', 'kann', 'konnte', 'konnten', 'kannst', 'könnte', 'könnten', 'gekonnt',
    'müssen', 'muss', 'muß', 'musste', 'mussten', 'musst', 'müsste', 'müssten', 'gemusst',
    'sollen', 'soll', 'sollte', 'sollten', 'sollst', 'gesollt',
    'wollen', 'will', 'wollte', 'wollten', 'willst', 'gewollt',
    'dürfen', 'darf', 'durfte', 'durften', 'darfst', 'dürfte', 'dürften', 'gedurft',
    'mögen', 'mag', 'mochte', 'mochten', 'magst', 'möchte', 'möchten', 'gemocht',
    // Adverbs
    'nicht', 'auch', 'nur', 'noch', 'schon', 'so', 'sehr', 'mehr', 'immer', 'hier',
    'dort', 'da', 'dann', 'wann', 'wo', 'wie', 'warum', 'weshalb', 'wieso', 'woher',
    'wohin', 'nun', 'jetzt', 'heute', 'gestern', 'morgen', 'gerade', 'gleich', 'bald',
    'oft', 'manchmal', 'nie', 'niemals', 'kaum', 'fast', 'etwa', 'ungefähr', 'vielleicht',
    'wohl', 'bestimmt', 'sicher', 'gewiss', 'natürlich', 'einfach', 'ganz', 'gar',
    'ziemlich', 'recht', 'eher', 'bereits', 'längst', 'endlich', 'zunächst', 'zuerst',
    'zuletzt', 'danach', 'davor', 'dabei', 'dazu', 'dafür', 'dagegen', 'daher', 'dahin',
    'darum', 'darauf', 'daraus', 'darin', 'davon', 'damit', 'daneben', 'darüber', 'darunter',
    'hierher', 'hierhin', 'hierbei', 'hierfür', 'hiermit', 'hierzu',
    // Other common words
    'alle', 'allem', 'allen', 'aller', 'alles', 'andere', 'anderem', 'anderen', 'anderer',
    'anderes', 'anders', 'beiden', 'beides', 'beide', 'beim', 'bereits', 'besonders',
    'bis', 'bisher', 'derselbe', 'dieselbe', 'dasselbe', 'denselben', 'demselben', 'desselben',
    'dessen', 'deren', 'derer', 'dies', 'diesseits', 'jede', 'jedem', 'jeden', 'jeder',
    'jedes', 'jedoch', 'kein', 'keine', 'keinem', 'keinen', 'keiner', 'keines',
    'viel', 'viele', 'vielem', 'vielen', 'vieler', 'vieles', 'wenig', 'wenige', 'wenigem',
    'wenigen', 'weniger', 'weniges', 'einige', 'einigem', 'einigen', 'einiger', 'einiges',
    'manche', 'manchem', 'manchen', 'mancher', 'manches', 'mehrere', 'mehreren', 'mehrerer',
    'solch', 'solche', 'solchem', 'solchen', 'solcher', 'solches',
    'etwas', 'nichts', 'alles', 'jemand', 'niemand', 'irgend', 'irgendwo', 'irgendwie',
    'irgendwann', 'irgendwas', 'irgendwer',
  ],
  
  en: [
    // Articles
    'a', 'an', 'the',
    // Pronouns
    'i', 'me', 'my', 'mine', 'myself',
    'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself',
    'we', 'us', 'our', 'ours', 'ourselves',
    'they', 'them', 'their', 'theirs', 'themselves',
    'who', 'whom', 'whose', 'which', 'what', 'that', 'this', 'these', 'those',
    'whoever', 'whomever', 'whatever', 'whichever',
    'anyone', 'anybody', 'anything', 'someone', 'somebody', 'something',
    'everyone', 'everybody', 'everything', 'no one', 'nobody', 'nothing',
    'each', 'every', 'either', 'neither', 'both', 'all', 'any', 'some', 'none',
    'one', 'ones', 'other', 'others', 'another',
    // Prepositions
    'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
    'at', 'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between',
    'beyond', 'by', 'down', 'during', 'except', 'for', 'from', 'in', 'inside',
    'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over',
    'past', 'since', 'through', 'throughout', 'till', 'to', 'toward', 'towards',
    'under', 'underneath', 'until', 'up', 'upon', 'with', 'within', 'without',
    // Conjunctions
    'and', 'but', 'or', 'nor', 'for', 'yet', 'so', 'because', 'although', 'though',
    'while', 'whereas', 'if', 'unless', 'until', 'when', 'whenever', 'where',
    'wherever', 'whether', 'as', 'than', 'once', 'since', 'before', 'after',
    // Auxiliary verbs
    'be', 'am', 'is', 'are', 'was', 'were', 'been', 'being',
    'have', 'has', 'had', 'having',
    'do', 'does', 'did', 'doing', 'done',
    'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could',
    // Common verbs
    'get', 'gets', 'got', 'getting', 'gotten',
    'make', 'makes', 'made', 'making',
    'go', 'goes', 'went', 'going', 'gone',
    'come', 'comes', 'came', 'coming',
    'take', 'takes', 'took', 'taking', 'taken',
    'see', 'sees', 'saw', 'seeing', 'seen',
    'know', 'knows', 'knew', 'knowing', 'known',
    'think', 'thinks', 'thought', 'thinking',
    'say', 'says', 'said', 'saying',
    // Adverbs
    'not', "n't", 'also', 'just', 'only', 'even', 'still', 'already', 'always',
    'never', 'ever', 'often', 'sometimes', 'usually', 'really', 'very', 'too',
    'quite', 'rather', 'almost', 'enough', 'much', 'more', 'most', 'less', 'least',
    'well', 'better', 'best', 'worse', 'worst',
    'here', 'there', 'where', 'when', 'how', 'why',
    'now', 'then', 'today', 'tomorrow', 'yesterday',
    'again', 'back', 'away', 'together', 'apart',
    // Other common words
    'such', 'same', 'different', 'own', 'else', 'whole', 'certain', 'sure',
    'able', 'unable', 'likely', 'unlikely',
    'yes', 'no', 'maybe', 'perhaps',
    'please', 'thank', 'thanks', 'sorry', 'okay', 'ok',
    'mr', 'mrs', 'ms', 'dr', 'etc', 'vs',
    // Contractions (common forms)
    "i'm", "i've", "i'll", "i'd",
    "you're", "you've", "you'll", "you'd",
    "he's", "he'll", "he'd",
    "she's", "she'll", "she'd",
    "it's", "it'll",
    "we're", "we've", "we'll", "we'd",
    "they're", "they've", "they'll", "they'd",
    "that's", "that'll", "that'd",
    "who's", "who'll", "who'd",
    "what's", "what'll",
    "there's", "there'll",
    "here's",
    "let's",
    "isn't", "aren't", "wasn't", "weren't",
    "haven't", "hasn't", "hadn't",
    "don't", "doesn't", "didn't",
    "won't", "wouldn't", "shan't", "shouldn't",
    "can't", "cannot", "couldn't",
    "mustn't", "mightn't",
    "needn't",
  ],
};

export const getStandardStopwords = (language: StopwordLanguage): string[] => {
  return standardStopwords[language] || [];
};
