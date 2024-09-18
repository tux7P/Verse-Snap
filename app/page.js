'use client'

import { useState } from 'react'
import VerseInput from './components/VerseInput'
import VerseSlide from './components/VerseSlide'
import PreviewPane from './components/PreviewPane'

export default function Home() {
  const [verses, setVerses] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [metadata, setMetadata] = useState({})

  const handleVersesGenerated = (newVerses, newMetadata) => {
    setVerses(newVerses)
    setMetadata(newMetadata)
    setCurrentSlide(0)
  }

  const slidesPerPage = 10
  const totalSlides = Math.ceil(verses.length / slidesPerPage)

  return (
    <div className="flex h-screen bg-gray-100">
      <PreviewPane 
        verses={verses} 
        currentSlide={currentSlide} 
        totalSlides={totalSlides} 
        onSlideChange={setCurrentSlide}
      />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Bible Verse Slide Generator</h1>
        <VerseInput onVersesGenerated={handleVersesGenerated} />
        {verses.length > 0 && (
          <VerseSlide 
            verses={verses.slice(currentSlide * slidesPerPage, (currentSlide + 1) * slidesPerPage)} 
            metadata={metadata}
            slideNumber={currentSlide + 1}
            totalSlides={totalSlides}
          />
        )}
      </div>
    </div>
  )
}