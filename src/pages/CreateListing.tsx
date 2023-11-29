import React, {useEffect, useState} from "react";
import Button from "../components/Button";
import { getFirestore, doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import firebaseApp from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useFirestore, useStorage } from "reactfire";
import ListingFormData from "../components/CreateListing/ListingFormData";
import axios from "axios";
import {getFunctions,httpsCallable} from 'firebase/functions'

const CreateListing = () => {
    const [formData, setFormData] = useState({
        type: "",
    });

    const [listingError, setListingError] = useState("");


    const app = firebaseApp;
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const userEmail = user ? user.email : "";
    const func=getFunctions(app)
    const geocode= httpsCallable(func,"geocode")

    const storage = getStorage(app);

    const handleUpdateFormData = (newData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    const handleAddressSubmit = (address) => {
        console.log("submitting:", address);
        // geocode({address:address, email: userEmail})
        //     .then ((result)=>{
        //         console.log(result);
        //     })
    };

    useEffect(() => {
        console.log("formData changed:", formData);
    }, [formData, handleUpdateFormData]);


    const handleFinalSubmit = async () => {
        try {
            const colRef_listing = collection(firestore, "listings");

            const formDataToSave = {
                address: formData.address,
                type: formData.type,
                num_guests: formData.num_guests,
                num_bedrooms: formData.num_bedrooms,
                num_bathrooms: formData.num_bathrooms,
                desired_price: formData.desired_price,
                amenities_list: formData.amenities_list,
                tags_list: formData.tags_list,
                description: formData.description,
                createdAt: serverTimestamp(),
            };

            // Image Upload and Storage Logic
            const storage_folder = ref(storage, `/listing_images/${userEmail}`);
            const picList = document.getElementById('listing_file_input').files;
            let picUploadPromises = [];

            for (let i = 0; i < picList.length; i++) {
                const thisPic = picList[i];
                const fileRef = ref(storage, `/listing_images/${userEmail}/${thisPic.name}`);
                const uploadTask = uploadBytes(fileRef, thisPic);
                picUploadPromises.push(uploadTask);
            }

            Promise.all(picUploadPromises)
                .then(() => listAll(storage_folder))
                .then((response) => {
                    let downloadUrlPromises = response.items.map((item) => getDownloadURL(item));
                    return Promise.all(downloadUrlPromises);
                })
                .then((downloadUrls) => {
                    // Save the data to Firebase Firestore
                    const listingDocRef = doc(colRef_listing, userEmail);
                    return setDoc(listingDocRef, {
                        ...formDataToSave, // Add the rest of the form data
                        imageUrls: downloadUrls,
                    });
                })
                .then(() => {
                    // reset form and display message of success or failure
                    listing_form.reset();
                    setListingError('Listing uploaded successfully!');
                })
                .catch((error) => {
                    setListingError('Error uploading the listing\n' + error.message);
                });
        } catch (error) {
            console.error("Error saving listing data:", error);
        }
    };



    return (
        <div className="App bg-white">
            <div className="flex justify-center mt-5 text-dark-blue text-4xl"> Create a listing </div>

            <ListingFormData formData={formData} handleUpdateFormData={handleUpdateFormData} handleAddressSubmit={handleAddressSubmit} />

            <div className="p-8 listing-section rounded-lg bg-light-blue/10 shadow-md m-20">
                <div className="mt-8">
                    <h1
                        className="text-3xl block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4 py-1 px-2"
                        style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                    >
                        Add Photos
                    </h1>
                </div>

                <p>To upload multiple images, press shift while selecting</p>
                <input type="file" id="listing_file_input" multiple/>

            </div>

            <div className="flex justify-center mt-5">
                <Button onClick={handleFinalSubmit} variant="purple" size="lg">
                    Submit Listing
                </Button>
            </div>
        </div>
    );
};

export default CreateListing;