import { useState, useEffect } from "react";
import { firestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null)
  const [showSpin, setShowSpin] = useState(true)

  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
        setShowSpin(false)
      });
    
    return () => unsub()
  }, [collection]);
  
  return { docs, showSpin };
};

export default useFirestore;
