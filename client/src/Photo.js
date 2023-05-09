import React, {useState} from 'react';

function Photo() {
    const [photo, setPhoto] = useState(null)

    const handleUpload = (e) => {
        const file = e.target.file[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result)
        };

        reader.readAsDataURL(file);
    };
    
    return (
        <div>
            <h1>Photo Here</h1>
        </div>
    )
}

export default Photo