import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import '../comicsList/comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(232);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, loading, error} = useMarvelService();
    const {changeId} = props;

    useEffect(() => {
        console.log('build')
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        console.log('request')
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
                .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setOffset(offset + 8);
        setNewItemLoading(false);
        setComicsEnded(ended);
    }

    function renderItems (arr) {
        const items = arr.map((item, i )=> {
            return (
                <Link to={`/comics/${item.id}`} key={i} className="comicsList__item" onClick={() => changeId(item.id)}>
                    <img  className="comicsList__item-image" src={item.thumbnail} alt={item.title} />
                    <h2 className="comicsList__item-title">{item.title}</h2>
                    <div className="comicsList__item-price">{(item.price === 'NOT AVAILABLE') ? item.price : `${item.price} $`}</div>
                </Link>

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