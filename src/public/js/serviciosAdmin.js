// public/js/serviciosAdmin.js

// Función que abre el modal de crear/editar
function abrirModal(data = {}) {
    const modal = document.getElementById('modalServicio');
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${data._id ? 'Editar Servicio' : 'Crear Servicio'}</h2>
        <form id="modalForm" data-id="${data._id || ''}">
          <label>Título</label>
          <input name="titulo" value="${data.titulo || ''}" required>
          <label>Descripción</label>
          <textarea name="descripcion" required>${data.descripcion || ''}</textarea>
          <label>Categoría</label>
          <select name="categoria" required>
            <option value="">Selecciona...</option>
            ${['Trámites','Eventos','Infraestructura','Otro']
              .map(cat => `<option value="${cat}" ${data.categoria===cat?'selected':''}>${cat}</option>`)
              .join('')}
          </select>
          <button type="submit">${data._id ? 'Guardar cambios' : 'Crear Servicio'}</button>
          <button type="button" onclick="cerrarModal()">Cancelar</button>
        </form>
      </div>
    `;
    modal.classList.add('open');
  
    // Aquí sí definimos url basándonos en el dataset del form
    const form = modal.querySelector('#modalForm');
    form.onsubmit = async e => {
      e.preventDefault();
  
      // Serializamos el formulario a un objeto JS
      const payload = {};
      new FormData(form).forEach((val, key) => payload[key] = val);
  
      // Definimos la URL según si hay un ID (editar) o no (crear)
      const id  = form.dataset.id;
      const url = id ? `/admin/servicios/${id}` : '/admin/servicios';
  
      // Enviamos JSON
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      window.location.reload();
    };
  }
  
  // Función para cerrar cualquier modal
  function cerrarModal() {
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
  }
  
  // Botón “+ Nuevo Servicio”
  document.getElementById('btnCrearServicio')
    .addEventListener('click', () => abrirModal());
  
  // Iconos de editar
  document.querySelectorAll('.icon-edit').forEach(el => {
    el.addEventListener('click', () => {
        fetch(`/admin/servicios/${el.dataset.id}/json`)
        .then(r => r.json())
        .then(data => abrirModal(data));
    });
  });
  
  // Iconos de borrar
  document.querySelectorAll('.icon-delete').forEach(el => {
    el.addEventListener('click', () => abrirModalBorrar(el.dataset.id));
  });
  
  // Modal de confirmación de borrado
  function abrirModalBorrar(id) {
    const modal = document.getElementById('modalBorrar');
    modal.innerHTML = `
      <div class="modal-content">
        <p>¿Eliminar este servicio?</p>
        <button id="confirmDelete">Sí, eliminar</button>
        <button type="button" onclick="cerrarModal()">Cancelar</button>
      </div>
    `;
    modal.classList.add('open');
    document.getElementById('confirmDelete').onclick = () => {
      fetch(`/admin/servicios/${id}/borrar`, { method: 'POST' })
        .then(() => window.location.href = '/admin/servicios');
    };
  }
  