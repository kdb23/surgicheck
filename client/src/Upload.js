import React, {useState} from 'react';
import axios from 'axios'

function Upload({id}) {


    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    
    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
        const response = await axios.post('/uploads', formData);
        setMessage(response.data.message);
        } catch (error) {
        setMessage('Error uploading file');
        }
    };

    const handleViews = (e) => {
        e.preventDefault();
        axios.get(`/uploads/${id}`).then((response) => {
          console.log(response.data);
        });
      };

    return(
        <div>
            <h1>Upload a file</h1>
            <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            <button onClick={handleViews}>View Uploads</button>
            </form>
            <p>{message}</p>
      </div>
    )
}

export default Upload

//The data.append('csrf_token', '{{ csrf_token() }}') line is used to include the CSRF token in the request body when making a POST request to the Flask server. CSRF (Cross-Site Request Forgery) is an attack that allows an attacker to trick a user into performing actions on a website without their knowledge or consent. One way to protect against CSRF attacks is to generate a unique token for each user session, which is then included in any form submissions or AJAX requests.