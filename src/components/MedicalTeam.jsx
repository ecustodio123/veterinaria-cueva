import { useId } from 'react'
import { Stethoscope } from 'lucide-react'
import './MedicalTeam.css'

export default function MedicalTeam({
  members = [],
  eyebrow = 'Nuestro staff médico',
  title = 'Personas que cuidan de quien más quieres.',
  description = 'Detrás del cuidado hay personas. Un espacio para conocer al equipo de Veterinaria Cueva.',
}) {
  const headingId = useId()
  if (!members.length) return null

  return (
    <section className="medical-team" aria-labelledby={headingId}>
      <div className="medical-team__heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId}>{title}</h2>
        </div>
        <div className="medical-team__intro">
          <p>{description}</p>
          {members.some(member => member.placeholder) && (
            <span className="medical-team__notice">Perfiles de muestra · datos por completar</span>
          )}
        </div>
      </div>
      <div className="medical-team__grid">
        {members.map(member => (
          <article className="medical-team__card" key={member.id}>
            <div className="medical-team__photo">
              <img src={member.image} alt={member.imageAlt || member.name} loading="lazy" width="600" height="680" />
              {/* {member.placeholder && <span className="medical-team__photo-label">Foto referencial</span>} */}
            </div>
            <div className="medical-team__profile">
              <span className="medical-team__icon" aria-hidden="true"><Stethoscope size={23} /></span>
              <p className="medical-team__role">{member.role}</p>
              <h3>{member.name}</h3>
              {member.description && <p className="medical-team__description">{member.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
