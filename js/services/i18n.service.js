var gCurrLang = 'en'

var gTrans = {
    title: {
        en: 'memegen',
        he: 'מימגן',
    },
    'gallery': {
        en: 'Gallery',
        he: 'גלריה',
    },
    'search': {
        en: 'Search:',
        he: 'חיפוש',
    },
    'funny': {
        en: 'Funny',
        he: 'מצחיק',
    },
    'cats': {
        en: 'Cats',
        he: 'חתולים',
    },
    'baby': {
        en: 'Babys',
        he: 'תינוקות',
    },
    'dogs': {
        en: 'Dogs',
        he: 'כלבים',
    },
    "science": {
        en: 'Science',
        he: 'מדע',
    },
    "politics": {
        en: 'Politics',
        he: 'פוליטיקה',
    },
    "movies": {
        en: 'Movies',
        he: 'סרטים',
    },
    "animals": {
        en: 'Animals',
        he: 'חיות',
    },
    'your-saved-memes': {
        en: 'Your Saved Memes',
        he: 'הממים השמורים שלך',
    },
    'font-style': {
        en: 'Font Style: ',
        es: 'Clasificación: ',
        he: 'פונט: ',
    },
    'my-memes': {
        en: 'My Memes',
        he: 'המימז שלי',
    },
}


function setLang(lang){
    gCurrLang = lang
}
function getCurrLang(){
    return gCurrLang
}

function doTrans(){
    var dynamicTexts = document.querySelectorAll('[data-trans]')
    dynamicTexts.forEach(el =>{
        var key = el.dataset.trans
        el.innerText = gTrans[key][gCurrLang]
        if (el.placeholder){
            el.placeholder = gTrans[key][gCurrLang]
        }
    })
}

