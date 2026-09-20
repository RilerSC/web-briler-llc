import { NextRequest, NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import "isomorphic-fetch";
import { z } from "zod";

// Schema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  company: z.string().min(2, "La empresa debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  countryCode: z.string().optional(), // Código de país (ej: "CR")
  phone: z.string().optional(), // Número de teléfono (opcional)
  contactPreference: z.enum(["email", "phone"]).optional(), // Preferencia de contacto
  language: z.enum(["es", "en"]).optional(), // Idioma preferido
  challenge: z.string().min(10, "Por favor describe tu desafío con más detalle (mínimo 10 caracteres)"),
  website_url: z.string().optional(), // Honeypot anti-spam (debe estar vacío)
});

// Mapa completo de códigos de país a códigos de área
const countryDialCodes: Record<string, string> = {
  CR: "+506", AF: "+93", AL: "+355", DE: "+49", AD: "+376", AO: "+244",
  AG: "+1268", SA: "+966", DZ: "+213", AR: "+54", AM: "+374", AU: "+61",
  AT: "+43", AZ: "+994", BS: "+1242", BD: "+880", BB: "+1246", BH: "+973",
  BE: "+32", BZ: "+501", BJ: "+229", BY: "+375", BO: "+591", BA: "+387",
  BW: "+267", BR: "+55", BN: "+673", BG: "+359", BF: "+226", BI: "+257",
  BT: "+975", CV: "+238", KH: "+855", CM: "+237", CA: "+1", QA: "+974",
  TD: "+235", CL: "+56", CN: "+86", CY: "+357", CO: "+57", KM: "+269",
  KP: "+850", KR: "+82", CI: "+225", HR: "+385", CU: "+53", DK: "+45",
  DM: "+1767", EC: "+593", EG: "+20", SV: "+503", AE: "+971", ER: "+291",
  SK: "+421", SI: "+386", ES: "+34", US: "+1", EE: "+372", SZ: "+268",
  ET: "+251", PH: "+63", FI: "+358", FJ: "+679", FR: "+33", GA: "+241",
  GM: "+220", GE: "+995", GH: "+233", GD: "+1473", GR: "+30", GT: "+502",
  GN: "+224", GQ: "+240", GW: "+245", GY: "+592", HT: "+509", HN: "+504",
  HU: "+36", IN: "+91", ID: "+62", IQ: "+964", IR: "+98", IE: "+353",
  IS: "+354", IL: "+972", IT: "+39", JM: "+1876", JP: "+81", JO: "+962",
  KZ: "+7", KE: "+254", KG: "+996", KI: "+686", KW: "+965", LA: "+856",
  LS: "+266", LV: "+371", LB: "+961", LR: "+231", LY: "+218", LI: "+423",
  LT: "+370", LU: "+352", MK: "+389", MG: "+261", MY: "+60", MW: "+265",
  MV: "+960", ML: "+223", MT: "+356", MA: "+212", MU: "+230", MR: "+222",
  MX: "+52", FM: "+691", MD: "+373", MC: "+377", MN: "+976", ME: "+382",
  MZ: "+258", MM: "+95", NA: "+264", NR: "+674", NP: "+977", NI: "+505",
  NE: "+227", NG: "+234", NO: "+47", NZ: "+64", OM: "+968", NL: "+31",
  PK: "+92", PW: "+680", PA: "+507", PG: "+675", PY: "+595", PE: "+51",
  PL: "+48", PT: "+351", PR: "+1787", GB: "+44", CF: "+236", CZ: "+420",
  CG: "+242", CD: "+243", DO: "+1809", RW: "+250", RO: "+40", RU: "+7",
  WS: "+685", KN: "+1869", SM: "+378", VC: "+1784", LC: "+1758", ST: "+239",
  SN: "+221", RS: "+381", SC: "+248", SL: "+232", SG: "+65", SY: "+963",
  SO: "+252", LK: "+94", ZA: "+27", SD: "+249", SS: "+211", SE: "+46",
  CH: "+41", SR: "+597", TH: "+66", TW: "+886", TZ: "+255", TJ: "+992",
  TL: "+670", TG: "+228", TO: "+676", TT: "+1868", TN: "+216", TM: "+993",
  TR: "+90", TV: "+688", UA: "+380", UG: "+256", UY: "+598", UZ: "+998",
  VU: "+678", VA: "+379", VE: "+58", VN: "+84", YE: "+967", DJ: "+253",
  ZM: "+260", ZW: "+263",
};

// Configurar credenciales de Azure AD
function getGraphClient() {
  const clientId = process.env.ID_APPLICATION;
  const tenantId = process.env.ID_DIRECTORY;
  const clientSecret = process.env.SECRET_KEY;

  if (!clientId || !tenantId || !clientSecret) {
    throw new Error("Faltan credenciales de Azure AD en las variables de entorno");
  }

  // Crear credenciales usando Client Secret
  const credential = new ClientSecretCredential(
    tenantId,
    clientId,
    clientSecret
  );

  // Crear auth provider
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });

  // Inicializar Graph Client
  const graphClient = Client.initWithMiddleware({
    authProvider,
  });

  return graphClient;
}

export async function POST(request: NextRequest) {
  try {
    // Parsear body
    const body = await request.json();

    // Validar con Zod
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Datos inválidos", 
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { name, company, email, countryCode, phone, contactPreference, language, challenge, website_url } = validationResult.data;

    // Formatear teléfono completo con código de área
    const dialCode = countryCode ? countryDialCodes[countryCode] || "" : "";
    const fullPhone = phone ? `${dialCode} ${phone}` : "No proporcionado";
    
    // Formatear preferencias
    const contactMethodText = contactPreference === "phone" ? "📞 Teléfono" : "📧 Correo electrónico";
    const languageText = language === "en" ? "🇺🇸 English" : "🇪🇸 Español";

    // HONEYPOT ANTI-SPAM: Si el campo website_url contiene algún valor, es un bot
    if (website_url && website_url.trim() !== "") {
      console.log("🚫 Intento de spam detectado (honeypot activado)");
      console.log(`   Campo honeypot contiene: "${website_url}"`);
      console.log(`   IP: ${request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown"}`);
      
      // Retornar éxito falso (200) para no alertar al bot
      // NO enviar email ni procesar nada
      return NextResponse.json(
        { 
          success: true, 
          message: "Mensaje enviado exitosamente. Nos pondremos en contacto pronto." 
        },
        { status: 200 }
      );
    }

    // Verificar que el email emisor esté configurado
    const senderEmail = process.env.OFFICE365_SENDER_EMAIL;
    if (!senderEmail) {
      console.error("ERROR: OFFICE365_SENDER_EMAIL no configurado");
      return NextResponse.json(
        { error: "Configuración de email no disponible" },
        { status: 500 }
      );
    }

    // Log de inicio de envío con buzón compartido
    console.log("📧 Iniciando envío de email desde buzón compartido/usuario:");
    console.log(`   Buzón emisor: ${senderEmail}`);
    console.log(`   Contacto: ${name} (${company})`);
    console.log(`   Email cliente: ${email}`);
    console.log(`   Teléfono: ${fullPhone}`);
    console.log(`   Preferencia: ${contactMethodText} | Idioma: ${languageText}`);

    // Obtener cliente de Graph API
    const graphClient = getGraphClient();

    // Preparar el mensaje
    // Flujo circular optimizado:
    // - Emisor: OFFICE365_SENDER_EMAIL (buzón compartido)
    // - Receptor: OFFICE365_SENDER_EMAIL (mismo buzón compartido)
    // - Reply-To: email del cliente (para respuesta directa)
    // Ventajas: Hub centralizado de leads, visibilidad para todo el equipo, sin costos de licencia
    const message = {
      message: {
        subject: `[BRILER Web] Nuevo contacto de ${company}`,
        body: {
          contentType: "HTML",
          content: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #000012; 
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 0;
    }
    .header { 
      background-color: #0071F6; 
      color: white; 
      padding: 30px 20px; 
      text-align: center; 
      border-radius: 8px 8px 0 0; 
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content { 
      background-color: #f9f9f9; 
      padding: 30px 20px; 
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
    }
    .field { 
      margin-bottom: 25px; 
    }
    .label { 
      font-weight: bold; 
      color: #000012; 
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value { 
      color: #555; 
      font-size: 16px;
      line-height: 1.5;
    }
    .challenge-box { 
      background-color: white; 
      padding: 20px; 
      border-left: 4px solid #0071F6; 
      margin-top: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .footer { 
      background-color: #000012; 
      color: #999; 
      padding: 20px; 
      text-align: center; 
      font-size: 12px; 
      border-radius: 0 0 8px 8px; 
    }
    .footer p {
      margin: 5px 0;
    }
    .footer strong {
      color: #0071F6;
    }
    .email-link {
      color: #0071F6;
      text-decoration: none;
      font-weight: 500;
    }
    .email-link:hover {
      text-decoration: underline;
    }
    .divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BRILER</h1>
      <p>Nuevo contacto desde la web</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">Nombre completo</div>
        <div class="value">${name}</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="field">
        <div class="label">Empresa</div>
        <div class="value">${company}</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="field">
        <div class="label">Email de contacto</div>
        <div class="value">
          <a href="mailto:${email}" class="email-link">${email}</a>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="field">
        <div class="label">Teléfono</div>
        <div class="value">${fullPhone}</div>
      </div>
      
      <div class="divider"></div>
      
      <div style="display: flex; gap: 40px; margin-bottom: 25px;">
        <div class="field" style="flex: 1; margin-bottom: 0;">
          <div class="label">Contactar por</div>
          <div class="value">${contactMethodText}</div>
        </div>
        <div class="field" style="flex: 1; margin-bottom: 0;">
          <div class="label">Idioma preferido</div>
          <div class="value">${languageText}</div>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="field">
        <div class="label">Desafío Tecnológico</div>
        <div class="challenge-box">
          ${challenge.replace(/\n/g, "<br>")}
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Fecha de recepción:</strong> ${new Date().toLocaleString("es-CR", { 
        timeZone: "America/Costa_Rica",
        dateStyle: "full",
        timeStyle: "short"
      })}</p>
      <p style="margin-top: 15px;">BRILER — Intelligent Systems</p>
      <p>San José, Costa Rica</p>
    </div>
  </div>
</body>
</html>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              // CRÍTICO: Usar el mismo buzón como receptor
              // Esto crea un hub centralizado donde todo el equipo de ventas
              // puede ver los leads entrantes sin necesidad de reenvíos
              address: senderEmail,
            },
          },
        ],
        replyTo: [
          {
            emailAddress: {
              // CRÍTICO: Reply-To apunta al cliente
              // Al hacer clic en "Responder" desde el buzón compartido,
              // el email va directo al cliente (no al buzón no-reply)
              address: email, // Email del cliente desde el formulario
              name: name,     // Nombre del cliente
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    // Enviar email usando Graph API desde buzón específico
    // Flujo circular: Buzón compartido envía Y recibe (hub centralizado de leads)
    console.log(`📤 Enviando vía endpoint: /users/${senderEmail}/sendMail`);
    console.log(`   🔄 Flujo circular: ${senderEmail} → ${senderEmail}`);
    
    await graphClient
      .api(`/users/${senderEmail}/sendMail`)
      .post(message);

    console.log("✅ Email interno enviado exitosamente vía Microsoft Graph API");
    console.log(`   📧 Tipo: Buzón Compartido (hub centralizado)`);
    console.log(`   📤 Emisor: ${senderEmail}`);
    console.log(`   📥 Receptor: ${senderEmail} (mismo buzón)`);
    console.log(`   ↩️  Reply-To: ${email} (${name} - ${company})`);
    console.log(`   📋 Asunto: [BRILER Web] Nuevo contacto de ${company}`);
    console.log(`   ✨ Lead enviado y recibido en buzón compartido centralizado`);
    console.log(`   👥 Visible para todo el equipo de ventas`);

    // AUTO-RESPONDER: Enviar confirmación automática al cliente
    console.log(`📧 Enviando auto-responder al cliente: ${email}`);
    
    const autoResponderMessage = {
      message: {
        subject: "Recibimos su consulta - BRILER",
        body: {
          contentType: "HTML",
          content: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #000012; 
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container { 
      max-width: 600px; 
      margin: 40px auto; 
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header { 
      background-color: #000012; 
      color: white; 
      padding: 40px 30px; 
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .brand-accent {
      color: #0071F6;
    }
    .header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content { 
      padding: 40px 30px; 
    }
    .greeting {
      font-size: 18px;
      color: #000012;
      margin-bottom: 20px;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 25px;
      border-left: 4px solid #0071F6;
      margin: 25px 0;
      font-size: 16px;
      line-height: 1.8;
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 14px;
      color: #666;
    }
    .footer { 
      background-color: #f9f9f9; 
      padding: 25px 30px; 
      text-align: center; 
      font-size: 13px;
      color: #666;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #0071F6;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BRILER</h1>
      <p>Intelligent Systems</p>
    </div>
    
    <div class="content">
      <p class="greeting">Hola <strong>${name}</strong>,</p>
      
      <div class="message-box">
        Recibimos su consulta sobre <strong>${company}</strong> y agradecemos su interés en nuestros servicios.
        <br><br>
        Un consultor de BRILER revisará su consulta y se pondrá en contacto con usted
        en las próximas <strong>24 horas</strong> para discutir cómo podemos ayudarle.
      </div>
      
      <p>
        Mientras tanto, si tiene alguna pregunta urgente, no dude en responder directamente a este correo.
      </p>
      
      <div class="signature">
        <p><strong>BRILER</strong> — Intelligent Systems</p>
        <p>Costa Rica · United States · Spain</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Este es un mensaje automático. Por favor no responder a ${senderEmail}.</p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} BRILER. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              address: email, // Email del cliente
              name: name,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    // Enviar auto-responder al cliente
    await graphClient
      .api(`/users/${senderEmail}/sendMail`)
      .post(autoResponderMessage);

    console.log("✅ Auto-responder enviado al cliente");
    console.log(`   📤 Emisor: ${senderEmail}`);
    console.log(`   📥 Destinatario: ${email} (${name})`);
    console.log(`   📋 Asunto: Recibimos su consulta - BRILER`);

    return NextResponse.json(
      { 
        success: true, 
        message: "Mensaje enviado exitosamente. Nos pondremos en contacto pronto." 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error al enviar email vía Graph API:", error);
    
    // Log detallado para debugging
    if (error.statusCode) {
      console.error(`   Status Code: ${error.statusCode}`);
    }
    if (error.code) {
      console.error(`   Error Code: ${error.code}`);
    }
    if (error.message) {
      console.error(`   Message: ${error.message}`);
    }
    if (error.body) {
      console.error(`   Body: ${JSON.stringify(error.body, null, 2)}`);
    }

    // Mensajes de error específicos
    let errorMessage = "Error al enviar el mensaje. Por favor intenta nuevamente o contáctanos directamente.";
    
    if (error.statusCode === 401) {
      console.error("   → Error de autenticación. Verificar credenciales de Azure AD.");
      errorMessage = "Error de autenticación con Microsoft 365. Por favor contacta al administrador.";
    } else if (error.statusCode === 403) {
      console.error("   → Permisos insuficientes. Verificar que:");
      console.error("      1. La app tenga Mail.Send permission con admin consent");
      console.error("      2. El buzón compartido tenga permisos de envío");
      console.error(`      3. La app pueda acceder al buzón: ${process.env.OFFICE365_SENDER_EMAIL}`);
      errorMessage = "Permisos insuficientes para enviar email desde buzón compartido. Por favor contacta al administrador.";
    } else if (error.code === "MailboxNotEnabledForRESTAPI") {
      console.error("   → Mailbox no habilitado para Graph API.");
      console.error(`      Buzón: ${process.env.OFFICE365_SENDER_EMAIL}`);
      console.error("      Verificar que el buzón tenga licencia Exchange Online.");
      errorMessage = "El buzón compartido no está habilitado para API. Por favor contacta al administrador.";
    } else if (error.code === "ErrorAccessDenied" || error.message?.includes("Access denied")) {
      console.error("   → Acceso denegado al buzón compartido.");
      console.error(`      Buzón: ${process.env.OFFICE365_SENDER_EMAIL}`);
      console.error("      Verificar que la aplicación tenga permisos para este buzón específico.");
      errorMessage = "Acceso denegado al buzón compartido. Por favor contacta al administrador.";
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}
