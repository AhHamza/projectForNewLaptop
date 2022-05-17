import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    setDoc,
    doc,
    query,
    where,
    updateDoc,
    deleteField,
    arrayUnion,
    arrayRemove,
    deleteDoc
} from "firebase/firestore";
import {app, db} from "./Config";

const firestoreDB = getFirestore(app);


async function addUser(user) {
     await setDoc(doc(firestoreDB, "users",user.id),user); //if user with id = user.id not found, add new user with this id
}

async function addUsersToDocuments(collectionName,docId,userCollection){
    console.log("inside "+collectionName)
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
        users:userCollection
    });
}


async function getUsers() {
    const usersCol = collection(firestoreDB, "users");
    const userSnapshot = await getDocs(usersCol);
    const userList =  userSnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
    });
    console.log(userList);
    return userList;
}

 async function getUserById(id) {
    const usersRef = collection(firestoreDB, "users");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
    });
}

async function updateUsers(tempUser) {
    try {
        console.log(tempUser);
        await setDoc(doc(db, "users", tempUser.id), tempUser); //if document with "tempDoc.id" not found add it, else update the document with this given field
    } catch (e) {
        console.error(e);
    }
}


//                    F-> for "football"
 async function updateFootball(tempDoc) {
     try {
         console.log(tempDoc);
         await setDoc(doc(db, "football", tempDoc.id), tempDoc); //if document with "tempDoc.id" not found add it, else update it
     } catch (e) {
         console.error(e);
     }

}

async function updateBasketball(tempDoc) {
    try {
        console.log(tempDoc);
        await setDoc(doc(db, "basketball", tempDoc.id), tempDoc); //if document with "tempDoc.id" not found add it, else update it
    } catch (e) {
        console.error(e);
    }

}

async function updateTennis(tempDoc) {
    try {
        console.log(tempDoc);
        await setDoc(doc(db, "tennis", tempDoc.id), tempDoc); //if document with "tempDoc.id" not found add it, else update it
    } catch (e) {
        console.error(e);
    }

}

async function deleteFStadium(docId) {
    try {
        const docRef = doc(db, "football", docId);
        await updateDoc(docRef,{
            available: deleteField(),
            date: deleteField(),
            id: deleteField(),
            name:deleteField(),
            pic:deleteField(),
            price:deleteField()
        })

        console.log("Document deleted with ID: ", docId);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}




// function subscribe(callback) {
//     const unsubscribe = onSnapshot(
//         query(collection(db, "Chats")),
//         (snapshot) => {
//             const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
//             snapshot.docChanges().forEach((change) => {
//                 if (callback) callback({ change, snapshot });
//             });
//         }
//     );
//     return unsubscribe;
// }

export {getUsers, addUser,updateUsers,updateFootball,updateBasketball,updateTennis,addUsersToDocuments};