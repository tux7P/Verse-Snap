export default function PreviewPane({ verses, currentSlide, totalSlides, onSlideChange }) {
    const slidesPerPage = 10
    const previewVerses = verses.slice(0, totalSlides * slidesPerPage)
  
    return (
      <div className="w-64 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div 
            key={index}
            className={`cursor-pointer p-2 mb-2 ${currentSlide === index ? 'bg-blue-200' : 'bg-white'}`}
            onClick={() => onSlideChange(index)}
          >
            <h3 className="font-semibold">Slide {index + 1}</h3>
            <ul className="text-sm">
              {previewVerses.slice(index * slidesPerPage, (index + 1) * slidesPerPage).map((verse) => (
                <li key={verse.verse}>{verse.verse}: {verse.text.substring(0, 20)}...</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }