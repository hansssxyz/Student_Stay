import React, {useEffect, useState} from 'react';
import TagsAndAmenities from './TagsAndAmenities';
import '../../styles/styles.css';
import classNames from 'classnames';
import CreateListingAddress from '../SearchBar/CreateListingAddress';

const ListingFormData = ({ handleUpdateFormData, handleAddressSubmit }) => {
    const [listingType, setListingType] = useState('');
    const [address, setAddress] = useState('');
    const [addressConfirmed, setAddressConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        type: '',
        num_guests: 1,
        num_bedrooms: 1,
        num_bathrooms: 1,
        desired_price: 0,
        availability_periods: [],
        amenities_list: [],
        tags_list: [],
        description: '',
        terms: false,
        address: '',
    });



    const removeAvailabilityPeriod = (index) => {
        setFormData((prevData) => {
            const newAvailabilityPeriods = [...prevData.availability_periods];
            newAvailabilityPeriods.splice(index, 1);
            return {
                ...prevData,
                availability_periods: newAvailabilityPeriods,
            };
        });
    };

    const addAvailabilityPeriod = () => {
        setFormData((prevData) => ({
            ...prevData,
            availability_periods: [
                ...prevData.availability_periods,
                { from: '', to: '' },
            ],
        }));
    };

    if (formData.availability_periods.length === 0) {
        addAvailabilityPeriod();
    }

    const handleTypeChange = (type) => {
        setListingType(type);
        setFormData((prevData) => ({
            ...prevData,
            type: type,
        }));
        handleUpdateFormData({
            type: type,
        });
    };

    const handleDescChange = (description) => {
        setFormData((prevData) => ({
            ...prevData,
            description: description,
        }));
        handleUpdateFormData({
            description: description,
        });
    };


    const handleGuestsChange = (num_guests) =>{
        setFormData((prevData) => ({
            ...prevData,
            num_guests: num_guests,
        }));
        handleUpdateFormData({
            num_guests: num_guests,
        });
    };
    const handleBedroomsChange = (num_bedrooms) => {
        setFormData((prevData) => ({
            ...prevData,
            num_bedrooms: num_bedrooms,
        }));
        handleUpdateFormData({
            num_bedrooms: num_bedrooms,
        });
    };

    const handleBathroomsChange = (num_bathrooms) => {
        setFormData((prevData) => ({
            ...prevData,
            num_bathrooms: num_bathrooms,
        }));
        handleUpdateFormData({
            num_bathrooms: num_bathrooms,
        });
    };


    const handlePriceChange = (desired_price) => {
        setFormData((prevData) => ({
            ...prevData,
            desired_price: desired_price,
        }));
        handleUpdateFormData({
            desired_price: desired_price,
        });
    };

    const handleAvailabilityPeriodChange = (index, field, date) => {
        setFormData((prevData) => {
            const newAvailabilityPeriods = [...prevData.availability_periods];
            newAvailabilityPeriods[index][field] = date;
            const updatedFormData = {
                ...prevData,
                availability_periods: newAvailabilityPeriods,
            };
            handleUpdateFormData(updatedFormData);
            return updatedFormData;
        });
    };

    const handleAddressChange = (selectedAddress) => {
        console.log("handleAddressChange called with:", selectedAddress);
        setAddress(selectedAddress);
        handleUpdateFormData({ address: selectedAddress });
    };

    useEffect(() => {
        console.log("useEffect triggered with address:", formData.address);
        handleAddressSubmit(formData.address);
    }, [formData.address]);






    const isTypeSelected = (type) => formData.type === type;


    const [submissionError, setSubmissionError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <section className="upload_listings">
            <form className="listing_submission" onSubmit={handleSubmit}>

                <div className="p-8 listing-section rounded-lg bg-light-blue/10 shadow-md m-20">
                    <div className="mt-8 ">
                        <h1
                            className="text-3xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            Basic Info
                        </h1>
                    </div>

                    <div className="mt-8">
                        <h2
                            className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            What's the address to your place?
                        </h2>
                    </div>


                    <div className="flex justify-center mt-8 text-center mt-8 block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2">
                        <CreateListingAddress
                            address={address}
                            onChange={handleAddressChange}

                        />

                        <br/>


                    </div>

                    <div className="mt-8">
                        <h2
                            className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            What type of place are you subleasing?
                        </h2>
                    </div>

                    <div>
                        <button
                            className={classNames('text-center border-solid border-purple/75 p-2 rounded-lg text-lg', {
                                'border-none bg-purple/50 text-black focus:bg-purple/75': isTypeSelected('room'),
                            })}
                            onClick={() => handleTypeChange('room')}
                            style={{ width: '100px', margin:'8px', }}
                        >
                            Room
                        </button>
                        <button
                            className={classNames('text-center border-solid border-purple/75 p-2 rounded-lg text-lg', {
                                'border-none bg-purple/50 text-black focus:bg-purple/75': isTypeSelected('entire apartment'),
                            })}
                            onClick={() => handleTypeChange('entire apartment')}
                            style={{ width: '100px', margin:'8px',}}
                        >
                            Entire Apartment
                        </button>
                        <button
                            className={classNames('text-center border-solid border-purple/75 p-2 rounded-lg text-lg', {
                                'border-none bg-purple/50 text-black focus:bg-purple/75': isTypeSelected('house'),
                            })}
                            onClick={() => handleTypeChange('house')}
                            style={{ width: '100px', margin:'8px', }}
                        >
                            House
                        </button>
                    </div>


                    <div className="mt-8">
                        <h2
                            className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            Enter some info about your place:
                        </h2>
                    </div>

                    <div className="mt-2 grid grid-cols-2">
                        <div className="grid grid-rows-3">
                            <label htmlFor="num_guests">Number of guests allowed:</label>
                            <label htmlFor="num_bedrooms">Number of bedrooms:</label>
                            <label htmlFor="num_bathrooms">Number of bathrooms:</label>
                        </div>
                        <div className="grid grid-rows-3">
                            <input
                                className="custom-border rounded-lg text-center mb-2 w-1/6"
                                type="number"
                                id="num_guests"
                                value={formData.num_guests}
                                onInput={(e) => handleGuestsChange(e.target.value)}
                            />
                            <input
                                type="number"
                                className="custom-border rounded-lg text-center mb-2 w-1/6"
                                id="num_bedrooms"
                                value={formData.num_bedrooms}
                                onInput={(e) => handleBedroomsChange(e.target.value)}
                            />
                            <input
                                type="number"
                                id="num_bathrooms"
                                className="custom-border rounded-lg text-center w-1/6"
                                value={formData.num_bathrooms}
                                onInput={(e) => handleBathroomsChange(e.target.value)}
                            />
                        </div>
                    </div>

                </div>

                <div className="p-8 listing-section rounded-lg bg-light-blue/10 shadow-md m-20">

                    <div className="mt-8">
                        <h1
                            className="text-3xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            Price and Availability
                        </h1>
                    </div>
                    <div className="mt-8">
                        <h2
                            className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            What price are you listing it for?
                        </h2>
                    </div>

                    <label htmlFor="desired_price">Desired Price per night ($):</label>
                    <input
                        type="number"
                        id="desired_price"
                        className="custom-border rounded-lg text-center mb-2 w-1/6"
                        value={formData.desired_price}
                        onInput={(e) => handlePriceChange(e.target.value)}

                    />

                    <div className="mt-8">
                        <h2
                            className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            When is your place available?
                        </h2>
                    </div>


                    {formData.availability_periods.map((period, index) => (
                        <div key={index} className="availability-period-container mb-4">
                            <label htmlFor={`from_date_${index}`}>From Date:</label>
                            <input
                                type="date"
                                id={`from_date_${index}`}
                                className="custom-border rounded-lg text-center"

                                value={period.from}
                                onChange={(e) =>
                                    handleAvailabilityPeriodChange(index, "from", e.target.value)
                                }
                            />
                            <label htmlFor={`to_date_${index}`}>To Date:</label>
                            <input
                                type="date"
                                id={`to_date_${index}`}
                                className="custom-border rounded-lg text-center"

                                value={period.to}
                                onChange={(e) =>
                                    handleAvailabilityPeriodChange(index, "to", e.target.value)
                                }
                            />
                            {formData.availability_periods.length > 1 && (
                                <button
                                    className={classNames('m-5 text-center bg-purple text-white rounded-lg p-0')}
                                    type="button"
                                    onClick={() => removeAvailabilityPeriod(index)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        className={classNames('m-5 text-center bg-purple text-white rounded-lg p-0')}
                        type="button"
                        onClick={addAvailabilityPeriod}>
                        Add Availability Period
                    </button>

                </div>

                <div className="p-8 listing-section rounded-lg bg-light-blue/10 shadow-md m-20">

                    <TagsAndAmenities handleUpdateFormData={handleUpdateFormData} />
                </div>

                <div className="p-8 listing-section rounded-lg bg-light-blue/10 shadow-md m-20">

                    <div className="mt-8">
                        <h1
                            className="text-3xl block text-dark-blue font-josefin-sans leading-10 tracking-wide py-1 px-2"
                            style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                        >
                            Describe Your Listing
                        </h1>
                    </div>


                    <textarea
                        className="w-5/6 p-2 border border-purple rounded-lg resize-y"
                        name="listing_description"
                        placeholder="Description of your listing..."
                        value={formData.description}
                        onChange={(e) => handleDescChange(e.target.value)}
                    />

                    <p className="listing_submission_error">{submissionError}</p>

                </div>

            </form>
        </section>
    );
};

export default ListingFormData;