
import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsPage from "../comics/comicsPage";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null);
    const [isComics, setIsComics] = useState(false);

    const onCharSelected = (id) => {
        setChar(id);
    }
    const pages = isComics ? <ComicsPage/> : <CharList/>;

    return (
        <div className="app">
            <AppHeader setIsComics={setIsComics} isComics={isComics} />
            <main>
                {pages}
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </div> */}
                
            </main>
        </div>
    )
    
}

export default App;