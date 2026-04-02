'use client'
import { supabase } from "../lib/supabase"
import { useEffect, useState } from "react"

export default function Home() {
  const [cuisinieres, setCuisinieres] = useState([])

  useEffect(() => {
    supabase.from("cuisinieres").select("*").then(({ data }) => {
      if (data) setCuisinieres(data)
    })
  }, [])

  return (
    <main style={{ backgroundColor: "#0a4a24", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div
        style={{
          backgroundColor: "#0a4a24",
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <button
          style={{
            backgroundColor: "#f5a623",
            color: "#0a4a24",
            border: "none",
            borderRadius: "20px",
            padding: "8px 20px",
          }}
        >
          Près de moi
        </button>

        <button
          style={{
            backgroundColor: "transparent",
            color: "#f4f0e8",
            border: "2px solid #f4f0e8",
            borderRadius: "20px",
            padding: "8px 20px",
          }}
        >
          Toutes
        </button>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {cuisinieres.map((c) => (
          <a key={c.id} href={"/cuisinieres/" + c.id} style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: "#f4f0e8", borderRadius: "16px", padding: "16px" }}>
              <h2 style={{ color: "#0a4a24", margin: "0 0 8px" }}>{c.prenom}</h2>
              <p style={{ margin: "0 0 8px", color: "#333" }}>{c.presentation}</p>
              <p style={{ color: "#f5a623", fontWeight: "bold", margin: 0 }}>⭐ 5 / 5</p>
             </div>
          </a>
        ))}
      </div>
    </main>
  )
}