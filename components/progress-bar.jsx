import { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { motion } from 'framer-motion'

const Progressbar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file)
  console.log(progress, url)

  useEffect(() => {
    // if there is a url
    if (url) {
      // set file to null to remove progressbar
      setFile(null)
    }
  }, [url], setFile)

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  )
}

export default Progressbar
