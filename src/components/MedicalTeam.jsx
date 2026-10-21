import { useId } from 'react'
import { useStaff } from '../hooks/useStaff'
import MedicalTeamCard from './MedicalTeamCard'
import './MedicalTeam.css'

export default function MedicalTeam({
  eyebrow = 'Nuestro staff médico',
  title = 'Personas que cuidan de quien más quieres.',
  description = 'Detrás del cuidado hay personas. Un espacio para conocer al equipo de Veterinaria Cueva.',
}) {
  const headingId = useId()
  const { members, loading, error } = useStaff()

  return (
    <section className="medical-team" aria-labelledby={headingId}>
      <div className="medical-team__heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId}>{title}</h2>
        </div>
        <div className="medical-team__intro">
          <p>{description}</p>
        </div>
      </div>
      <div className="medical-team__grid" aria-busy={loading}>
        {loading || error || members.length === 0 ? (
          <p className="medical-team__state" role={error ? 'alert' : 'status'}>
            {loading ? 'Cargando profesionales…' : error || 'Aún no hay profesionales publicados.'}
          </p>
        ) : members.map(member => (
          <MedicalTeamCard member={member} key={member.id} />
        ))}
      </div>
    </section>
  )
}
