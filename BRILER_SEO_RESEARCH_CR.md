# BRILER — investigación de keywords en Costa Rica

## 1. Executive Summary

**Conclusión principal.** Hay evidencia de demanda para el posicionamiento de BRILER, pero el mercado costarricense usa sobre todo lenguaje amplio y mixto: `desarrollo de software` (500 búsquedas mensuales exportadas), `automatización` (500) e `ingeniería de software` (500). Esas consultas no son, por sí solas, páginas de servicio: las SERP incluyen empleo, formación y definiciones. La oportunidad comercial aparece al combinar ese lenguaje con modificadores de solución y empresa: `empresa(s) de desarrollo de software`, `software a medida`, `automatización de procesos`, `automatización de procesos empresariales`, `IA para empresas` e `integración ERP`.

Los clusters con señal más utilizable son **Software / producto digital**, **Automatización**, e **IA empresarial**. Automatización e IA muestran una demanda exportada recurrente de 50 para muchas variantes B2B; además, sus SERP incluyen varias páginas de servicio costarricenses. Integración tiene poca profundidad, excepto `integración ERP` y `integración API`; Modernización / legacy casi no tiene demanda explícita, por lo que debe expresarse como una capacidad dentro de una superficie mayor, no como una página inicial independiente.

El mayor riesgo es interpretar las cifras como precisión absoluta. Planner mostró en la interfaz bandas como “10–100” y “100–1K”, aunque el CSV exportado contiene 50 y 500 respectivamente. La cuenta nueva también muestra el aviso de que para estadísticas más detalladas habría que publicar una campaña; no se hizo. Por tanto, los datos sirven para priorización relativa e hipótesis de lenguaje, no para forecasts de tráfico.

**Implicación para BRILER:** liderar con problemas de negocio y capacidades combinadas (“software a medida”, “automatización de procesos e IA”, “integración de sistemas”) y no con términos educativos como “ingeniería de software”, ni con términos genéricos de infraestructura o proveedor cloud.

## 2. Methodology

| Campo | Configuración / hecho observado |
|---|---|
| Herramienta | Google Ads → Planificador de palabras clave → “Descubre nuevas palabras clave” |
| Fecha | 19 de septiembre de 2026 |
| Ubicación | Costa Rica |
| Idioma | Español (configuración predeterminada que mostró Planner) |
| Red | Google |
| Período | Últimos 12 meses: **1 sep. 2025 – 31 ago. 2026** |
| Semillas iniciales | desarrollo de software; integración de sistemas; modernización de sistemas; automatización de procesos; inteligencia artificial para empresas; consultoría tecnológica; servicios cloud |
| Expansión | Planner generó 1,543 ideas para la primera consulta. Se amplió con desarrollo de aplicaciones, desarrollo web empresarial e integración API (límite de 10 semillas por consulta). |
| Exportación | El archivo de Google sin transformación se conserva en `BRILER_KEYWORDS_CR_RAW.csv`. |
| Estado de campañas comprobado al cierre | Resumen de Google Ads: **0 campañas**. |

**Convenciones de datos.** Vol. es el valor “Avg. monthly searches” del CSV de Google; en pantalla Google presentó bandas en lugar de ese valor. Competencia e índice son métricas de Google Ads, no dificultad SEO orgánica. CPC es la puja de parte superior de página en USD. `N/D` significa que Google no entregó el valor. La intención, el cluster y las observaciones son interpretación del investigador.

## 3. Keyword Dataset

Las filas siguientes son la selección de términos útiles para decidir lenguaje y superficies; el export completo contiene las 1,543 ideas. `*` señala cifras observadas en una consulta ampliada dentro de Planner, no una estimación añadida.

| Keyword | Vol. | 3 m | Interanual | Competencia (índice) | CPC bajo–alto | Cluster | Intención estimada | Observación |
|---|---:|---:|---:|---|---|---|---|---|
| desarrollo de software | 500 | 0% | 0% | Medio (39) | $0.58–$2.09 | Software | AMBIGUA | Principal lenguaje de mercado; SERP mezcla empresas, educación y empleo. |
| empresas de desarrollo de software | 50 | 0% | 0% | Alto (71) | $0.51–$2.02 | Software | COMERCIAL ALTA | Modificador “empresas” mejora ajuste de compra. |
| empresa desarrollo software | 50 | +∞ | +∞ | Alto (100) | N/D | Software | COMERCIAL ALTA | Señal comercial fuerte, pero volumen pequeño. |
| software a medida | 50 | 0% | 0% | Bajo (14) | N/D | Software | COMERCIAL ALTA | Excelente lenguaje de propuesta. |
| desarrollo de software a medida | 50 | 0% | 0% | Bajo (4) | N/D | Software | COMERCIAL ALTA | Variante de servicio. |
| software personalizado | 50 | 0% | 0% | Bajo (0) | N/D | Software | COMERCIAL ALTA | Usar como variante semántica, no necesariamente URL propia. |
| desarrollo de sistemas | 50 | 0% | 0% | Medio (43) | N/D | Software | COMERCIAL MEDIA | Más amplio, útil en copy. |
| servicios de desarrollo de software | 50 | +∞ | 0% | Medio (64) | N/D | Software | COMERCIAL ALTA | Variante transaccional. |
| desarrollo de software para empresas | 50 | 0% | 0% | Desconocido | N/D | Software | COMERCIAL ALTA | Candidato de heading, no de URL independiente todavía. |
| desarrollo de software empresarial | 50 | 0% | 0% | Bajo (0) | N/D | Software | COMERCIAL MEDIA | Lenguaje válido, pero señal Ads débil. |
| desarrollo de aplicaciones | 50* | 0% | 0% | Bajo | $0.62–$1.38 | Software | COMERCIAL MEDIA | Amplio; puede incluir apps de consumo. |
| desarrollo de aplicaciones web | 50* | 0% | 0% | Alto | $0.59–$1.33 | Software | COMERCIAL MEDIA | Supporting page posible si la oferta lo sustenta. |
| desarrollo de apps | 50* | 0% | 0% | Medio | $0.86–$9.81 | Software | AMBIGUA | CPC alto; no asumir B2B. |
| desarrollo de aplicaciones móviles | 50* | 0% | 0% | Medio | $1.30–$6.52 | Software | AMBIGUA | Potencial secundario, no prioritario. |
| ingeniería de software | 500 | 0% | 0% | Medio (53) | $0.61–$2.48 | Software | INFORMATIVA | Alto volumen, pero predominan carreras y formación. |
| integración de sistemas | 50 | -100% | -100% | Desconocido | N/D | Integración | COMERCIAL MEDIA | Capacidad relevante; poca consistencia histórica. |
| integración ERP | 50 | +∞ | +∞ | Alto (71) | N/D | Integración | COMERCIAL ALTA | Mejor señal explícita del cluster. |
| integración API | 50* | 0% | +∞ | Bajo | N/D | Integración | COMERCIAL MEDIA | Técnica; buena para profundizar dentro de la página de integración. |
| integración EDI | 50 | 0% | 0% | Desconocido | N/D | Integración | AMBIGUA | Solo incluir si BRILER ofrece el caso. |
| modernización de sistemas | 0 | 0% | 0% | Desconocido | N/D | Modernización | COMERCIAL MEDIA | Problema real, sin demanda explícita suficiente para URL propia. |
| automatización | 500 | 0% | 0% | Bajo (9) | $0.86–$2.91 | Automatización | AMBIGUA | Demanda amplia; no exclusivamente empresarial. |
| automatización de procesos | 50 | 0% | 0% | Medio (38) | $0.64–$2.61 | Automatización | COMERCIAL ALTA | Término principal del cluster. |
| automatización de procesos empresariales | 50 | +∞ | +∞ | Medio (57) | N/D | Automatización | COMERCIAL ALTA | Muy buen ajuste B2B. |
| automatización de procesos robóticos | 50 | +∞ | +∞ | Alto (86) | $2.08–$4.36 | Automatización | COMERCIAL ALTA | RPA: supporting page si hay capacidad demostrable. |
| automatización de procesos administrativos | 50 | 0% | 0% | Medio (46) | N/D | Automatización | COMERCIAL MEDIA | Caso de uso / contenido vertical. |
| automatización de procesos contables | 50 | 0% | 0% | Medio (40) | N/D | Automatización | COMERCIAL MEDIA | Caso de uso, no prometer contabilidad sin alcance. |
| automatización de negocios | 50 | 0% | 0% | Desconocido | N/D | Automatización | COMERCIAL ALTA | Lenguaje CEO-first. |
| automatización empresarial | 50 | 0% | 0% | Bajo (14) | N/D | Automatización | COMERCIAL ALTA | Variante de copy. |
| automatización en empresas | 50 | +∞ | 0% | Alto (86) | N/D | Automatización | COMERCIAL ALTA | Señal B2B, útil como subheading. |
| automatización digital | 50 | 0% | 0% | Alto (71) | N/D | Automatización | COMERCIAL MEDIA | Evitar si la explicación queda abstracta. |
| automatización de documentos | 50 | 0% | 0% | Bajo (29) | N/D | Automatización | COMERCIAL MEDIA | Caso de uso. |
| automatización de datos | 50 | 0% | 0% | Bajo (0) | N/D | Automatización | COMERCIAL MEDIA | Caso de uso. |
| automatización para pymes | 50 | 0% | 0% | Desconocido | N/D | Automatización | COMERCIAL MEDIA | Contenido / segmento posible. |
| inteligencia artificial para empresas | 50 | 0% | 0% | Medio (49) | $1.32–$4.66 | IA | COMERCIAL ALTA | Término principal; CPC más alto que software base. |
| inteligencia artificial empresarial | 50 | 0% | 0% | Alto (82) | $1.46–$8.02 | IA | COMERCIAL ALTA | Fuerte señal publicitaria, buena variante. |
| IA para empresas | 50 | 0% | 0% | Alto (86) | N/D | IA | COMERCIAL ALTA | Alternativa corta para copy. |
| consultoría inteligencia artificial | 50 | +∞ | 0% | Bajo (0) | N/D | IA | COMERCIAL ALTA | Explícitamente comercial aunque la competencia Ads es baja. |
| consultoría de inteligencia artificial | 50 | 0% | 0% | Desconocido | N/D | IA | COMERCIAL ALTA | Variante secundaria. |
| inteligencia artificial en los negocios | 50 | 0% | 0% | Alto (86) | N/D | IA | COMERCIAL MEDIA | Mejor para contenido de investigación comercial. |
| uso de inteligencia artificial en las empresas | 50 | 0% | +∞ | Medio (33) | N/D | IA | INFORMATIVA | Candidato de guía/caso de uso. |
| automatización e inteligencia artificial | 50 | +∞ | +∞ | Bajo (0) | N/D | IA / Automatización | COMERCIAL ALTA | Mensaje combinado con evidencia. |
| consultoría tecnológica | 50 | 0% | -100% | Desconocido | N/D | Consultoría | COMERCIAL MEDIA | Capacidad transversal; tendencia débil. |
| consultora TI | 50 | 0% | 0% | Alto (86) | N/D | Consultoría | COMERCIAL ALTA | Mejor variante comercial de consultoría. |
| consultor TI | 50 | 0% | 0% | Alto (86) | N/D | Consultoría | AMBIGUA | Puede buscar empleo/persona individual. |
| consultoras de software | 50 | +∞ | 0% | Alto (71) | N/D | Consultoría | COMERCIAL ALTA | Término competitivo, buen lenguaje de mercado. |
| empresas de consultoría tecnológica | 50 | 0% | 0% | Desconocido | N/D | Consultoría | COMERCIAL ALTA | Variante de copy / prueba de mercado. |
| servicios cloud | 50 | 0% | 0% | Bajo (7) | N/D | Cloud / Datos | COMERCIAL MEDIA | Término amplio de proveedor. |
| servicios en la nube | 50 | 0% | 0% | Bajo (21) | $0.69–$11.74 | Cloud / Datos | AMBIGUA | Intención mezcla B2B y almacenamiento de consumo. |
| cloud para empresas | 50 | -100% | 0% | Desconocido | N/D | Cloud / Datos | COMERCIAL MEDIA | Mejor modificador de audiencia. |
| infraestructura cloud | 50 | +∞ | +∞ | Bajo (10) | N/D | Cloud / Datos | COMERCIAL MEDIA | Supporting page, no core. |
| base de datos en nube | 50 | 0% | 0% | Medio (45) | $1.85–$5.28 | Cloud / Datos | COMERCIAL MEDIA | Técnica, aplicable si se vincula a modernización. |
| sistemas cloud | 50 | 0% | +∞ | Bajo (29) | $0.50–$2.22 | Cloud / Datos | AMBIGUA | Usar en copy, no página aislada. |

### Ruido que también informa el mercado

| Keyword | Vol. | Clasificación | Por qué no se prioriza como servicio |
|---|---:|---|---|
| desarrollador de software | 500 | INFORMATIVA / BAJA INTENCIÓN B2B | Predominan empleo y perfiles profesionales. |
| programador de software | 50 | INFORMATIVA / BAJA INTENCIÓN B2B | Profesión / empleo. |
| aws que es | 500 | INFORMATIVA | Definición de plataforma. |
| cloud computing que es | 50 | INFORMATIVA | Definición académica. |
| google cloud plataforma | 500 | IRRELEVANTE PARA BRILER | Navegación de marca/plataforma; CPC extremo no implica oportunidad orgánica para BRILER. |
| google cloud precios | 50 | INFORMATIVA / BAJA INTENCIÓN B2B | Intención de precio de proveedor, no de consultoría. |
| automatización industrial 4.0 | 50 | AMBIGUA | Puede ser OT/industrial fuera del foco actual. |
| inteligencia artificial en empresas ejemplos | 50 | INFORMATIVA | Búsqueda de aprendizaje, útil solo como contenido. |

## 4. Cluster Analysis

### Software

Es el cluster de mayor demanda amplia. Sin embargo, la consulta madre no es pura demanda de contratación: Google devuelve directorios, empresas, universidades, técnicos y empleos. La página principal debe hablar de **desarrollo de software a medida para empresas**, con `desarrollo de sistemas`, `aplicaciones web` e `integración` como lenguaje de apoyo. `Ingeniería de software` no debe ser la apuesta SEO central por su intención formativa.

### Integración y modernización

`integración de sistemas` tiene 50 y `integración ERP` 50 con competencia Ads alta; son señales modestas pero comercialmente coherentes. En cambio, `modernización de sistemas` devolvió 0. BRILER debe presentar modernización, legacy, migraciones y APIs como problemas y capacidades dentro de Integración / Software, no como una superficie aislada hasta observar mejor evidencia.

### Automatización

Es el mejor cluster para hablar de dolor de negocio: tareas repetitivas, procesos administrativos, documentos, ventas y operaciones. `Automatización de procesos`, `… empresariales`, `… robóticos` y `automatización en empresas` conforman un grupo consistente. RPA tiene CPC y competencia Ads altos, pero no debe convertirse en promesa de producto separado si BRILER implementa automatización de manera más amplia.

### IA

La demanda exacta es pequeña pero comercial: `inteligencia artificial para empresas`, `IA para empresas` e `inteligencia artificial empresarial` tienen 50 exportadas y competencia Media/Alta. Su CPC está entre los más altos del conjunto B2B. La SERP premia servicios locales que traducen IA a asistentes, flujos, integración y automatización; ese es el posicionamiento útil para BRILER, no una página genérica sobre IA.

### Consultoría

La demanda existe, pero el lenguaje más comercial es `consultora TI` y `consultoras de software`, no necesariamente `consultoría tecnológica`. Evitar posicionar la marca solamente como consultora; usar la consultoría como la puerta de diagnóstico que conduce a diseño, implementación y producción.

### Infraestructura / Cloud / Datos

La mayor parte del volumen es de plataformas, precios, almacenamiento y consumo. Las pocas variantes empresariales (`cloud para empresas`, `infraestructura cloud`, `base de datos en nube`) justifican una sección de capacidades y casos técnicos, no una página principal de cloud por ahora.

## 5. Search Intent

| Tipo | Ejemplos | Tratamiento recomendado |
|---|---|---|
| Transaccional / comercial | empresa(s) de desarrollo de software; software a medida; automatización de procesos; IA para empresas; integración ERP; consultora TI | Páginas core o supporting, con casos, proceso y CTA de conversación. |
| Investigación comercial | desarrollo de sistemas; cloud para empresas; automatización de datos; inteligencia artificial en los negocios | Guías, casos de uso y secciones de discovery. |
| Informativa | ingeniería de software; aws qué es; cloud computing qué es; ejemplos de IA | Contenido educativo si soporta una decisión de negocio; no competir por cada definición. |
| Ruido / baja intención B2B | desarrollador/programador; carreras, cursos, universidades, empleos, precios de proveedor | No crear una página dedicada; considerar exclusiones si se ejecutan anuncios en el futuro. |

## 6. SERP Evidence

Las búsquedas se ejecutaron en Google con resultados de Costa Rica (ubicación mostrada: Heredia, mediante IP), el 19 de septiembre de 2026. Son evidencia focal, no un estudio exhaustivo de competidores.

| Consulta | Qué devolvió Google | Lectura para BRILER |
|---|---|---|
| `desarrollo de software Costa Rica` | Directorio “Top 7 Empresas…”, servicios de Grupo EasyPro y Atom soluciones; resultados locales; además carreras, técnicos y 903 empleos en LinkedIn. | Necesidad de una página de servicio claramente empresarial y local; la intención está contaminada por empleo/educación. |
| `automatizacion de procesos Costa Rica` | Servicios locales de AutomateCR, AstraSoftCR, CRNube y Tecubi; también curso CENFOTEC, TEC y empleos. Las propuestas destacan flujos, integraciones, IA, reportes y reducción de tareas manuales. | La SERP favorece páginas de servicio que aterrizan casos operativos; oportunidad de diferenciarse con diagnóstico → implementación → producción. |
| `inteligencia artificial para empresas Costa Rica` | Páginas de servicio de Mysa Digital, Datasys y AutomateCR; especializaciones/cursos de TEC y CENFOTEC; política pública de MICITT. | Competir con lenguaje aplicado (“asistentes, flujos, datos, integración”), no con una definición de IA. El contenido educativo debe filtrar hacia un caso de negocio. |

Patrón común: las páginas de servicio que aparecen combinan **tecnología + resultado operativo**. La oportunidad de BRILER es expresar la misma claridad comercial, pero con más profundidad de ingeniería e integración que una agencia o herramienta aislada.

## 7. Opportunities for BRILER

1. **Ancla comercial:** “Desarrollo de software a medida para empresas” debe ser el lenguaje principal de desarrollo, acompañado de aplicaciones, sistemas e integración.
2. **Oferta diferenciada:** “Automatización de procesos e IA aplicada” tiene mejor coherencia con las SERP que una categoría aislada de IA.
3. **Diagnóstico antes de tecnología:** las queries y las SERP permiten vender el recorrido problema → solución → implementación → producción; evita encasillar BRILER como software house o proveedor cloud.
4. **Integración como prueba de profundidad:** API, ERP y sistemas deben explicar la capacidad, aunque aún no justifiquen una familia amplia de URLs.
5. **Cloud y datos como habilitadores:** incluirlos como parte de arquitectura, migración y operación; no perseguir “Google Cloud precios”, “AWS qué es” ni almacenamiento de consumo.

## 8. Candidate Page Map (no definitivo)

| Keyword / cluster | Posible superficie web | Intención | Audiencia probable |
|---|---|---|---|
| desarrollo de software a medida; empresa de desarrollo de software | **CORE PAGE** — Desarrollo de software | Comercial alta | CEO, COO, líder de producto o TI |
| automatización de procesos; automatización empresarial | **CORE PAGE** — Automatización de procesos | Comercial alta | Operaciones, finanzas, servicio al cliente |
| inteligencia artificial para empresas; IA para empresas | **CORE PAGE** — IA aplicada a procesos | Comercial alta | Dirección, innovación, TI |
| integración de sistemas; integración ERP; integración API | **SUPPORTING PAGE** — Integración y modernización | Comercial media/alta | CIO, CTO, operaciones |
| desarrollo de aplicaciones web; desarrollo de apps | **SUPPORTING PAGE** dentro de Desarrollo de software | Comercial media | Producto, negocio, TI |
| cloud para empresas; infraestructura cloud; base de datos en nube | **SUPPORTING PAGE** o capacidad técnica | Comercial media | TI, arquitectura, datos |
| automatización de documentos/datos/ventas; IA en negocios | **CONTENT OPPORTUNITY** — Casos y guías | Investigación comercial | Operaciones y líderes funcionales |
| modernización de sistemas; legacy; migración | **NO DEDICATED PAGE** por ahora | Comercial media, evidencia baja | TI / arquitectura |
| ingeniería de software; desarrollador/programador; AWS qué es; precios cloud | **NO DEDICATED PAGE** | Informativa / ruido | Estudiantes, candidatos, compradores de plataforma |

## 9. Open Questions

- La cuenta no publicó campañas. Google advierte que para estadísticas más detalladas se necesitaría publicar una; no es necesario ni autorizado para este estudio, pero limita granularidad.
- Planner no ofreció series mensuales completas en el export de esta cuenta; se conservaron los cambios de 3 meses e interanuales cuando existían.
- Falta validar demanda en inglés desde Costa Rica y hacer una investigación separada para Estados Unidos y España.
- Falta verificar capacidad, verticales, casos y márgenes de BRILER antes de convertir una oportunidad en oferta o landing page.
- La presencia de resultados personalizados/locales significa que una futura auditoría debe usar un protocolo de SERP con ubicación y navegador controlados.

## 10. Raw Evidence

- [Export original de Google Keyword Planner](BRILER_KEYWORDS_CR_RAW.csv): archivo UTF-16/TSV que Google guardó con extensión `.csv`, sin cambios de valores.
- Consulta inicial: 7 semillas, 1,543 ideas, Costa Rica / Español / Google / últimos 12 meses.
- Consulta ampliada: 10 semillas (límite de Planner), 2,027 ideas; confirmó variantes de aplicaciones, web e integración API.
- Datos de SERP: tres consultas focales realizadas en Google Search, Costa Rica, el 19 de septiembre de 2026.

## Cierre operativo

- Configuración usada: Costa Rica, Español, Google, últimos 12 meses (1 sep. 2025–31 ago. 2026).
- Keywords en export inicial: 1,543 ideas; selección analítica: 52 términos relevantes y 8 términos de ruido documentado.
- Clusters principales: Software, Automatización, IA empresarial, Integración; Cloud/Datos como habilitador y Modernización con evidencia explícita baja.
- Archivos generados: `BRILER_SEO_RESEARCH_CR.md` y `BRILER_KEYWORDS_CR_RAW.csv`.
- El resumen final de Google Ads mostró **0 campañas**. No se creó, modificó ni activó ninguna campaña durante la investigación; no se configuró presupuesto ni facturación, y no se generó gasto por estas acciones.
