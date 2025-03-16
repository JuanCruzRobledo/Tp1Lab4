// LOGIN
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm')

  if (loginForm) {
    loginForm.addEventListener('submit', async event => {
      event.preventDefault()

      const username = document.getElementById('username').value
      const password = document.getElementById('password').value

      console.log('Usuario:', username)
      console.log('Contraseña:', password)

      try {
        const response = await fetch(
          `http://181.111.166.250:8081/tp/login.php?user=${username}&pass=${password}`
        )
        const data = await response.json()

        console.log('Respuesta del servidor:', data)

        if (data.respuesta === 'OK') {
          window.location.href = 'lista.html'
        } else {
          document.getElementById('mensaje').textContent = data.mje
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    })
  }
})
