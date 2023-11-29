import React, {useEffect, useState} from 'react';
import '../../styles/styles.css';
import classNames from 'classnames';

const TagsAndAmenities = ({ handleUpdateFormData }) => {
    const [formData, setFormData] = useState({
        amenities_list: [],
        tags_list: [],
    });

    const [customTag, setCustomTag] = useState('');
    const [customTags, setCustomTags] = useState([]);

    const amenitiesList = [
        'private entrance',
        'private bathroom',
        'elevator',
        'doorman',
        'laundry in unit',
        'laundry in building',
        'dishwasher',
        'private outdoor space',
        'shared outdoor space',
        'central air',
        'furnished',
        'bicycle storage',
        'gym',
        'utilities included',
        'wifi',
        'parking available',
        'pets allowed',
        'pool',
    ];

    const tagsList = [
        'close to campus',
        'family friendly',
        'green building',
        'social common areas',
        'student-heavy building',
        'peaceful',
        'unique',
        'stylish',
        'functional',
        'central',
        'spacious'
    ];

    const handleAmenitiesChange = (amenity) => {
        setFormData((prevData) => {
            const isAmenitySelected = prevData.amenities_list.includes(amenity);
            const updatedAmenities = isAmenitySelected
                ? prevData.amenities_list.filter((item) => item !== amenity)
                : [...prevData.amenities_list, amenity];

            return {
                ...prevData,
                amenities_list: updatedAmenities,
            };
        });
        handleUpdateFormData(formData);

    };

    const handleTagsChange = (tag) => {
        setFormData((prevData) => ({
            ...prevData,
            tags_list: prevData.tags_list.includes(tag)
                ? prevData.tags_list.filter((item) => item !== tag)
                : [...prevData.tags_list, tag],
        }));
        handleUpdateFormData(formData);
    };

    const handleCustomTagAdd = () => {
        if (customTag.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                tags_list: [...prevData.tags_list, customTag],
            }));
            setCustomTags([...customTags, customTag]);
            setCustomTag('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCustomTagAdd();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        handleUpdateFormData(formData);
    }, [formData]);


    return (
        <section className="upload_listings">
            <div className="listing_submission">
                <div className="mt-8">
                    <h1
                        className="text-3xl block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4 py-1 px-2"
                        style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                    >
                        Amenities and Tags
                    </h1>
                </div>

                <div className="mt-8">
                    <h2
                        className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4 py-1 px-2"
                        style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                    >
                        Select some amenities:
                    </h2>
                </div>

                <div className="amenities_group">

                    <div className="grid grid-cols-2 sm: grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
                        {amenitiesList.map((amenity) => (
                            <button
                                key={amenity}
                                className={classNames('border-solid border-purple/75 p-2 rounded-lg mr-2 mb-2', {
                                    'border-none bg-purple/50 text-black focus:bg-purple/75': formData.amenities_list.includes(amenity),
                                })}
                                onClick={() => handleAmenitiesChange(amenity)}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-8">
                    <h2
                        className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4 py-1 px-2"
                        style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                    >
                        Select some tags:
                    </h2>
                </div>
                <div className="listing_tags">
                    <div className="grid grid-cols-2 sm: grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
                        {tagsList.map((tag) => (
                            <button
                                key={tag}
                                className={classNames('border-solid border-purple/75 p-2 rounded-lg mr-2 mb-2', {
                                    'border-none bg-purple/50 text-black focus:bg-purple/75': formData.tags_list.includes(tag),
                                })}
                                onClick={() => handleTagsChange(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-8">
                    <h2
                        className="text-xl block text-dark-blue font-josefin-sans leading-10 tracking-wide mr-4 py-1 px-2"
                        style={{ fontFamily: "Josefin Sans", letterSpacing: "-0.04219rem" }}
                    >
                        Custom Tags:
                    </h2>
                </div>
                <div className="custom-tags">
                    {customTags.map((tag) => (
                        <button
                            key={tag}
                            className="border-solid border-purple/75 p-2 rounded-lg mr-2 mb-2"
                            onClick={() => handleTagsChange(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <div className="custom-tag-input">
                    <input
                        type="text"
                        placeholder="Add your own tag"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="border-solid border-purple/75 p-2 rounded-lg ml-2 mb-2"
                        onClick={handleCustomTagAdd}
                    >
                        +
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TagsAndAmenities;