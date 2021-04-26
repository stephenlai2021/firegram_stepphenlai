import { useState, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import Spinner from "./spinner";
import { motion } from 'framer-motion'

const ImageGrid = ({ setSelectedImg }) => {
  const { docs, showSpin } = useFirestore("images");

  return (
    <div className="layout-spin">
      {showSpin ? (
        <Spinner />
      ) : (
        <div className="img-grid">
          {docs &&
            docs.map((doc) => (
              <motion.div
                className="img-wrap"
                key={doc.id}
                onClick={() => setSelectedImg(doc.url)}
                whileHover={{ opactiy: 1 }}
                layout
              >
                <motion.img src={doc.url} alt="uploaded pic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

// const ImageGrid = ({ docs }) => {
//   return (
//     <div className="img-grid">
//       {docs &&
//         docs.map((doc) => (
//           <div className="img-wrap" key={doc.id}>
//             <img src={doc.url} alt="uploaded pic" />
//           </div>
//         ))}
//     </div>
//   );
// };

export default ImageGrid;
