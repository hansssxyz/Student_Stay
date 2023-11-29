type Props = {
    lat: number,
    lng: number,
}

import '../styles/styles.css';
import '../styles/card.scss';
// imports from firebase
import firebaseApp from "../firebaseConfig";
import {
    getFirestore,collection,getDocs,onSnapshot,
    addDoc, setDoc, deleteDoc, doc,
    query,where,limit,
    orderBy,
    serverTimestamp,
    getDoc,updateDoc, DocumentSnapshot, snapshotEqual, QuerySnapshot,
} from 'firebase/firestore'

import {getFunctions,httpsCallable} from 'firebase/functions'

import{
    getAuth,createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged,
    confirmPasswordReset,
} from "firebase/auth"

import {getStorage,ref,uploadBytes,listAll,getDownloadURL} from "firebase/storage"


// firebase initialization. Note that we've easily imported the function which we created
 // in the function folder by saying const functionName = httpsCallable(func,"functionName") 
const app= firebaseApp;
const func=getFunctions(app);
const db=getFirestore(app);
const auth=getAuth(app);
var cur_user=auth.currentUser;
auth.onAuthStateChanged((user)=>{
    cur_user=user;
    console.log(cur_user);
}
)

function PropertyTiles(props:Props){
    const sortByDist = (a:{id:string, lat:number, lng:number}, b:{id:string, lat:number, lng:number}) => {
        // calculate the squared straight-line distance of each location from the target
        const sum1 = Math.pow((a.lat-props.lat), 2)+Math.pow((a.lng-props.lng), 2);
        const sum2 = Math.pow((b.lat-props.lat), 2)+Math.pow((b.lng-props.lng), 2);
        // compare and sort based on straight-line distance 
        if(sum1<sum2){
            return -1;
        }else if(sum1>sum2){
            return 1;
        }else{
            return 0;
        }
    }

    var coordinates:[{id: string, lat: number, lng: number}] = [];
    getDocs(collection(db,'listings'))
    .then((querySnapshot)=>{
        querySnapshot.forEach((listing_doc)=>{
            let data = listing_doc.data();
            coordinates.push({id: listing_doc.id, lat: data["location"]["latitude"], lng:data["location"]["longitude"]});
        });
        coordinates.sort(sortByDist);
        for(var i=0; i<coordinates.length; i++){
            const docRef = doc(db, "listings", coordinates[i]["id"]);
            getDoc(docRef)
            .then((querySnapshot)=>{
                let data = querySnapshot.data();
                var parent = document.createElement("div");
                if(document.getElementById(data["createdAt"]["nanoseconds"])==null){
                    parent.id = data["createdAt"]["nanoseconds"];
                    parent.className = "box-content h-50 w-72 p-4 hover:bg-indigo-100 rounded-md mb-2 mt-10 z-0";
                    parent.onclick = () => {
                        window.open("http://localhost:3000/property/"+data["createdAt"]["nanoseconds"]);
                    }
                    var image = document.createElement("img");
                    image.id = data["createdAt"]["nanoseconds"]+"-img";
                    image.src = data["imageUrls"][0];
                    image.className = "rounded-md mb-2 object-fill h-40 w-72";
                    var location = document.createElement("div");
                    location.className = "block text-dark-blue rounded-full font-lato";
                    location.innerHTML = data["type"].charAt(0).toUpperCase()+data["type"].slice(1)+` in `+data["city"];
                    var details = document.createElement("div");
                    details.innerHTML = data["num_bedrooms"]+" bedroom, "+data["num_bathrooms"]+" bath";
                    var price = document.createElement("div");
                    price.className = "font-bold";
                    price.innerHTML = "$"+data["desired_price"]+"/month";
                    parent.appendChild(image);
                    parent.appendChild(location);
                    parent.appendChild(details);
                    parent.appendChild(price);
        
                    var div = document.getElementById("start");
                    div.append(parent);
                }   
                console.log("finished");
            })
            .catch((error)=>{console.log("Error getting listing documents",error)});
        }
        
    })
    .catch((error)=>{console.log("Error getting results",error)});

    return(
        <>
            <div id="start" className="flex flex-wrap">
            </div>
        </>

    )
}

export default PropertyTiles;