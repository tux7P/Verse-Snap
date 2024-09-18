'use client'

import { useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'

export default function VerseSlide({ verses, metadata, slideNumber, totalSlides }) {
  const slideRef = useRef(null)

  useEffect(() => {
    if (slideRef.current) {
      html2canvas(slideRef.current, {
        scale: 2,
        width: 1280,
        height: 720,
      }).then(canvas => {
        console.log(canvas.toDataURL('image/png'))
      })
    }
  }, [verses, metadata, slideNumber])

  return (
    <div 
      ref={slideRef} 
      className="w-[1280px] h-[720px] bg-white shadow-lg p-8 relative"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {metadata.book} {metadata.chapter}:{metadata.fromVerse}-{metadata.toVerse} ({metadata.translation})
      </h2>
      <div className="flex justify-between h-[600px]">
        <div className="w-1/2 pr-4 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-red-800">[MODERATOR]</h3>
          {verses.filter((_, i) => i % 2 === 0).map((verse) => (
            <p key={verse.verse} className="mb-2">
              <span className="font-bold">{verse.verse}</span> {verse.text}
            </p>
          ))}
        </div>
        <div className="w-1/2 pl-4 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">[CONGREGATION]</h3>
          {verses.filter((_, i) => i % 2 !== 0).map((verse) => (
            <p key={verse.verse} className="mb-2">
              <span className="font-bold">{verse.verse}</span> {verse.text}
            </p>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-gray-500">
        Slide {slideNumber} of {totalSlides}
      </div>
    </div>
  )
}