import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle file upload
    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setUploadStatus('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile); // 'photo' should match the key in the Node.js multer middleware

        try {
            const response = await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus(`File uploaded successfully: ${response.data.file.filename}`);
        } catch (error) {
            setUploadStatus('Error uploading file.');
            console.error('Upload error:', error);
        }
    };

    return (
        <div>
            <h1>Upload a Photo</h1>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default FileUpload;
