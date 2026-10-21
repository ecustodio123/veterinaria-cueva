import { useState } from 'react'

export default function MedicalTeamCard({ member }) {
  const [failedImage, setFailedImage] = useState(null)
  const imageUrl = member.image_url?.trim()

  return (
    <article className="medical-team__card">
      <div className="medical-team__photo">
        {imageUrl && failedImage !== imageUrl ? (
          <img src={imageUrl} alt={member.name} loading="lazy" width="600" height="680" onError={() => setFailedImage(imageUrl)} />
        ) : (
          <span className="medical-team__photo-placeholder" role="img" aria-label="Fotografía no disponible">
            Fotografía no disponible
          </span>
        )}
      </div>
      <div className="medical-team__profile">
        {member.title?.trim() && <p className="medical-team__role">{member.title}</p>}
        <h3>{member.name}</h3>
        {member.description?.trim() && <p className="medical-team__description">{member.description}</p>}
      </div>
    </article>
  )
}
