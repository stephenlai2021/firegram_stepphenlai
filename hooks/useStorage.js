import { useState, useEffect } from 'react'
import { storage, firestore, timestamp } from '../firebase/config'

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)
  
  useEffect(() => {
    // references
    const storageRef = storage.ref('/firegram' + file.name)
    const collectionRef = firestore.collection('images')

    // upload selected file to firebase storage
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100

      setProgress(percentage)
    }, err => {
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL();

      // save image (url, createdAt) properties to firestore
      collectionRef.add({ url, createdAt: timestamp() });
      setUrl(url);

      // save image (url, createdAt) properties to realtime database
      fetch(
        "https://udemy-course-nextjs-default-rtdb.firebaseio.com/images.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, createdAt: timestamp() }),
        }
      );
    })
  }, [file])

  return { progress, url, error }
}

export default useStorage