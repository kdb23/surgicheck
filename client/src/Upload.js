import React, {useState, useRef} from 'react'

function Upload({id}) {

    const [document, setDocument] = useState({imageURL: ''})
    const uploadInput = useRef(null)
    const fileName = useRef(null)

    const handleDocumentUpload = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', uploadInput.current.files[0]);
        data.append('filename', fileName.current.value);
        data.append('csrf_token', '{{ csrf_token() }}');

        fetch('/uploads', {
            method: "POST",
            body: data,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            response.json().then((body) => {
                setDocument({imageURL: `/home/patient/${id}/${body.file}`})
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return(
        <form onSubmit={handleDocumentUpload}>
            <div>
                <input ref={uploadInput} type ='file' />
            </div>
            <div>
                <input ref={fileName} type='text' placeholder="Name of File" />
            </div>
            <button>Upload</button>
            <img src={document.imageURL} alt='img' />
        </form>
    )
}

export default Upload

//The data.append('csrf_token', '{{ csrf_token() }}') line is used to include the CSRF token in the request body when making a POST request to the Flask server. CSRF (Cross-Site Request Forgery) is an attack that allows an attacker to trick a user into performing actions on a website without their knowledge or consent. One way to protect against CSRF attacks is to generate a unique token for each user session, which is then included in any form submissions or AJAX requests.