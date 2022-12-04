

import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import '../comicsList/comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(123);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {getAllComics, loading, error} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
                .then(onComicsList);
    }

    const onComicsList = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setNewItemLoading(newItemLoading => false);
    }

    function renderItems (arr) {
        const items = arr.map((item, i )=> {
            return (
                <div key={i}  className="comicsList__item">
                    <img  className="comicsList__item-image" src={item.thumbnail} alt={item.title} />
                    <h2 className="comicsList__item-title">{item.title}</h2>
                    <div className="comicsList__item-price">{(item.price === 'NOT AVAILABLE') ? item.price : `${item.price} $`}</div>
                </div>

            )
        })
        return items;
    }

    const items = renderItems(comicsList);
    const load = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comicsList">
            {load}
            {errorMessage}
            <div className="comicsList__grid">
                {items}
            </div>
            <button 
                    className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    >
                <div className="inner" >load more</div>
            </button>
        </div>
    )
}

export default ComicsList;