
import avengers from '../../../resources/img/Avengers.png';
import avengersLogo from '../../../resources/img/Avengers_logo.png';

import '../comicsHeader/comicsHeader.scss';

const ComicsHeader = () => {
    return (
        <div className='comics'>
            <img className='comics__avengers' src={avengers} alt="Avengers" />
            <div className="comics__title">
                <h2>New comics every week!</h2>
                <h2>Stay tuned!</h2>
            </div>
            <img className='comics__avengers-logo' src={avengersLogo} alt="Avengers logo" />
        </div>
    )

}

export default ComicsHeader;