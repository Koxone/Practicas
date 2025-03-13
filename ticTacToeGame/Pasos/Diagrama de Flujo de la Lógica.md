Diagrama de Flujo de la Lógica
Jugador 1 elige X/O → se guarda en player1Symbol.

Al iniciar vs Player, currentPlayer se establece en 'O'.

Hover muestra la ficha del currentPlayer (transparente).

Al hacer clic, se registra la ficha en gameBoard y en la celda.

Tras cada movimiento, se verifica si hay victoria.

Si hay ganador, se muestra la alerta y se bloquea el tablero.

"Next Round" reinicia todo excepto la elección inicial de X/O.

Errores Comunes a Evitar
No reiniciar gameBoard al empezar una nueva ronda.

Olvidar actualizar currentPlayer después de cada turno.

No validar isGameActive, permitiendo jugar tras terminar la partida.
