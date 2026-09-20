# 10 — Project Brief

**Proyecto:** Web corporativa internacional BRILER  
**Estado:** Definición estratégica + dirección visual aprobada; implementación productiva pendiente  
**Audiencia:** Dirección, producto, ingeniería  
**Fuente de realidad técnica:** discovery del repositorio DEVIT506  
**Fuente de intención comercial:** Dirección (transición DEVIT506 → BRILER)

Este documento define identidad, propósito, audiencias, mercados, tesis comercial, dirección visual aprobada y límites.  
No es copy definitivo. No es arquitectura productiva implementada. No autoriza limpieza ni sustitución de la web actual.

---

## 1. Identidad

### Marca pública

La marca comercial pública es **BRILER**.

En la web, comunicaciones y experiencia de usuario, el nombre visible debe ser BRILER.  
No se debe presentar al mercado como “BRILER LTDA”, “BRILER LLC” ni como sucesor explícito de DEVIT506, salvo que Dirección lo autorice más adelante para un uso legal o de transparencia puntual.

### Entidades

| Entidad | Jurisdicción | Rol |
|---|---|---|
| BRILER LTDA | Costa Rica | Entidad operativa existente |
| BRILER LLC | Estados Unidos | Entidad operativa existente |
| BRILER como empresa extranjera | España | Expansión prevista; modalidad jurídica aún no cerrada |

La web representa a **una marca comercial**. Las entidades legales son contexto societario, no marcas públicas paralelas.

### Dominio canónico

El dominio público definitivo de BRILER es **`briler.net`**.

Es el dominio canónico global previsto para la marca y para concentrar autoridad de marca y SEO.  
No se crearán por defecto dominios independientes por Costa Rica, Estados Unidos o España.

Este dominio es decisión aprobada. No está implementado en el runtime actual (DEVIT506 sigue referenciando `devit506.com`).

### Relación con DEVIT506

DEVIT506 es la marca comercial anterior. El repositorio y el sitio actuales pertenecen a esa identidad.

BRILER no es un rediseño cosmética de DEVIT506. Conserva capacidades de conversión y base técnica reutilizables, pero cambia identidad, geografía, amplitud de oferta y tesis de posicionamiento.

Los tres casos públicos de DEVIT506 **no se migran automáticamente** como contenido BRILER. La estructura conceptual `Problem → Intervention → Result` sí permanece. El contenido de casos se seleccionará y redactará en una fase posterior desde evidencia actual.

---

## 2. Propósito del sitio

La web es el activo público principal de posicionamiento y captación B2B de BRILER.

### Jerarquía de propósitos

| Prioridad | Propósito | Por qué |
|---|---|---|
| P1 | Convertir visitas en conversaciones comerciales | Es el resultado de negocio medible del sitio |
| P2 | Posicionar a BRILER como empresa tecnológica B2B | Evita heredar la tesis estrecha de “CTO Externo / Costa Rica” |
| P3 | Explicar capacidades en lenguaje de comprador | El visitante debe entender qué problemas se resuelven, no una lista de tecnologías |
| P4 | Generar confianza con evidencia | Casos, trayectoria y claridad institucional reducen fricción de compra |
| P5 | Soportar expansión internacional | ES/EN y CR/US/ES deben caber en un solo sitio sobre `briler.net`, sin micrositios por país |
| P6 | Concebir SEO desde la arquitectura de información | El posicionamiento no es un barniz posterior; la IA debe nacer con intención de búsqueda, idiomas y mercados |

P5 y P6 son estructurales. El sitio debe nacer internacionalizable y indexable; no tiene que resolver hoy toda la operación por mercado ni promete posiciones específicas en buscadores.

---

## 3. Audiencias

BRILER vende a organizaciones, no a consumidores finales.

### Comprador económico

Decide presupuesto y relación comercial:

- CEOs y propietarios
- Gerencias generales
- Direcciones de negocio que financian tecnología

Necesitan: claridad de problema, impacto, riesgo, forma de trabajar, siguiente paso simple.

### Comprador técnico

Evalúa viabilidad y calidad:

- CIO / CTO / IT Managers
- Responsables de arquitectura, infraestructura o sistemas
- Perfiles de transformación digital con mandato técnico

Necesitan: evidencia de capacidad, enfoque de solución, modernización, integración, operación.

### Influenciadores

Pueden originar o frenar la oportunidad:

- Operaciones
- Transformación digital / mejora continua
- Finanzas o compliance cuando el sistema toca procesos críticos

### Situaciones de demanda

Más que sectores rígidos, la web debe reconocer contextos:

- Necesidad de software, web, plataforma o app a medida
- Sistemas empresariales fragmentados o legacy
- Automatización o introducción de IA en procesos reales
- Modernización de infraestructura, cloud, datos o arquitectura
- Acompañamiento consultivo, puntual o extendido

### Orientación CEO-first

La experiencia se diseñará prioritariamente para el comprador económico / ejecutivo.

CEO-first no elimina contenido técnico. Establece esta jerarquía de información:

`problema / resultado → solución → capacidad → evidencia → profundidad técnica`

cuando corresponda.

Esto implica:

- comunicar primero problemas de negocio, impacto y resultados;
- no abrir la experiencia con tecnologías, frameworks o jerga;
- permitir que un CEO, propietario o gerente comprenda rápidamente dónde BRILER puede ayudar;
- conservar profundidad posterior para CIO, CTO, IT Managers y otros compradores técnicos.

No se asume un único buyer journey.

---

## 4. Mercados

Mercados de concepción inicial:

1. Costa Rica
2. Estados Unidos
3. España
4. Otros mercados internacionales a futuro

### Principio de presencia

Un solo sitio BRILER en **`briler.net`**. Español e inglés como capacidades de primera clase.

No se asumen sitios independientes por país ni dominios por mercado.  
La arquitectura de información debe permitir segmentación futura (copy, legal, contacto, énfasis de mercado) sin duplicar el producto.

### Prioridad geográfica de SEO

Requisito estructural aprobado, no promesa de ranking:

1. Costa Rica — prioridad inicial de posicionamiento.
2. Estados Unidos y España — siguientes mercados de expansión.

La modalidad jurídica en España permanece **PENDING VERIFICATION**. No condiciona la marca pública ni el dominio.

### Idiomas

Español e inglés son de primera clase. URLs previstas, no implementadas:

- `briler.net/es/...`
- `briler.net/en/...`

Regla de entrada aprobada (target, no runtime actual):

- familia `es` (`es`, `es-CR`, `es-ES`, `es-MX` u otra `es-*`) → experiencia inicial en español;
- cualquier otro idioma del navegador → experiencia inicial en inglés.

Una URL explícita (`/es/...`, `/en/...`) y la elección manual del usuario prevalecen sobre la autodetección. Debe existir selector ES/EN. El detalle de precedencia está en `11_ARCHITECTURE.md`.

---

## 5. Tesis de posicionamiento

DEVIT506 se presenta hoy principalmente como socio tecnológico estratégico / CTO Externo, con centro en Costa Rica y Latinoamérica.

BRILER amplía esa tesis:

> BRILER ayuda a las organizaciones a crecer, mejorar, modernizarse y operar mejor mediante tecnología diseñada alrededor de sus necesidades reales.

BRILER combina ingeniería de software, consultoría tecnológica e infraestructura.

No es únicamente una software house.  
No es únicamente un servicio de CTO externo.

“CTO Externo” puede existir como **modalidad de consultoría**, no como identidad principal.

Principio comercial (no copy definitivo):

> Entender el problema del negocio, diseñar la solución tecnológica adecuada y llevarla hasta producción.

La web debe poder comunicar intervenciones de distinto alcance: una necesidad puntual o una transformación más amplia.

### Orientación pain-first / híbrida

La entrada principal a la propuesta comercial debe partir de problemas o necesidades reconocibles por el cliente.

Ejemplos conceptuales, no copy ni navegación definitivos:

- procesos manuales o ineficientes;
- sistemas que no se comunican;
- software que limita el crecimiento;
- necesidad de crear una aplicación o plataforma;
- infraestructura que no escala o representa riesgo;
- sistemas legacy que necesitan modernización;
- necesidad de introducir IA de forma útil;
- necesidad de acompañamiento tecnológico especializado.

Las capacidades técnicas siguen siendo importantes. Un visitante referido o con intención explícita debe poder encontrar directamente capacidades como desarrollo de software, automatización e IA, integraciones, modernización, infraestructura o consultoría.

Principio aprobado: **arquitectura híbrida con orientación pain-first**.  
No convierte todavía estos ejemplos en sitemap ni en menú.

Alcance de intervención que el sitio debe poder comunicar (no IA definitiva):

- Crear una aplicación, sitio o plataforma
- Automatizar procesos
- Integrar un ERP u otros sistemas
- Modernizar un legacy sin sustituirlo necesariamente
- Diseñar infraestructura, cloud o datos
- Introducir IA aplicada a un proceso real
- Diagnosticar una arquitectura existente
- Acompañar como consultor o ejecutar la solución completa

### Principios de producto (canónicos)

1. BRILER es primero una empresa de tecnología B2B, no una lista de tecnologías.
2. La web explica resultados y problemas antes que frameworks o herramientas.
3. Las tecnologías demuestran expertise; no son la propuesta de valor.
4. Los casos de éxito funcionan como evidencia de capacidad. Los de BRILER se eligen y redactan desde evidencia actual; no se heredan automáticamente de DEVIT506.
5. La arquitectura puede crecer sin nacer como portal gigantesco.
6. La experiencia es CEO-first: sirve primero al comprador económico y conserva profundidad para el comprador técnico.
7. Español e inglés son de primera clase, con entrada automática según familia lingüística y elección manual preferente.
8. Costa Rica, Estados Unidos y España coexisten bajo BRILER en `briler.net`.
9. No se duplica infraestructura o contenido por país sin necesidad real.
10. El sitio debe conservar la capacidad de convertir visitas en conversaciones.

---

## 6. Capacidades

El portafolio no debe mostrarse como lista plana.  
La taxonomía siguiente es **propuesta de trabajo** para la fase de arquitectura de información. No es navegación aprobada ni copy final.

### A. Soluciones de software

Tecnología que la organización usa para operar o atender a sus usuarios.

- Desarrollo de software a medida
- Desarrollo web
- Aplicaciones y plataformas web
- Aplicaciones móviles
- Sistemas empresariales

### B. Integración y modernización

Conectar, evolucionar o recuperar sistemas existentes.

- Integraciones entre sistemas
- Modernización e integración de sistemas legacy
- Bases de datos
- Diseño de soluciones tecnológicas a medida

### C. Automatización e inteligencia aplicada

Reducir fricción operativa y mejorar decisiones o ejecución.

- Automatización de procesos
- Inteligencia artificial aplicada a problemas de negocio

### D. Infraestructura y plataforma tecnológica

Sostener, escalar y operar lo construido.

- Arquitectura tecnológica
- Infraestructura tecnológica
- Cloud
- DevOps cuando el problema lo requiera

### E. Consultoría y acompañamiento

Intervenir antes o durante la ejecución, con distinto grado de involucramiento.

- Consultoría tecnológica
- Consultoría de infraestructura
- Diagnóstico y optimización tecnológica
- CTO Externo / liderazgo tecnológico como modalidad, no como marca

Un comprador debe poder entrar por un problema (“tenemos un ERP desconectado”, “necesitamos una app”, “la infraestructura no escala”) y reconocerse en una de estas categorías.

---

## 7. Conversión

### Objetivo principal

Iniciar una conversación comercial cualificada.

Mecanismos actuales reutilizables en concepto, no en marca:

- Formulario de contacto / plantear un desafío o proyecto
- Agendamiento de conversación

Los textos de CTA no están definidos.

### Objetivos secundarios

- Explorar casos de éxito como evidencia
- Entender capacidades y forma de trabajo
- Contactar por canal directo (email u otro canal que se defina)

No se asume un embudo largo ni nurturing de contenidos en esta fase.

### Medición

Google Analytics 4 es **requisito aprobado**; su implementación está pendiente.

El objetivo no es solo medir pageviews. Cuando sea técnicamente posible, la instrumentación futura debe permitir observar el funnel comercial: páginas, soluciones/capacidades, casos, CTAs, inicio y envío de formulario, inicio de agenda, conversión de agenda si la integración lo permite, idioma, mercado/geografía y origen/canal.

Cuentas, Measurement ID, esquema de eventos y consentimiento no están definidos. La implementación futura debe considerar privacidad y requisitos legales de los mercados atendidos, especialmente cuando corresponda en España/UE.

---

## 8. Criterios de éxito

La nueva web será exitosa si:

1. Un visitante entiende qué es BRILER en el primer pantallazo, sin leer “CTO Externo” como definición de la empresa.
2. Un CEO o gerente reconoce un problema o necesidad y ve un siguiente paso, con profundidad técnica disponible después.
3. Las capacidades se perciben como intervenciones de negocio, no como catálogo de stack, y también son encontrables de forma directa.
4. Existe un camino claro a conversación (contacto y/o agenda) en ES y EN.
5. Costa Rica, Estados Unidos y España caben en la misma marca y el mismo sitio (`briler.net`).
6. Los casos públicos de BRILER, cuando existan, son coherentes, revisados y creíbles; no se publican por herencia automática de DEVIT506.
7. La arquitectura de información nace con intención SEO (CR primero; US/ES después) y puede crecer sin reescritura total.
8. El funnel comercial podrá medirse con GA4 cuando se implemente.

No se prometen posiciones específicas en Google. Hoy no hay analytics implementados.

---

## 9. Fuera de alcance actual

Queda fuera salvo necesidad demostrable y autorización posterior:

- Ecommerce
- Área privada / portal de clientes
- Autenticación de usuarios
- CMS complejo
- Blog u arquitectura editorial pesada
- Funcionalidades SaaS
- Sitios o backends separados por país
- Rediseño de infraestructura de email/agenda como fin en sí mismo

El sitio actual no tiene esas capacidades. No se introducen en esta fase.

---

## 10. Relación con el sitio actual

El sitio DEVIT506 aporta:

- Base técnica moderna reutilizable
- Embudo de captación (formulario + agenda), a preservar durante la migración
- i18n ES/EN ya iniciada
- Tres fichas de caso DEVIT506, clasificadas como **legacy / pending replacement**: no son contenido canónico BRILER y no se reescriben ni se eliminan en esta fase

No aporta, y no debe heredarse como tesis:

- Identidad DEVIT506
- Geografía limitada a Costa Rica / Latinoamérica
- CTO Externo como definición de marca
- SEO incompleto, legal no funcional, `localeDetection: false` y analytics ausentes como “estado aceptable de BRILER”
- Narrativas, métricas o testimonios de los casos DEVIT506 como evidencia BRILER

---

## 11. Dirección visual

Dirección aprobada para traducción futura a producción:

**D2 — BRILER Intelligent Systems**

El prototipo estático en `public/lab/briler-d/` es **referencia visual e interactiva**, no código productivo.

Principios visuales aprobados:

- identidad dark-led;
- geometría derivada del isotipo BRILER (horizontales, 45°, convergencia, curva de resolución);
- Resolution Field como firma visual principal;
- azul/cian como señal y energía;
- violeta reservado principalmente para resolución;
- Sora + Inter como foundation tipográfica actual;
- JetBrains Mono solo como microdetalle técnico cuando aporte valor;
- pain-first y CEO-first, con profundidad técnica progresiva;
- Business Problems como entrada al ecosistema;
- proceso `Understand → Design → Build → Take to production`;
- tesis visual `señales dispersas → arquitectura → sistema funcionando`.

**MADE Outer Sans no es tipografía productiva.** El archivo disponible corresponde a licencia PERSONAL USE y no debe empaquetarse ni usarse comercialmente mientras no exista licencia compatible.

La implementación productiva de esta dirección sigue pendiente. Este brief no autoriza portar el prototipo ni sustituir la Home actual.
