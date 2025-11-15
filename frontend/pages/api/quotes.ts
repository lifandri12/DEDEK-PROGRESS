import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { supabase } from '../../utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const userId = session.user?.email!

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const { text } = req.body

      const { data, error } = await supabase
        .from('quotes')
        .insert({
          user_id: userId,
          text,
          created_at: new Date(),
        })
        .select()

      if (error) throw error
      return res.status(201).json(data)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)

      if (error) throw error
      return res.status(200).json({ message: 'Quote deleted' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
