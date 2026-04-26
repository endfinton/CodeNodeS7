'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://web.luislluy.ovh/wp/wp-json/luisplugin/v1/titulos')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        setProyectos(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching proyectos:', err)
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <main className="container">
      <div className="bg-gradient"></div>
      
      <section className="hero" style={{ height: 'auto', minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="fade-in delay-1">
          <Link href="/" className="badge" style={{ cursor: 'pointer', marginBottom: '1rem', display: 'inline-block' }}>
            ← Volver al inicio
          </Link>
        </div>
        
        <h1 className="fade-in delay-2" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
          Mis <span className="highlight">Proyectos</span>
        </h1>
        
        <p className="description fade-in delay-3" style={{ marginBottom: '3rem' }}>
          Lista de proyectos obtenidos directamente desde WordPress a través de un plugin personalizado.
        </p>

        <div className="fade-in delay-3" style={{ width: '100%', maxWidth: '800px' }}>
          {loading ? (
            <p style={{ color: 'var(--muted)' }}>Cargando proyectos...</p>
          ) : error ? (
            <div className="error-card">
              <span style={{ fontSize: '2rem' }}>⚠️</span>
              <h3>Error de Conexión</h3>
              <p>No se ha podido obtener la lista de proyectos en este momento. Por favor, inténtalo de nuevo más tarde.</p>
              <button onClick={() => window.location.reload()} className="cta-button" style={{ marginTop: '1.5rem', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
                Reintentar
              </button>
            </div>
          ) : proyectos.length > 0 ? (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {proyectos.map((proyecto, index) => (
                <Link key={index} href={`/proyectos/${proyecto.slug}`} className="project-card fade-in" style={{ animationDelay: `${0.1 * index}s`, display: 'block' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{proyecto.titulo}</h3>
                  <div className="highlight" style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    {proyecto.acf && proyecto.acf['tecnologia:'] 
                      ? proyecto.acf['tecnologia:'].join(', ') 
                      : 'Proyecto Finalizado'}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)' }}>No se encontraron proyectos.</p>
          )}
        </div>
      </section>

      <style jsx global>{`
        .project-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          padding: 2rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .project-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.1);
        }
        .error-card {
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 3rem;
          border-radius: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .error-card h3 {
          margin: 1rem 0 0.5rem;
          color: #ef4444;
          font-size: 1.5rem;
        }
        .error-card p {
          color: var(--muted);
          line-height: 1.5;
        }
      `}</style>
    </main>
  )
}
