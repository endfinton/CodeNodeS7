import Link from 'next/link'

export async function generateStaticParams() {
  const res = await fetch('https://web.luislluy.ovh/wp/wp-json/luisplugin/v1/titulos')
  const proyectos = await res.json()

  return proyectos.map((proyecto) => ({
    slug: proyecto.slug,
  }))
}

async function getProyecto(slug) {
  const res = await fetch('https://web.luislluy.ovh/wp/wp-json/luisplugin/v1/titulos')
  const proyectos = await res.json()
  return proyectos.find((p) => p.slug === slug)
}

export default async function ProyectoDetalle({ params }) {
  const { slug } = await params
  const proyecto = await getProyecto(slug)

  if (!proyecto) {
    return (
      <main className="container">
        <section className="hero">
          <h1>Proyecto no encontrado</h1>
          <Link href="/proyectos" className="badge">Volver a Proyectos</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="container">
      <div className="bg-gradient"></div>
      
      <article className="hero" style={{ height: 'auto', minHeight: '100vh', paddingTop: '8rem', alignItems: 'flex-start' }}>
        <div className="fade-in delay-1">
          <Link href="/proyectos" className="badge" style={{ cursor: 'pointer', marginBottom: '1rem', display: 'inline-block' }}>
            ← Volver a Proyectos
          </Link>
        </div>
        
        <h1 className="fade-in delay-2" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
          {proyecto.titulo}
        </h1>
        
        <div className="fade-in delay-2" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          {proyecto.acf && proyecto.acf['tecnologia:'] && proyecto.acf['tecnologia:'].map((tech, i) => (
            <span key={i} className="badge" style={{ color: 'var(--secondary)', borderColor: 'var(--secondary)' }}>
              {tech}
            </span>
          ))}
        </div>

        <div className="fade-in delay-3 content-area" style={{ 
          width: '100%', 
          maxWidth: '900px',
          background: 'var(--glass)',
          padding: '3rem',
          borderRadius: '30px',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(20px)',
          lineHeight: '1.8',
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.8)'
        }}>
          <div dangerouslySetInnerHTML={{ __html: proyecto.contenido }}></div>
        </div>
      </article>

    </main>
  )
}
