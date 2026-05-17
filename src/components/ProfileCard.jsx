import { useState, useEffect } from 'react';
import './ProfileCard.css';

function ProfileCard() {
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar')
    if (savedAvatar) {
      setAvatarUrl(savedAvatar)
    }
  }, [])

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result
        setAvatarUrl(imageUrl)
        localStorage.setItem('userAvatar', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarUrl(null)
    localStorage.removeItem('userAvatar')
  }

  return (
    <div className="profile-card">
      <h1>Моя визитка</h1>
      
      <div className="avatar-section">
        {avatarUrl ? (
          <div>
            <img 
              src={avatarUrl} 
              alt="Аватар" 
              className="avatar"
            />
            <div className="avatar-buttons">
              <button 
                onClick={handleRemoveAvatar}
                className="remove-button"
              >
                Удалить
              </button>
            </div>
          </div>
        ) : (
          <div className="avatar-placeholder">
            📷
          </div>
        )}
        
        <div className="upload-container">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            id="avatar-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar-upload" className="upload-button">
            Загрузить фото
          </label>
        </div>
      </div>

      <div className="student-info">
        <p><strong className="student-name">Имя:</strong> Иван Отрадинский</p>
        <p><strong>Специальность:</strong> Программная инженерия</p>
        <p><strong>Группа:</strong> БИВТ-24-2</p>
        
        <div className="description">
          <strong>О себе:</strong>
          <p>Увлекаюсь веб-разработкой и React. В свободное время изучаю новые технологии.</p>
        </div>

        <div className="skills">
          <strong>Навыки:</strong>
          <ul>
            <li>JavaScript / React</li>
            <li>HTML / CSS</li>
            <li>Git / GitHub</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard