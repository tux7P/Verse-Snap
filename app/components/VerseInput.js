'use client'

import { useState } from 'react'

const books = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
  '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job',
  'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah',
  'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
  'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John',
  'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians',
  'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians',
  '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
  'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation'
]

export default function VerseInput({ onVersesGenerated }) {
  const [book, setBook] = useState('')
  const [chapter, setChapter] = useState('')
  const [fromVerse, setFromVerse] = useState('')
  const [toVerse, setToVerse] = useState('')
  const [translation, setTranslation] = useState('ESV')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!book || !chapter || !fromVerse || !toVerse) {
      alert('Please fill in all fields')
      return
    }

    try {
      const response = await fetch(`https://bible-api.com/${book}${chapter}:${fromVerse}-${toVerse}?translation=${translation}`)
      const data = await response.json()

      if (data.verses && data.verses.length > 0) {
        onVersesGenerated(data.verses, {
          book,
          chapter,
          fromVerse,
          toVerse,
          translation
        })
      } else {
        alert('Verses not found. Please check your input.')
      }
    } catch (error) {
      console.error('Error fetching verses:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select 
        value={book} 
        onChange={(e) => setBook(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a book</option>
        {books.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <input
        type="number"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
        placeholder="Chapter"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        value={fromVerse}
        onChange={(e) => setFromVerse(e.target.value)}
        placeholder="From Verse"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        value={toVerse}
        onChange={(e) => setToVerse(e.target.value)}
        placeholder="To Verse"
        className="w-full p-2 border rounded"
      />
      <select
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="ESV">English Standard Version</option>
        <option value="KJV">King James Version</option>
        <option value="WEB">World English Bible</option>
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Generate Verses
      </button>
    </form>
  )
}