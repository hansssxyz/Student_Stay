import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import './SearchBar.css';
import DatePicker, { DateObject, getAllDatesInRange } from 'react-multi-date-picker';
import type{Value} from 'react-multi-date-picker';
import Button from '../Button';
import LocationSearch from './LocationSearch';
import SearchResults from "./SearchResults";
import PropertyTiles from "../PropertyTiles";

type PriceRange = {
    startPrice: number,
    endPrice: number,
}

interface SearchInputs {
    numGuests: number,
    prices: PriceRange,
}

// dates aren't working/showing up invalid; need to fix
function SearchBar(){
    const geocoder = new google.maps.Geocoder();
    const { register, handleSubmit, getValues} = useForm<SearchInputs>()

    const [value, setValue] = useState<Value>(new Date());
    const today = new Date();
    const[results, setResults] = useState(<></>);

    // to replace with results/listings page
    const onSubmit: SubmitHandler<SearchInputs> = (data) => {
      setResults(<></>);
      const str:string = [value, setValue].toString();
      const firstDate = new Date (str.substring(0, 8));
      const secondDate = new Date (str.substring(9, 17));
      const location = document.getElementById("searchInput") as HTMLInputElement ;
      var code;

      var geocodeRequest = {
        address: location.value
      }
      geocoder.geocode(geocodeRequest)
      .then((val) => {
        code = val.results[0].geometry.location;

        // logs data that would be sent to database
        /*console.log(data.numGuests);
        console.log(data.prices);
        console.log(firstDate);
        console.log(secondDate);
        console.log(location.value);*/

        setResults(
        <>
          <PropertyTiles lat={code.lat()} lng={code.lng()}/>
        </>
        );

        console.log(code.lat(), code.lng());

      });

    }

    return (
      <>
        <div id = "searchBarouterContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id = "searchBarinnerContainer">
            <div className = "searchBarinputHeader">Location</div>
              <LocationSearch/> 
            </div>

            <div id = "searchBarinnerContainer">
                <div className = "searchBarinputHeader">Dates</div>
                <DatePicker
                inputClass="date-input"
                format="MM/DD/YY"
                value={value}
                onChange={setValue}
                minDate={today}
                range
                rangeHover/>
            </div>

            <div id = "searchBarinnerContainer">
              <div className = "searchBarinputHeader"> # of guests </div>
              <input type="number" 
              autoComplete="off"
              min={1}
              required
              {...register("numGuests", {
                required: true,
                min:1,
              })} style={{width: "50px"}}/>
            </div>
            
            <div id = "searchBarinnerContainer">
              <div className="searchBarinputHeader"> Price/month
                <div className = "searchBarinputValue">
                  $<input type="number" 
                  min={0} 
                  id="priceLow"
                  autoComplete="off"
                  required
                    {...register("prices.startPrice", {
                      required: true,
                      min: 0,
                    })} /> 
                  to &nbsp; 
                  $<input type="number" 
                  min={getValues("prices.startPrice")}
                  id="priceHigh"
                  autoComplete="off"
                  required
                    {...register("prices.endPrice", {
                    required: true,
                    min: 0,
                    validate: (v) => getValues("prices.startPrice")<v
                  })} />
                </div>
              </div>
            </div>

            <Button onClick={onSubmit}
                variant="purple"
                size="sm"
                style={{ width: '10rem' }}
            >Search</Button>
          </form>
        </div>
        {results}
      </>
    );
}

export default SearchBar;