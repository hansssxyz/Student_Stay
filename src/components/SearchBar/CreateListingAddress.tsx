import React from "react";
import './CreateListingAddress.css';

// updated with places API
function CreateListingAddress({ address, onChange }){

    // import places autocomplete and geocoding libraries from Map Javascript API
    const {AutocompleteService} = google.maps.importLibrary("places")
    const {Geocoder} = google.maps.importLibrary("geocoding")

    // global variables to be submitted
    let selectionName = "";
    let selectionId = "";

    function handleAddressSelection(name) {
        let input = document.getElementById("searchInput") as HTMLInputElement;
        input.value = name;
        removeResults();
        console.log("Selected Address:", name); // Add this console.log statement
        onChange(name); // Call the onChange prop to update the parent component
    }

    const searchHandler = () => {
        // instantiate autocomplete and geocode functionalities
        const autocomplete = new google.maps.places.AutocompleteService();

        var testInput = document.getElementById("searchInput") as HTMLInputElement
        // retrieve search results when user inputs search term
        if(testInput.value.length!=0){
            var placeRequest = {
                input: testInput.value,
                componentRestrictions: {country: 'us'}
            };
            autocomplete.getPlacePredictions(placeRequest)
                .then((val) => {
                    removeResults();
                    let preds = val.predictions;
                    for(var i=0; i<preds.length; i++){
                        let name = preds[i]["description"];
                        let id = preds[i]["place_id"];
                        let output = document.createElement('button');
                        output.setAttribute("id", id);
                        output.setAttribute("class", "searchResult");
                        output.innerHTML = name;
                        // in the future, will have to store coordinates somewhere as well
                        output.onclick = function(){
                            let input = document.getElementById("searchInput") as HTMLInputElement;
                            const selectedAddress = output.innerHTML;
                            input.value = selectedAddress;
                            removeResults();
                            onChange(selectedAddress); // Call the onChange prop with the selected address
                        }
                        document.getElementById("searchContainer")?.appendChild(output);
                    }
                });

        }
    }

    // helper function to remove results when search term changes
    function removeResults (){
        var elems = document.getElementsByClassName("searchResult");
        while(elems.length>0){
            elems[0].parentNode?.removeChild(elems[0]);
        }
    }

    return(
        <>
            <div id = "searchContainer">
                <input type="search"
                       className="custom-border rounded-lg text-center mb-2"
                       id="searchInput"
                       required
                       placeholder="What's your address?"
                       autoComplete="off"
                       onChange = {searchHandler}/>

            </div>
        </>

    )
}

export default CreateListingAddress;