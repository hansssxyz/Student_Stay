import React, { useState } from "react";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import "../styles/card.scss";

interface Listing {
    "Property ID": string | null;
    "Photo File Name": string | null;
    "Rent Estimate (Zillow)": string | null;
    "Bedrooms": number | null;
    "Bathrooms": number | null;
    "Square Feet": number | null;
    "Property Type": string | null;
    "Neighborhood": string | null;
    "Price": string | null;
}

interface CardProps {
    listing: Listing;
}

const Card: React.FC<CardProps> = ({ listing }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [ID, setID] = useState<string | null>(null);

    const handleClick = () => {
        setID(listing["Property ID"]);
        setShowDetails(true);
    };

    return (
        <>
            <div className="listing-card" onClick={handleClick}>
                <div className="card-image">
                    {listing["Photo File Name"] ? (
                        <img
                            src={`${process.env.PUBLIC_URL}/img/${listing["Photo File Name"]}.jpg`}
                            alt={listing["Photo File Name"]}
                        />
                    ) : (
                        <div className="placeholder-image">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Placeholder"
                            />
                        </div>
                    )}
                </div>
                <div className="card-details">
                    <div className="description">
                        {listing["Property Type"] && listing["Neighborhood"] ? (
                            <><strong>
                                {listing["Property Type"]} in {listing["Neighborhood"]}
                            </strong></>
                        ) : (
                            "N/A"
                        )}
                    </div>
                    <div className="bedrooms">

                        <span>{listing["Bedrooms"] || "N/A"} bed</span>
                    </div>
                    <div className="bathrooms">

                        <span>{listing["Bathrooms"] || "N/A"} bath</span>
                    </div>
                    <div className="price">
                        <span><strong>{listing["Price"] || "N/A"}</strong></span>
                    </div>
                </div>
            </div>
        </>
    );
};

const exampleListing: Listing = {
    "Property ID": "123",
    "Photo File Name": null,
    "Rent Estimate (Zillow)": "$2700",
    "Bedrooms": 1,
    "Bathrooms": 2,
    "Square Feet": 1000,
    "Property Type": "Room",
    "Neighborhood": "Upper West Side",
    "Price": "$2700/month",
};

const ExampleComponent: React.FC = () => {
    return <Card listing={exampleListing} />;
};

export default ExampleComponent;
