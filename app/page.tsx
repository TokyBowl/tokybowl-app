"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [cuisinieres, setCuisinieres] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("cuisinieres").select("*")
      if (data) setCuisinieres(data)
    }

    fetchData()
  }, [])

  return (
    <main style={{ padding: "24px", backgroundColor: "#0a4a24", minHeight: "100vh", color: "white" }}>
      <h1>TokyBowl 🚀</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
        {cuisinieres.map((c) => (
          <a key={c.id} href={"/cuisinieres/" + c.id} style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: "#f4f0e8", borderRadius: "16px", padding: "16px" }}>
              <h2 style={{ color: "#0a4a24", margin: 0 }}>{c.prenom}</h2>
              <p style={{ margin: "8px 0", color: "#333" }}>{c.presentation}</p>
              <p style={{ color: "#f5a623", fontWeight: "bold", margin: 0 }}>⭐ 5 / 5</p>
            </div>
          </a>
        ))}

        {cuisinieres.length === 0 && (
          <p>Aucune cuisinière trouvée pour le moment.</p>
        )}
      </div>
    </main>
  )
}