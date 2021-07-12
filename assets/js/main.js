const bookingSrcPart1 = 'https://module.lafourchette.com/',
      bookingSrcPart3 = '/module/699917-35b33',
      ctaElem = document.getElementById('booking-cta'),
      ifrElem = document.getElementById('booking-iframe');

let languages = [
        {
            id: 'pt',
            active: true,
            bookingSrc: 'pt_PT',
            translations: {
                bookingCta: 'Reservar Uma Mesa'
            }
        },
        {
            id: 'gb',
            active: false,
            bookingSrc: 'en_GB',
            translations: {
                bookingCta: 'Book a Table'
            }
        }
    ];


function toggleLang(lang) {
    let activeLangObj = languages.find(obj => {return obj.active === true}),
        newLangObj = languages.find(obj => {return obj.id === lang}),
        bookingSrcPart2 = newLangObj.bookingSrc;

    if (lang != activeLangObj.id) {
        let wasActiveElem = document.getElementById('icon-' + activeLangObj.id),
            nowActiveElem = document.getElementById('icon-' + lang);

        ctaElem.setAttribute('lang', lang);
        ctaElem.innerText = newLangObj.translations.bookingCta;
        ifrElem.src = bookingSrcPart1 + bookingSrcPart2 + bookingSrcPart3;
        wasActiveElem.classList.remove('active');
        nowActiveElem.classList.add('active');
        activeLangObj.active = false;
        newLangObj.active = true;
    }
    else {
        // do nothing;
    }
}



function toggleModal(state) {
    let e = document.getElementById('booking-modal');
    if (state === 'open') {
        e.classList.add('is-open');
    }
    else if (state === 'close') {
        e.classList.remove('is-open');
    }
}
