Documento de Pruebas Funcionales \- Galería Rick and Morty

| ID de Prueba | Funcionalidad a Probar | Pasos a Realizar | Resultado Esperado | Estado |
| :---- | :---- | :---- | :---- | :---- |
| **PF-01** | Carga inicial de personajes | 1\. Abrir index.html en el navegador. \<br\> 2\. Esperar a que la aplicación termine de cargar. | Se muestra un mensaje de carga. Al finalizar, la galería se llena con las tarjetas de los personajes.  | Ok |
| **PF-02** | Filtro por nombre | 1\. En el campo de búsqueda, escribir "Morty". | La galería se actualiza en tiempo real, mostrando únicamente los personajes cuyo nombre contiene "Morty". | Ok |
| **PF-03** | Filtro por especie | 1\. En el campo de búsqueda, escribir "Human". | La galería se actualiza, mostrando únicamente los personajes de la especie "Human". | Ok |
| **PF-04** | Filtro por estado | 1\. En el selector de estado, elegir "Dead". | La galería se actualiza, mostrando únicamente los personajes con el estado "Dead". | Ok |
| **PF-05** | Voto "Like" | 1\. Hacer clic en el botón "Like" de un personaje. | El contador de "Like" del botón aumenta en 1\. El puntaje de la tarjeta se actualiza. El contador total de "Likes" en el encabezado aumenta en 1\. | Ok |
| **PF-06** | Voto "Dislike" | 1\. Hacer clic en el botón "Dislike" de un personaje. | El contador de "Dislike" del botón aumenta en 1\. El puntaje de la tarjeta se actualiza. El contador total de "Dislikes" en el encabezado aumenta en 1\. | Ok |
| **PF-07** | Persistencia de votos | 1\. Votar en varios personajes. 2\. Recargar la página (F5). | Después de recargar, los contadores de las tarjetas y los contadores totales en el encabezado muestran los mismos valores que antes de recargar. | Ok |
| **PF-08** | Responsive | 1\. Abrir la página en un escritorio y redimensionar la ventana a un tamaño de móvil. 2\. Abrir las herramientas de desarrollador y emular un dispositivo móvil. | El layout de la galería se ajusta correctamente, mostrando menos columnas en pantallas más pequeñas. Los filtros y el texto son legibles. No aparece una barra de scroll horizontal. | Ok |

