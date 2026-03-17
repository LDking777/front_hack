"""Base de respuestas fijas (Capa 1 - Parametrizada).
Contiene respuestas rápidas para preguntas frecuentes sobre Caldas.
"""

KNOWLEDGE_BASE = {
    "nevado": "El Nevado del Ruiz es parte del Parque Nacional Natural Los Nevados. Recomendaciones: salir con guía certificado, llevar ropa para frío y lluvia, verificar condiciones volcánicas y de senderos. Ideal para ecoturismo y fotografía.",
    "feria": "La Feria de Manizales (enero) incluye eventos culturales, corridas, conciertos y actividades para familias. Revisa la programación oficial antes de viajar.",
    "ferias": "La Feria de Manizales (enero) incluye eventos culturales, corridas, conciertos y actividades para familias. Revisa la programación oficial antes de viajar.",
    "pueblos patrimonio": "Salamina es uno de los Pueblos Patrimonio cercanos a Manizales: arquitectura republicana, plazas y miradores. Otros pueblos con encanto son Filadelfia y Supía.",
    "termales": "Caldas tiene varias opciones termales (aguas termales). Consulta por complejos termales en Manizales y alrededores; muchos ofrecen paquetes de día y alojamiento.",
    "cafetero": "El Paisaje Cultural Cafetero ofrece visitas a fincas, recorridos de catación y tours de proceso del café. Reserva con antelación y elige fincas con guía experto.",
}

# En knowledge_base.py
def get_fixed_response(msg):
    m = msg.lower().strip()
    if m in ["hola", "buenos dias", "buenas tardes"]:
        return "¡Hola! Soy CaldAsistente ☕, tu guía experto en Caldas. ¿Quieres conocer sobre el Nevado, los termales o la cultura cafetera?"
    if "quien eres" in m:
        return "Soy CaldAsistente, un proyecto de IA creado para potenciar el turismo en nuestro departamento."
    return None
