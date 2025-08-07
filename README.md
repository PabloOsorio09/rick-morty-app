\# Galería Interactiva de Personajes de Rick and Morty

\#\# Descripción General del Proyecto

Esta es una aplicación web de tipo desarrollada con HTML, CSS y JavaScript. La aplicación consume la API pública de Rick and Morty (https://rickandmortyapi.com/) para mostrar una galería completa de todos los personajes de la serie.

Se podrá interactuar con la aplicación de las siguientes maneras:  
\* Visualizar todos los personajes disponibles en la API.  
\* Filtrar personajes dinámicamente por nombre, especie (Human, Alien, etc.) o estado (Vivo, Muerto, Desconocido).  
\* Votar por sus personajes favoritos con botones de "Like" y "Dislike".  
\* Ver contadores de votos individuales por personaje y un contador global.  
\* Los votos persisten localmente en el navegador gracias a \`localStorage\`.


\#\# Instrucciones para Ejecutar la App

La aplicación no requiere un servidor web ni dependencias complejas para ejecutarse. Sigue estos sencillos pasos:

1\.  \*\*Clonar el Repositorio:\*\*  
    \`\`\`bash  
    git clone \[https://github.com/PabloOsorio09/rick-morty-app.git\](https://github.com/PabloOsorio09/rick-morty-app.git)  
    \`\`\`  
2\.  \*\*Navegar a la Carpeta:\*\*  
    \`\`\`bash  
    cd rick-morty-app  
    \`\`\`  
3\.  \*\*Abrir el Archivo Principal:\*\*  
    Abre el archivo \`index.html\` directamente en el navegador.

Después de esto, la aplicación comenzará a cargar los datos de la API.


\#\# Cómo se Consumió la API

El consumo de la API fue uno de los desafíos técnicos principales debido a la \*\*paginación\*\*. La API entrega los 800+ personajes en páginas de 20\. Para ofrecer un filtro global funcional, se implementó la siguiente estrategia en \`app.js\`:

1\.  \*\*Petición Inicial:\*\* Se realiza una primera petición \`fetch\` a la URL base para obtener la primera página de resultados y el número total de páginas (\`totalPages\`).  
2\.  \*\*Carga en Paralelo:\*\* En lugar de pedir las páginas restantes una por una de forma secuencial, se crea un array de promesas. Cada promesa es una petición \`fetch\` a una página diferente.  
3\.  \*\*\`Promise.all\`:\*\* Se utiliza \`Promise.all\` para ejecutar todas estas peticiones de forma concurrente. Esto reduce drásticamente el tiempo de carga inicial en comparación con un bucle \`await\` secuencial.  
4\.  \*\*Consolidación de Datos:\*\* Una vez que todas las promesas se resuelven, los resultados de todas las páginas se concatenan en un único array (\`allCharacters\`), que sirve como la fuente de datos principal para la aplicación.

Durante este proceso, se muestra un mensaje de carga dinámico para mantener informado al usuario.


\#\# Estructura del Código

El proyecto está organizado en tres archivos principales, siguiendo la separación de responsabilidades:

\* \*\*\`index.html\`\*\*: Contiene la estructura semántica de la página, incluyendo el área para los filtros, los contadores y el contenedor principal de la galería.  
\* \*\*\`styles.css\`\*\*: Se encarga de toda la presentación visual. Se utiliza un enfoque CSS Grid para un layout responsivo, \*Mobile-First\*, y variables CSS para un tema de colores consistente y fácil de mantener. Incluye animaciones sutiles para mejorar la experiencia de usuario.  
\* \*\*\`app.js\`\*\*: Maneja toda la lógica de la aplicación, incluyendo:  
    \* La carga de datos de la API.  
    \* La renderización dinámica de las tarjetas de personajes.  
    \* La lógica de filtrado en tiempo real.  
    \* La persistencia de los votos en \`localStorage\`.


\#\# Funcionalidades Adicionales

\* \*\*Carga de Todos los Personajes:\*\* Esta aplicación carga los más de 800 personajes para que la función de búsqueda sea completa.  
\* \*\*Persistencia de Votos:\*\* Los votos no se pierden al recargar la página.  
\* \*\*Contadores:\*\* Se muestran contadores de likes/dislikes por personaje, el puntaje neto, y un contador global en el encabezado.  
\* \*\*Visual:\*\* Se implementaron animaciones y transiciones suaves para acciones como la carga de tarjetas, el clic en botones y la actualización de puntajes.


\#\# Decisiones Técnicas

1\.  \*\*Cargar Todo vs. Paginación en Frontend:\*\* Se tomó la decisión de cargar todos los personajes al inicio. Se sacrifica un poco de tiempo de carga inicial a cambio de una experiencia de filtrado y búsqueda global instantánea y potente.  
2\.  \*\*Delegación de Eventos:\*\* Para manejar los clics en los botones de voto, se utilizó un único \`event listener\` en el contenedor de la galería en lugar de cientos de listeners individuales. Esto mejora significativamente el rendimiento y reduce el consumo de memoria.  
3\.  \*\*JavaScript Puro (Vanilla JS):\*\* Se eligió no usar frameworks (como React o Vue) para evidenciar un dominio sólido de los fundamentos de JavaScript, el manejo del DOM y la gestión del estado de forma manual.  
