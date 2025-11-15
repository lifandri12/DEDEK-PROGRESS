import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Card from '../components/Common/Card'
import workoutAPI from '../utils/api'

const DEFAULT_QUOTES = [
  "Strive for progress, not perfection.",
  "The only impossible journey is the one you never begin.",
  "Your body can stand almost anything. It's your mind that you need to convince.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "You don't have to be great to start, but you have to start to be great.",
  "Sweat is just liquid awesome.",
  "The only person who can stop you is you.",
  "Push yourself, because no one else is going to do it for you.",
]

interface Quote {
  id?: string
  text: string
  created_at?: string
}

export default function Quotes() {
  const { data: session } = useSession()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)
  const [randomQuote, setRandomQuote] = useState('')
  const [newQuote, setNewQuote] = useState('')

  useEffect(() => {
    if (session) {
      fetchQuotes()
    }
  }, [session])

  useEffect(() => {
    getRandomQuote()
  }, [quotes])

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const res = await workoutAPI.get('/api/quotes')
      const fetchedQuotes = res.data || []
      setQuotes(fetchedQuotes)
      if (fetchedQuotes.length === 0) {
        // Use default quotes if no custom quotes
        setQuotes(DEFAULT_QUOTES.map(text => ({ text })))
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
      setQuotes(DEFAULT_QUOTES.map(text => ({ text })))
    } finally {
      setLoading(false)
    }
  }

  const getRandomQuote = () => {
    const allQuotes = quotes.length > 0 ? quotes : DEFAULT_QUOTES.map(text => ({ text }))
    const random = allQuotes[Math.floor(Math.random() * allQuotes.length)]
    setRandomQuote(random.text)
  }

  const handleAddQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newQuote.trim()) {
      alert('Please enter a quote')
      return
    }

    try {
      setLoading(true)
      await workoutAPI.post('/api/quotes', { text: newQuote })
      setNewQuote('')
      await fetchQuotes()
      alert('Quote added successfully!')
    } catch (error) {
      console.error('Error adding quote:', error)
      alert('Error adding quote')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote?')) return
    
    try {
      await workoutAPI.delete(`/api/quotes?id=${id}`)
      await fetchQuotes()
      alert('Quote deleted successfully!')
    } catch (error) {
      console.error('Error deleting quote:', error)
      alert('Error deleting quote')
    }
  }

  if (!session) return null

  return (
    <>
      <Head>
        <title>Motivation – Gym Progress Tracker</title>
      </Head>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Daily Motivation 🔥</h1>

        {/* Random Quote Display */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="text-center py-12">
            <p className="text-2xl italic text-white mb-6">"{randomQuote}"</p>
            <button
              onClick={getRandomQuote}
              className="bg-white hover:bg-gray-200 text-blue-600 font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              ✨ Get Another Quote
            </button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Quote Form */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Add Your Quote</h2>
            <form onSubmit={handleAddQuote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Motivational Quote <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Share your favorite motivational quote..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                {loading ? 'Adding...' : 'Add Quote'}
              </button>
            </form>
          </Card>

          {/* Quote History */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Your Collection</h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : quotes.length === 0 ? (
              <p className="text-gray-400">No custom quotes yet. Add one!</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {quotes.map((quote, index) => (
                  <div key={quote.id || index} className="bg-navy rounded-lg p-4 border border-navy-lighter">
                    <div className="flex justify-between items-start">
                      <p className="text-white text-sm italic">"{quote.text}"</p>
                      {quote.id && (
                        <button
                          onClick={() => handleDelete(quote.id!)}
                          className="text-red-400 hover:text-red-500 text-sm ml-2 flex-shrink-0"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    {quote.created_at && (
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
