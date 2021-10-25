const containerFilmes = document.querySelector('.movies');
const input = document.querySelector('.input');
const botaoNext = document.querySelector('.btn-next');
const botaoPrev = document.querySelector('.btn-prev');
const highlightVideo = document.querySelector('.highlight__video-link');
const imgHighlightVideo = document.querySelector('.highlight__video');
const highlightTitle = document.querySelector('.highlight__title');
const highlightRating = document.querySelector('.highlight__rating');
const highlightGenres = document.querySelector('.highlight__genres');
const highlightReleaseDate = document.querySelector('.highlight__launch');
const highlightDescription = document.querySelector('.highlight__description');
const hightlightInfo = document.querySelector('.highlight__info');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalDivGenreAverage = document.querySelector('.modal__genre-average');
const modalGenres = document.querySelector('.modal__genres');
const modalAverage = document.querySelector('.modal__average');
const root = document.querySelector('body');

let arrayPagina = [];
let pagina = 0;

const temaAtual = localStorage.getItem('tema');
const btnTheme = document.querySelector('.btn-theme');
temaAtual === 'dark' ? setDark() : setLight();

btnTheme.addEventListener('click', () => {
    localStorage.getItem('tema') === 'dark' ? setLight() : setDark()
});

async function setLight() {
    localStorage.setItem('tema', 'light');

    btnTheme.src = './assets/light-mode.svg';
    botaoNext.src = './assets/seta-direita-preta.svg'
    botaoPrev.src = './assets/seta-esquerda-preta.svg'

    root.style.setProperty('--cor-de-fundo', '#FFFFFF');
    root.style.setProperty('--cor-borda-input', '#979797');
    root.style.setProperty('--cor-data-genero', 'rgba(0, 0, 0, 0.7)');
    root.style.setProperty('--cor-descricao', '#000000');
    root.style.setProperty('--cor-de-fundo-highlight', '#FFFFFF');
    root.style.setProperty('--cor-subtitle', '#000000');
    root.style.setProperty('--cor-texto-input', '#000000');
}

async function setDark() {
    localStorage.setItem('tema', 'dark');

    btnTheme.src = './assets/dark-mode.svg';
    botaoNext.src = './assets/seta-direita-branca.svg'
    botaoPrev.src = './assets/seta-esquerda-branca.svg'

    root.style.setProperty('--cor-de-fundo', '#242424');
    root.style.setProperty('--cor-borda-input', '#FFFFFF');
    root.style.setProperty('--cor-data-genero', 'rgba(255, 255, 255, 0.7)');
    root.style.setProperty('--cor-descricao', '#FFFFFF');
    root.style.setProperty('--cor-de-fundo-highlight', '#454545');
    root.style.setProperty('--cor-subtitle', '#FFFFFF');
    root.style.setProperty('--cor-texto-input', '#FFFFFF');
}

function preencherModal(parametros) {
    const genreSpans = document.querySelectorAll('.modal-genres__name');
    genreSpans.forEach(x => {
        x.remove();
    });
    modalAverage

    const id = parametros;
    const promiseModal = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`);

    promiseModal.then(function (resposta) {
        const promiseBody = resposta.json();

        promiseBody.then(function (body) {
            modalTitle.textContent = body.title;
            modalImg.src = body.backdrop_path;
            modalDescription.textContent = body.overview;

            body.genres.forEach(x => {
                const genreNames = document.createElement('span');
                genreNames.classList.add('modal-genres__name');
                genreNames.textContent = x.name;

                modalGenres.append(genreNames);
            });
            modalAverage.textContent = body.vote_average;
        });
    });
}

function promiseFilmes() {
    const promiseFilmes = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false');
    promiseFilmes.then(function (resposta) {
        containerFilmes.innerHTML = "";
        const promiseBody = resposta.json();

        promiseBody.then(function (body) {
            arrayPagina = body.results;
            exibirFilmes();
        });
    });
}

promiseFilmes()

const promiseHighlightVideo = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR');
promiseHighlightVideo.then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
        highlightVideo.href = "https://www.youtube.com/watch?v=" + body.results[0].key;
    });
})

const genres = [];

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const promiseHighlightInfo = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR');
promiseHighlightInfo.then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
        imgHighlightVideo.style.background = `linear-gradient(rgba(0, 0, 0, 0.6) 100%, rgba(0, 0, 0, 0.6) 100%), url('${body.backdrop_path}') no-repeat center / cover`;
        imgHighlightVideo.style.backgroundSize = '553px 311px';
        highlightTitle.textContent = body.title;
        highlightRating.textContent = body.vote_average;

        body.genres.forEach(x => {
            genres.push(" " + x.name);
        });
        highlightGenres.textContent = genres;

        const data = new Date(body.release_date);
        const dataFormatada = data.getDate() + " de " + meses[(data.getMonth())] + " de " + data.getFullYear();
        highlightReleaseDate.textContent = dataFormatada;

        highlightDescription.textContent = body.overview;

    });
});

function exibirFilmes() {
    for (let i = pagina; i < pagina + 5; i++) {

        const filmes = arrayPagina[i];
        const divFilme = document.createElement('div');
        divFilme.classList.add('movie');
        divFilme.style.backgroundImage = `url(${filmes.poster_path})`;
        divFilme.style.backgroundSize = '168px 301px';
        divFilme.setAttribute("id", filmes.id);

        const divFilmeInfo = document.createElement('div');
        divFilmeInfo.classList.add('movie__info');

        const tituloFilme = document.createElement('span');
        tituloFilme.classList.add('movie__title');
        tituloFilme.textContent = filmes.title;

        const avaliacaoFilme = document.createElement('span');
        avaliacaoFilme.classList.add('movie__rating');
        avaliacaoFilme.textContent = filmes.vote_average;

        const estrela = document.createElement('img');
        estrela.classList.add('estrela');
        estrela.src = './assets/estrela.svg';

        divFilmeInfo.append(tituloFilme, estrela, avaliacaoFilme);
        divFilme.append(divFilmeInfo);
        containerFilmes.append(divFilme);

        divFilme.addEventListener('click', function (event) {
            modal.classList.remove('hidden');
            modal.classList.add('show');
            preencherModal(event.target.id);
        });

        divFilmeInfo.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        modal.addEventListener('click', function () {
            modal.classList.add('hidden');
            modal.classList.remove('show');
        });

        closeModal.addEventListener('click', function () {
            modal.classList.add('hidden');
            modal.classList.remove('show');
        });

    }
}

botaoNext.addEventListener('click', function () {
    containerFilmes.innerHTML = "";
    pagina += 5;

    if (pagina > 15) {
        pagina = 0;
    }
    exibirFilmes();
});

botaoPrev.addEventListener('click', function () {
    containerFilmes.innerHTML = "";
    pagina += -5;

    if (pagina < 0) {
        pagina = 15;
    }
    exibirFilmes();
});

input.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') {
        return;
    }
    if (input.value === "") {
        promiseFilmes();
        pagina = 0;
        return;
    }
    containerFilmes.innerHTML = "";
    const query = input.value;

    const buscaPromise = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${query}`);

    buscaPromise.then(function (resposta) {
        const promiseBody = resposta.json();

        promiseBody.then(function (body) {
            arrayPagina = body.results;
            exibirFilmes();
        });
    });
    input.value = "";
});
