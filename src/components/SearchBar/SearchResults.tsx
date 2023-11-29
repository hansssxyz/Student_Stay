type Props = {
    lat: number,
    lng: number,
}

import PropertyTiles from '../PropertyTiles';
import Navbar from "../Header/HeaderUser";
import SearchBar from './SearchBar';


function SearchResults(props:Props){
    return(
        <>
            <Navbar />
            <SearchBar />
            <PropertyTiles lat={props.lat} lng={props.lng}/>
        </>
    );

}

export default SearchResults;