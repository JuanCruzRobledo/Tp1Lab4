// LISTA DE USUARIOS
cargarUsuarios()

async function cargarUsuarios(query = '') {
  try {
    const response = await fetch(
      `http://181.111.166.250:8081/tp/lista.php?action=BUSCAR&usuario=${query}`
    )
    const users = await response.json()
    const tableBody = document.getElementById('userTable')
    tableBody.innerHTML = ''

    if (users.length === 0) {
      document.getElementById('mensaje').textContent =
        'No se encontraron usuarios.'
      return
    }
    document.getElementById('mensaje').textContent = ''
    users.forEach(user => {
      const row = document.createElement('tr')
      row.className = user.bloqueado === 'Y' ? 'bloqueado' : 'desbloqueado'

      row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.usuario}</td>
              <td>${user.bloqueado}</td>
              <td>${user.apellido}</td>
              <td>${user.nombre}</td>
              <td><button onclick="cambiarEstado(${user.id}, 'Y')" class="w-full h-full flex justify-center items-center"><img src="./assets/bloquear.svg" alt="bloquear" class="w-[30px]"></button></td>
              <td><button onclick="cambiarEstado(${user.id}, 'N')" class="w-full h-full flex justify-center items-center"><img src="./assets/desbloquear.svg" alt="desbloquear" class="w-[30px]"></button></td>
          `

      tableBody.appendChild(row)
    })
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    document.getElementById('mensaje').textContent = 'Error al cargar usuarios.'
  }
}

async function cambiarEstado(id, estado) {
  try {
    await fetch(
      `http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=${estado}`
    )
    cargarUsuarios()
  } catch (error) {
    console.error('Error al cambiar estado:', error)
  }
}

function buscarUsuarios() {
  const query = document.getElementById('searchInput').value.trim()
  cargarUsuarios(query)
}
