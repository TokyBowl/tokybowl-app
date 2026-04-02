'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CuisinerePage() {
  const { id } = useParams()
  const [cuisiniere, setCuisiniere] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('cuisinieres')
        .select('*')
        .eq('id', id)
        .single()
      setCuisiniere(data)
    }
    fetchData()
  }, [id])

  if (!cuisiniere) return <p style={{ padding: '20px' }}>Chargement...</p>

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f0e8', minHeight: '100vh' }}>
      <h1 style={{ color: '#0a4a24' }}>{cuisiniere.prenom}</h1>
      <img src={cuisiniere.photo_url} alt={cuisiniere.prenom} style={{ width: '200px', borderRadius: '12px' }} />
      <p style={{ marginTop: '12px' }}>{cuisiniere.bio}</p>
      <p style={{ color: '#f5a623', fontWeight: 'bold' }}>⭐ {cuisiniere.note} / 5</p>
    </main>
  )
}