## **Propuesta de Mejora para la Galería de Rick and Morty**

### **Mejora Propuesta: Integración de Episodios por Personaje**

Descripción:  
Añadir un botón en cada tarjeta de personaje que al ser presionado muestre una lista de todos los episodios en los que dicho personaje ha aparecido.  
Valor Añadido:  
Esta funcionalidad enriquece la experiencia del usuario, transformando la aplicación de una galería a una guía de referencia rápida y útil.  
**Implementación Técnica (Resumen):**

1. **Añadir Botón:** Incluir un botón "Ver Episodios" en la plantilla HTML de cada tarjeta.  
2. **Obtener Datos:** El objeto de cada personaje ya contiene las URLs de sus episodios. Al hacer clic, se harían peticiones fetch a esas URLs para obtener los nombres.  
3. **Mostrar Resultados:** La lista de episodios se mostraría en una ventana modal simple para no interrumpir la navegación principal.