
import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=faf076b101f735fd69e1f64c98f917c3';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'Sorry, this comics doesnt has description',
            page: comics.pageCount,
            price: (comics.prices[0].price === 0) ? 'NOT AVAILABLE' : comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',

        }

    }
    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic} 
}

export default useMarvelService;