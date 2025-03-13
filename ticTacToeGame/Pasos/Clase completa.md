**Clase: Implementación Modular de Tic Tac Toe en JavaScript**  
**Tema: Arquitectura Limpia y Mantenible**

---

### **1. Introducción a la Arquitectura Modular**

Un código modular divide la lógica en componentes independientes con responsabilidades claras. Esto facilita:

- **Reusabilidad**: Funciones que pueden usarse en múltiples partes.
- **Mantenibilidad**: Cambios en un módulo no afectan otros.
- **Legibilidad**: Código organizado y autodocumentado.

En tu juego, separaremos:

- **Estado del Juego**: Datos y reglas.
- **Interfaz de Usuario (UI)**: Manipulación del DOM.
- **Controladores**: Conectan estado y UI.

---

### **2. Módulo 1: Estado del Juego (`GameState`)**

**Responsabilidad**: Almacenar y gestionar datos del juego.

#### **Variables Clave**:

```javascript
let currentPlayer // 'X' u 'O'
let gameBoard // Array 3x3 (ej: ['X', '', 'O', ...])
let gameMode // 'vsPlayer' o 'vsCPU'
let isGameActive // true/false
```

#### **Funciones**:

1. **`initGame()`**:

   - **Lógica**:  
     Reinicia `gameBoard`, establece `currentPlayer = 'O'`, activa el juego.
   - **Por qué**:  
     O siempre inicia (reglas del juego), y el tablero debe estar vacío al comenzar.

2. **`checkWin()`**:

   - **Lógica**:  
     Compara `gameBoard` con combinaciones ganadoras (filas, columnas, diagonales).
   - **Por qué**:  
     Usar un array `winConditions` permite verificar eficientemente sin repetir código.

3. **`switchPlayer()`**:
   - **Lógica**:  
     Cambia `currentPlayer` entre X y O.
   - **Por qué**:  
     Centraliza el cambio de turno para evitar errores.

---

### **3. Módulo 2: Interfaz de Usuario (`UIHandler`)**

**Responsabilidad**: Actualizar elementos visuales y manejar eventos.

#### **Funciones**:

1. **`updateTurnIndicator()`**:

   - **Lógica**:  
     Muestra "X Turn" u "O Turn" usando `currentPlayer`.
   - **Por qué**:  
     Feedback visual crucial para el jugador.

2. **`renderBoard()`**:

   - **Lógica**:  
     Recorre `gameBoard` y muestra X/O en las celdas correspondientes.
   - **Por qué**:  
     Mantiene la UI sincronizada con el estado del juego.

3. **`showEndGameModal(message)`**:
   - **Lógica**:  
     Muestra un modal con mensaje de victoria/empate y botones de acción.
   - **Por qué**:  
     Reutilizable para cualquier fin de juego (gana X, O, empate).

---

### **4. Módulo 3: Controladores (`EventControllers`)**

**Responsabilidad**: Conectar interacciones del usuario con la lógica.

#### **Funciones**:

1. **`handleCellClick(index)`**:

   - **Lógica**:
     - Si la celda está vacía y el juego está activo:
       - Actualiza `gameBoard[index] = currentPlayer`.
       - Llama a `UIHandler.renderBoard()`.
       - Verifica victoria/empate con `GameState.checkWin()`.
     - Si hay ganador: `UIHandler.showEndGameModal()`.
   - **Por qué**:  
     Encapsula toda la lógica de una jugada en un solo lugar.

2. **`handleNewGame(mode)`**:
   - **Lógica**:
     - Establece `gameMode = mode`.
     - Llama a `GameState.initGame()`.
     - Oculta el menú y muestra el tablero.
   - **Por qué**:  
     Separa la configuración inicial de la lógica del juego.

---

### **5. Flujo de Datos entre Módulos**

1. **Inicio**:

   - Jugador hace clic en "VS Player".
   - `EventControllers.handleNewGame('vsPlayer')` → `GameState.initGame()` → `UIHandler.renderBoard()`.

2. **Jugada**:

   - Jugador hace clic en celda 5.
   - `EventControllers.handleCellClick(5)` → Actualiza `GameState.gameBoard` → Verifica victoria → Actualiza UI.

3. **Fin de Juego**:
   - Si hay ganador: `UIHandler.showEndGameModal('X Gana!')`.

---

### **6. Buenas Prácticas para Mantenibilidad**

#### **a. Separación de Preocupaciones**:

- **Nunca mezcles lógica y UI**:  
  Ejemplo incorrecto:

  ```javascript
  // ❌ Mal: La función maneja DOM y lógica
  function handleClick() {
    gameBoard[0] = 'X'
    document.getElementById('cell-0').textContent = 'X'
  }
  ```

  Ejemplo correcto:

  ```javascript
  // ✅ Bien: Separación clara
  function handleClick(index) {
    GameState.makeMove(index)
    UIHandler.updateCell(index)
  }
  ```

#### **b. Uso de Constantes**:

- **Evita "magic strings"**:

  ```javascript
  // ❌ Mal
  if (currentPlayer === 'X') { ... }

  // ✅ Bien
  const PLAYERS = { X: 'X', O: 'O' };
  if (currentPlayer === PLAYERS.X) { ... }
  ```

#### **c. Funciones Puras**:

- **Crea funciones que no modifiquen variables externas**:
  ```javascript
  // Función pura: No altera gameBoard, retorna nuevo estado
  function checkWin(board) {
    // ... usa board en lugar de gameBoard
  }
  ```

---

### **7. Ejemplo de Implementación Paso a Paso**

#### **Paso 1: Configurar Módulo de Estado**

```javascript
// gameState.js
export const GameState = {
  currentPlayer: 'O',
  gameBoard: ['', '', '', '', '', '', '', '', ''],
  gameMode: null,
  isGameActive: false,

  init() {
    this.gameBoard.fill('')
    this.currentPlayer = 'O'
    this.isGameActive = true
  },

  checkWin() {
    const winConditions = [
      /* ... */
    ]
    return winConditions.some((cond) =>
      cond.every((i) => this.gameBoard[i] === this.currentPlayer)
    )
  },

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
  },
}
```

#### **Paso 2: Implementar UIHandler**

```javascript
// uiHandler.js
export const UIHandler = {
  cells: document.querySelectorAll('.cell'),

  renderBoard() {
    this.cells.forEach((cell, index) => {
      cell.textContent = GameState.gameBoard[index]
    })
  },

  showEndGameModal(message) {
    // Mostrar modal con message
  },
}
```

#### **Paso 3: Conectar con Eventos**

```javascript
// eventControllers.js
import { GameState } from './gameState.js'
import { UIHandler } from './uiHandler.js'

export const EventControllers = {
  init() {
    document.querySelectorAll('.cell').forEach((cell, index) => {
      cell.addEventListener('click', () => this.handleCellClick(index))
    })
  },

  handleCellClick(index) {
    if (!GameState.isGameActive || GameState.gameBoard[index] !== '') return

    GameState.gameBoard[index] = GameState.currentPlayer
    UIHandler.renderBoard()

    if (GameState.checkWin()) {
      UIHandler.showEndGameModal(`${GameState.currentPlayer} Gana!`)
      GameState.isGameActive = false
    } else {
      GameState.switchPlayer()
    }
  },
}
```

---

### **8. Desafío Típico: Gestión de Eventos**

**Problema**: Si agregas event listeners directamente en el módulo de UI, se mezcla lógica y presentación.  
**Solución**: Usa delegación de eventos y controladores centralizados:

```javascript
// En EventControllers
document.getElementById('game-board').addEventListener('click', (e) => {
  if (e.target.classList.contains('cell')) {
    const index = Array.from(e.target.parentNode.children).indexOf(e.target)
    this.handleCellClick(index)
  }
})
```

---

### **9. Para Pensar: ¿Cómo Escalar a VS CPU?**

- **Extensión Modular**:  
  Crea un módulo `AIController.js` con funciones como `getBestMove()`.  
  En `GameState`, agrega una propiedad `isCpuTurn` y maneja turnos condicionalmente:
  ```javascript
  if (GameState.gameMode === 'vsCPU' && GameState.isCpuTurn) {
    AIController.makeMove()
  }
  ```

---

**Ejercicio Práctico**:  
Implementa el método `checkWin()` usando el array `winConditions` y explica por qué es más eficiente que escribir 8 condicionales separadas.

¿Qué parte te gustaría desarrollar primero? 😊
