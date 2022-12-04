import './appHeader.scss';
import { useState } from 'react';

const AppHeader = (props) => {

    const {isComics, setIsComics} = props;

    const onComics = () => {
        setIsComics(true)
        console.log('comics')
    }
    const onCharacters = () => {
        setIsComics(false);
        console.log('not Comics');
    }

    const style = {'color': '#9F0013'};

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#"
                onClick={onCharacters} >
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li onClick={onCharacters} style={isComics ? null : style} ><a href="#" >Characters</a></li>
                    /
                    <li onClick={onComics} style={isComics ? style : null} ><a href="#" >Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;