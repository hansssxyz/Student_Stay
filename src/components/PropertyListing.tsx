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

interface ListingProps {
    pageId: string;
}

const PropertyListing: React.FC<ListingProps> = ({pageId}) => {
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

    getDocs(collection(db,'listings'))
    .then((querySnapshot)=>{
        querySnapshot.forEach((listing_doc)=>{
            let data=listing_doc.data();
            if(data["createdAt"]["nanoseconds"]==pageId){
                for(var i=0; i<data["imageUrls"].length; i++){
                    var str = "propertyPhoto-"+i;
                    if(document.getElementById(str)==null){
                        var img = document.createElement("img");
                        img.id = str;
                        img.src = data["imageUrls"][i];
                        img.className="object-fill h-96 w-[60rem]";
                        if(i!=0){
                            img.hidden = true;
                        }
                        document.getElementById("photoCarousel").appendChild(img);
                    }
                }

                var length = data["imageUrls"].length;
                document.getElementById("prevButton").onclick = () => {
                    for(var i=length-1; i>=0; i--){
                        if(document.getElementById("propertyPhoto-"+i).hidden==false){
                            if(i==0){
                                document.getElementById("propertyPhoto-"+i).hidden = true;
                                document.getElementById("propertyPhoto-"+(length-1)).hidden = false;
                            }else{
                                document.getElementById("propertyPhoto-"+i).hidden = true;
                                document.getElementById("propertyPhoto-"+(i-1)).hidden = false;
                                i--;
                            }
                        }
                    }
                }

                document.getElementById("nextButton").onclick = () => {
                    for(var i=0; i<length; i++){
                        if(document.getElementById("propertyPhoto-"+i).hidden==false){
                            if(i==length-1){
                                document.getElementById("propertyPhoto-"+i).hidden = true;
                                document.getElementById("propertyPhoto-"+0).hidden = false;
                            }else{
                                document.getElementById("propertyPhoto-"+i).hidden = true;
                                document.getElementById("propertyPhoto-"+(i+1)).hidden = false;
                                i++;
                            }
                        }
                    }
                }

                document.getElementById("header").innerHTML = data["type"].charAt(0).toUpperCase()+data["type"].slice(1)+" in "+data["city"];
                document.getElementById("subheading").innerHTML = "$"+data["desired_price"]+"/month | "+data["num_bedrooms"]+" bed, "+data["num_bathrooms"]+" bath";
                document.getElementById("description").innerHTML = data["description"];
                document.getElementById("address").innerHTML = data["address"];
                document.getElementById("amenities").innerHTML = "";
                for(var i=0; i<data["amenities_list"].length; i++){
                    var div = document.createElement("div");
                    div.classList.add(
                        'box-content', 'mb-1', 'py-0.5', 'px-1',
                        'border-solid', 'border-2', 'border-indigo-700', 'rounded',
                        'text-indigo-600', 'font-lato');
                    div.innerHTML=data["amenities_list"][i];
                    document.getElementById("amenities")?.appendChild(div);
                }

                document.getElementById("tags").innerHTML = "";
                for(var i=0; i<data["tags_list"].length; i++){
                    var div = document.createElement("div");
                    div.classList.add(
                        'box-content', 'mb-1', 'py-0.5', 'px-1',
                        'border-solid', 'border-2', 'border-blue-500', 'rounded',
                        'text-blue-500', 'font-lato');
                    div.innerHTML=data["tags_list"][i];
                    document.getElementById("tags")?.appendChild(div);
                }
                
                const docRef = doc(db, "user_profile", listing_doc.id);
                console.log(listing_doc.id);
                getDoc(docRef)
                .then((querySnapshot)=>{
                    let userData = querySnapshot.data();
                    var image = document.getElementById("profImage");
                    image.src = userData["profileUrls"][0];
                    var email = document.getElementById("email") as HTMLAnchorElement;
                    email.href="mailto:"+userData["email_address"];
                    email.classList.add('mb-1', 'mt-1', 'py-1', 'px-2',
                    'border-solid', 'rounded-xl',
                    'text-white', 'font-lato', 'bg-indigo-600');
                    document.getElementById("email").innerHTML = "Email "+userData["first_name"];
                    var number = document.getElementById("number") as HTMLAnchorElement;
                    number.href="sms:"+userData["phone_number"];
                    document.getElementById("number").innerHTML = "Text "+userData["first_name"];
                    document.getElementById("name").innerHTML = userData["first_name"]+" "+userData["last_name"];
                    document.getElementById("uni").innerHTML = userData["program_name"]+" at "+userData["university_name"];
                });
            }
        })
    })
    .catch((error)=>{
        ;
    })  

    return(
        <>
            <div id="outerContainer2" className="space-x-24 items-center justify-center">
                <div className="space-y-4">
                    <div id="header" className="block text-2xl text-dark-blue rounded-full font-lato font-bold"></div>
                    <div id="subheading" className="block text-2xl text-slate-500 rounded-full font-lato"></div>
                    <div id="amenities" className="flex flex-wrap space-x-2"></div>
                    <div id="tags" className="flex flex-wrap space-x-2"></div>
                    <div id="description" className="block text-l text-slate-500"> </div>
                    <div id="address" className="block text-l font-bold"></div>
                    <div id="lessor" className="space-x-10 py-6 flex">
                        <div id="info" className="flex flex-col items-center">
                            <img id="profImage" className="rounded-full w-20 h-20 mb-2"/>
                            <div id="name" className="block text-xs font-bold text-black"></div>
                            <div id="uni" className="block text-xs text-black"></div>
                        </div>
                        <div id="contact" className="flex flex-col items-center justify-center">
                            <a id="email" className="w-40 mb-1 mt-1 py-1 px-2 border-solid rounded-xl font-semibold text-white font-lato bg-indigo-600 text-center">
                            </a>
                            <a id="number" className="w-40 mb-1 mt-1 py-1 px-2 border-solid rounded-xl font-semibold text-white font-lato bg-violet-500 text-center">
                            </a>
                        </div>
                    </div>
                </div>

                <div className = "flex items-center" id = "photoAlbum">
                    <button id="prevButton"
                    className="w-4 mr-2 text-center"
                    >&lt;</button>
                    <div id = "photoCarousel" className="container mx-auto"></div>
                    <button id="nextButton"
                    className="w-4 ml-2 text-center"
                    >&gt;</button>
                </div>
            </div>
                
        </>
    );
}

export default PropertyListing;