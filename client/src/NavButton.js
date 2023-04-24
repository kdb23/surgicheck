import React from 'react';
import {useHistory} from 'react-router-dom';


function NavButton() {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    };

    return(
        <div>
        <button onClick = {handleClick}>
            Whoops - Wrong Direction...Back I Go!
        </button>
        </div>
    )
}

export default NavButton