import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap'

function NavButton() {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    };

    return(
        <div>
        <Button onClick = {handleClick}>
            Wrong Direction...Click to go back!
        </Button>
        </div>
    )
}

export default NavButton