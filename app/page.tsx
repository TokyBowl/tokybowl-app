"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [cuisinieres, setCuisinieres] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("cuisinieres")
        .select("*")

      if (!error && data) {
        setCuisinieres(data)
      }
    }

    fetchData()
  }, [])

  return (
    <main style={{ padding: "24px" }}>
      <h1>TokyBowl 🚀</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {cuisinieres.map((c) => (
          <div
            key={c.id}
            style={{
              backgroundColor: "#f4f0e8",
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            <h2>{c.prenom}</h2>
            <p>{c.presentation}</p>
            <p>⭐ 5 / 5</p>
          </div>
        ))}

        {cuisinieres.length === 0 && (
          <p>Aucune cuisinière trouvée</p>
        )}
      </div>
    </main>
  )
}