document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const boton = document.getElementById('boton');
  const tareasPendientes = document.getElementById('tareas-pendientes');
  const tareasCompletadas = document.getElementById('tareas-completadas');

  // Cargar desde localStorage
  let pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
  let completadas = JSON.parse(localStorage.getItem("completadas")) || [];

  // Guardar en localStorage
  function guardarTareas() {
    localStorage.setItem("pendientes", JSON.stringify(pendientes));
    localStorage.setItem("completadas", JSON.stringify(completadas));
  }

  function crearTareaElemento(texto, esCompletada = false) {
    const tareaDiv = document.createElement('div');
    tareaDiv.className = 'tarea';

    const contenidoDiv = document.createElement('div');

    const textoSpan = document.createElement('span');
    textoSpan.textContent = texto;

    contenidoDiv.appendChild(textoSpan);
    tareaDiv.appendChild(contenidoDiv);

    if (esCompletada) {
      tareaDiv.classList.add('completada');
      const msg = document.createElement('div');
      msg.className = 'tarea-completada-msg';
      msg.textContent = 'Tarea completada';
      tareaDiv.appendChild(msg);
      tareasCompletadas.appendChild(tareaDiv);
    } else {
      const btnCompletar = document.createElement('button');
      btnCompletar.textContent = 'Completar';
      btnCompletar.className = 'btn btn-success btn-sm ms-3';

      btnCompletar.addEventListener('click', () => {
        tareasPendientes.removeChild(tareaDiv);
        tareaDiv.classList.add('completada');
        btnCompletar.remove();

        const msg = document.createElement('div');
        msg.className = 'tarea-completada-msg';
        msg.textContent = 'Tarea completada';
        tareaDiv.appendChild(msg);
        tareasCompletadas.appendChild(tareaDiv);

        // Mover tarea en arrays
        const index = pendientes.indexOf(texto);
        if (index !== -1) {
          pendientes.splice(index, 1);
          completadas.push(texto);
          guardarTareas();
        }
      });

      contenidoDiv.appendChild(btnCompletar);
      tareasPendientes.appendChild(tareaDiv);
    }
  }

  function agregarTarea() {
    const texto = input.value.trim();
    if (!texto) return;

    pendientes.push(texto);
    crearTareaElemento(texto);
    guardarTareas();

    input.value = '';
    input.focus();
  }

  // Eventos
  boton.addEventListener('click', agregarTarea);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      agregarTarea();
    }
  });

  // Renderizar tareas almacenadas
  pendientes.forEach(texto => crearTareaElemento(texto, false));
  completadas.forEach(texto => crearTareaElemento(texto, true));
});
