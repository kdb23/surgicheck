import React, {useState} from 'react';
import axios from 'axios'

function Upload({id}) {


    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(null);
    const [message, setMessage] = useState(null);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    };
  
    const handleUpload = (e) => {
      e.preventDefault();
      if (!file) {
        setMessage('No file selected');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      axios
        .post('/uploads', formData)
        .then((response) => {
          setMessage(response.data.message);
          setFilename(response.data.filename);
        })
        .catch((error) => {
          console.log(error);
          setMessage('File upload failed');
        });
    };
  
    const handleViews = (e) => {
      e.preventDefault();
      axios.get(`/uploads/${id}`).then((response) => {
        console.log(response.data);
      });
    };

    return(
        <div>
            <h6>Upload a file</h6>
            <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            <img src={`/uploads/${filename}`} style={{width: '64px'}} />
            <button onClick={handleViews}>View Uploads</button>
            </form>
            <p>{message}</p>
      </div>
    )
}

export default Upload

//The data.append('csrf_token', '{{ csrf_token() }}') line is used to include the CSRF token in the request body when making a POST request to the Flask server. CSRF (Cross-Site Request Forgery) is an attack that allows an attacker to trick a user into performing actions on a website without their knowledge or consent. One way to protect against CSRF attacks is to generate a unique token for each user session, which is then included in any form submissions or AJAX requests.