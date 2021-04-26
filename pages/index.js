import { useState } from "react";
import ImageGrid from "../components/image-grid";
import Modal from "../components/modal";
import Title from "../components/title";
import UploadForm from "../components/upload-form";

// export const getStaticProps = async () => {
//   const res = await fetch(
//     "https://udemy-course-nextjs-default-rtdb.firebaseio.com/images.json"
//   );
//   const data = await res.json()
  
//   const imagesArray = []
//   for (const key in data) {
//     imagesArray.push({ ...data[key], id: key })
//   }
  
//   return {
//     props: { docs: imagesArray },
//     revalidate: 1,
//   };
// };

// const Home = ({ docs }) => {
//   console.log(docs);
//   return (
//     <div className="app">
//       <Title />
//       <UploadForm />
//       <ImageGrid docs={docs} />
//     </div>
//   );
// };

const App = () => {
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <div className="app">
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
    </div>
  );
};

export default App;
