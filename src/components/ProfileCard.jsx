import { useState, useEffect } from 'react'

function ProfileCard() {
  const [avatarUrl, setAvatarUrl] = useState(null)

  // Загрузка аватарки из localStorage при запуске компонента
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
      
      // Читаем файл как Data URL
      reader.onloadend = () => {
        const imageUrl = reader.result
        setAvatarUrl(imageUrl)

        localStorage.setItem('userAvatar', imageUrl)
      }
      
      reader.readAsDataURL(file)
    }
  }

  // Функция для удаления аватарки
  const handleRemoveAvatar = () => {
    setAvatarUrl(null)
    localStorage.removeItem('userAvatar')
  }

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '20px auto', 
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ color: '#333' }}>Моя визитка</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {avatarUrl ? (
          <div>
            <img 
              src={avatarUrl} 
              alt="Аватар" 
              style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%',
                objectFit: 'cover'
              }} 
            />
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={handleRemoveAvatar}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ) : (
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%',
            backgroundColor: '#ccc',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}>
            📷
          </div>
        )}
        
        <div style={{ marginTop: '10px' }}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <p><strong>Имя:</strong> Иван Отрадинский</p>
      <p><strong>Специальность:</strong> Программная инженерия</p>
      <p><strong>Группа:</strong> БИВТ-24-2</p>
      
      <div>
        <strong>О себе:</strong>
        <p>Увлекаюсь веб-разработкой и React. В свободное время изучаю новые технологии.</p>
      </div>

      <div>
        <strong>Навыки:</strong>
        <ul>
          <li>JavaScript / React</li>
          <li>HTML / CSS</li>
          <li>Git / GitHub</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileCard