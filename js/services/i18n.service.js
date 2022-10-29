var gCurrLang = 'en'

var gTrans = {
    title: {
        en: 'memegen',
        // es: 'Bienvenida a mi librería',
        he: 'מימגן',
    },
    'gallery': {
        en: 'Gallery',
        // es: 'precio mínimo:',
        he: 'גלריה',
    },
    'search': {
        en: 'Search:',
        // es: 'tasa mínima:',
        he: 'חיפוש',
    },
    'funny': {
        en: 'Funny',
        // es: 'cambiar presentación',
        he: 'מצחיק',
    },
    'cats': {
        en: 'Cats',
        // es: 'agregar nuevo libro',
        he: 'חתולים',
    },
    'baby': {
        en: 'Babys',
        // es: 'leer',
        he: 'תינוקות',
    },
    'dogs': {
        en: 'Dogs',
        // es: 'actualizar',
        he: 'כלבים',
    },
    "science": {
        en: 'Science',
        // es: 'título',
        he: 'מדע',
    },
    "politics": {
        en: 'Politics',
        // es: 'precio',
        he: 'פוליטיקה',
    },
    "movies": {
        en: 'Movies',
        // es: 'Comportamiento',
        he: 'סרטים',
    },
    "animals": {
        en: 'Animals',
        // es: 'Velocidad',
        he: 'חיות',
    },
    'your-saved-memes': {
        en: 'Your Saved Memes',
        // es: 'Identificación',
        he: 'הממים השמורים שלך',
    },
    'font-style': {
        en: 'Font Style: ',
        es: 'Clasificación: ',
        he: 'פונט: ',
    },
    'my-memes': {
        en: 'My Memes',
        // es: 'aceptar',
        he: 'המימז שלי',
    },
    // 'new-price': {
    //     en: 'New Price: ',
    //     es: 'nuevo precio: ',
    //     he: 'מחיר חדש: ',
    // },
    // "book-title-label": {
    //     en: 'Title: ',
    //     es: 'título: ',
    //     he: 'שם הספר: ',
    // },
    // "book-price-label": {
    //     en: 'Price: ',
    //     es: 'precio: ',
    //     he: 'מחיר: ',
    // },
    // "price-range": {
    //     en: 'Between 1 - 100: ',
    //     es: 'entre 1 - 100: ',
    //     he: 'בין 1 ל 100: ',
    // },
    // "search": {
    //     en: 'search 🔎 ',
    //     es: 'búsqueda 🔎',
    //     he: 'חפש 🔎 ',
    // },
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

