**Explicación paso a paso como un profesor** 🌟

---

### **Diagrama de Flujo: Pantalla Inicial (Menú)**

**Objetivo**: Permitir al jugador 1 elegir su símbolo (X/O) y modo de juego.

#### **Paso 1: Selección de Símbolo (X/O)**

- **Elementos visuales**:
  - Dos botones gráficos (SVG) para X y O.
  - Un _toggle_ que se mueve para indicar la selección.
- **Funciones clave**:
  - `toggleSelection()`: Mueve el fondo del _toggle_ a X u O.
  - `guardarEleccionSimbolo()`: Almacena la elección en una variable (ej: `player1Symbol`).
- **Propiedades JS**:
  - Variables: `player1Symbol` (X/O).
  - Evento `click` en los SVG para activar las funciones.

#### **Paso 2: Elegir Modo de Juego**

- **Botones disponibles**:
  - _VS CPU_: Jugar contra la computadora.
  - _VS Player_: Dos jugadores humanos.
- **Funciones clave**:
  - `iniciarJuego()`: Redirige a la pantalla de juego y configura variables iniciales.
  - `determinarModoJuego()`: Define si es multijugador o vs CPU.
- **Propiedades JS**:
  - Variables: `gameMode` (para guardar "CPU" o "Player").
  - Evento `click` en los botones para activar las funciones.

---

### **Diagrama de Flujo: Pantalla Principal del Juego**

**Objetivo**: Gestionar turnos, movimientos y victorias.

#### **Paso 1: Inicialización del Juego**

- **Configuración inicial**:
  - `currentPlayer = 'O'`: Siempre inicia O.
  - `gameBoard = ['', '', ..., '']`: Array vacío que representa el tablero.
  - `isGameActive = true`: Permite interacción con el tablero.
- **Funciones clave**:
  - `resetearTablero()`: Limpia celdas y variables.
  - `actualizarIndicadorTurno()`: Muestra "X Turn" u "O Turn".

#### **Paso 2: Hover en Celdas**

- **Efecto visual**:
  - Muestra un contorno del símbolo del jugador actual (X/O) al pasar el mouse.
- **Funciones clave**:
  - `mostrarContorno()`: Usa eventos `mouseover` y `mouseout`.
- **Propiedades JS**:
  - Clases CSS: `.cuadranteHoverX` y `.cuadranteHoverO` (visibilidad condicional).

#### **Paso 3: Clic en Celda**

- **Lógica**:
  1. Verifica si la celda está vacía y el juego está activo.
  2. Guarda el símbolo en `gameBoard`.
  3. Muestra el símbolo sólido (X/O) en la celda.
- **Funciones clave**:
  - `manejarClicCelda()`: Ejecuta la jugada.
  - `alternarTurno()`: Cambia `currentPlayer` y actualiza el indicador.

#### **Paso 4: Verificar Victoria o Empate**

- **Condiciones de victoria**:
  - Tres símbolos iguales en línea (filas, columnas o diagonales).
- **Funciones clave**:
  - `verificarVictoria()`: Compara `gameBoard` con combinaciones ganadoras.
  - `verificarEmpate()`: Revisa si todas las celdas están ocupadas.
- **Propiedades JS**:
  - Array `winConditions` con las 8 combinaciones ganadoras.

#### **Paso 5: Manejar Fin del Juego**

- **Escenarios**:
  - **Victoria**: Muestra alerta con el ganador y botones _Quit/Next Round_.
  - **Empate**: Muestra alerta específica.
- **Funciones clave**:
  - `mostrarAlertaVictoria()`: Ajusta el texto y visibilidad de elementos.
  - `reiniciarRonda()`: Llama a `resetearTablero()` y reactiva el juego.

#### **Paso 6: Botones de Acción**

- **Opciones post-juego**:
  - _Quit_: Vuelve al menú inicial (`window.location`).
  - _Next Round_: Reinicia el tablero manteniendo la elección inicial.
- **Funciones clave**:
  - Eventos `click` en los botones para ejecutar acciones.

---

### **Resumen de Funciones JS Clave**

1. **Para el Menú**:

   - `toggleSelection()` → Maneja el _toggle_ visual.
   - `iniciarJuego()` → Configura variables y redirige.

2. **Para el Juego**:

   - `actualizarIndicadorTurno()` → Cambia "X Turn/O Turn".
   - `manejarClicCelda()` → Ejecuta jugada y verifica estado del juego.
   - `verificarVictoria()/verificarEmpate()` → Lógica de fin de juego.

3. **Eventos**:
   - `mouseover/mouseout` → Efectos hover.
   - `click` → En celdas y botones de acción.

---

### **Errores Comunes a Evitar**

- **Olvidar actualizar `currentPlayer`** → El turno no cambiaría.
- **No reiniciar `gameBoard` en _Next Round_** → El tablero conservaría jugadas anteriores.
- **Validar celdas ocupadas** → Evita sobrescribir símbolos.

¿Te gustaría profundizar en alguna parte específica? 😊
