"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [cuisinieres, setCuisinieres] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchCuisinieres() {
      const { data, error } = await supabase.from("cuisinieres").select("*")

      if (error) {
        setError(error.message)
      } else {
        setCuisinieres(data || [])
      }

      setLoading(false)
    }

    fetchCuisinieres()
  }, [])

  return (
    <main
      style={{
        padding: "24px",
        backgroundColor: "#0a4a24",
        minHeight: "100vh",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ marginTop: 0 }}>TokyBowl 🚀</h1>

      {loading && <p>Chargement...</p>}

      {error && <p style={{ color: "#ffb3b3" }}>Erreur : {error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          {cuisinieres.map((c) => (
            <a
              key={c.id}
              href={"/cuisinieres/" + c.id}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#f4f0e8",
                  borderRadius: "16px",
                  padding: "16px",
                }}
              >
                <h2
                  style={{
                    color: "#0a4a24",
                    margin: 0,
                  }}
                >
                  {c.prenom}
                </h2>

                <p
                  style={{
                    margin: "8px 0",
                    color: "#333",
                  }}
                >
                  {c.presentation}
                </p>

                <p
                  style={{
                    color: "#f5a623",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  ⭐ 5 / 5
                </p>
              </div>
            </a>
          ))}

          {cuisinieres.length === 0 && (
            <p>Aucune cuisinière trouvée pour le moment.</p>
          )}
        </div>
      )}
    </main>
  )
}