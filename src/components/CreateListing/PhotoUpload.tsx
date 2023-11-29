import React, { useState } from "react";
import { ref, uploadBytes, getStorage, listAll, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import classNames from "classnames";
import '../../styles/styles.css';

const PhotoUpload = ({ userEmail }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileInputChange = (e) => {
        setSelectedFiles([...selectedFiles, ...e.target.files]);
    };

    const handleUpload = async () => {
        try {
            const storage = getStorage();
            const storageFolder = ref(storage, `/listing_images/${userEmail}`);

            const picUploadPromises = selectedFiles.map((file) => {
                const fileRef = ref(storage, `/listing_images/${userEmail}/${file.name}`);
                return uploadBytes(fileRef, file);
            });

            await Promise.all(picUploadPromises);

            const response = await listAll(storageFolder);
            const downloadUrls = await Promise.all(response.items.map((item) => getDownloadURL(item)));

        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    return (
        <div>
            <label className="custom-file-button">
                Choose Files
                <input
                    className="file-input"
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                />
            </label>
            <br/>
            <button
                className={classNames('m-5 p-1 text-center bg-purple text-white rounded-lg')}
                onClick={handleUpload}>Upload Photos</button>
        </div>
    );
};

export default PhotoUpload;