export const getMonicaResponse = async (userInput) => {
  const apiKey = 'AIzaSyBDSmQgTV4Q0f3dtU-UHvYa6NYQ2vjSTzA';  // Asegúrate de reemplazar con tu clave de API real
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const maxRetries = 3; // Número máximo de reintentos
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const prompt = `
      Eres un asistente virtual llamado Monica de un aplicacion llamada bovinsoft pero no es necesario que menciones tu nombre todo el tiempo, esta aplicacion cuenta con metricas de clima para fechas futuras, con estos datos puedes recomendar actividades ganaderas, las actividades deben estar relacionadas con el tipo de clima, el usuario te dara un tipo de clima y tu deberas recomendar una lista de actividades ganaderas para ese tipo de clima, ademas puedes utilizar emojin, para mas iteractivo
          
          El usuario ha dicho: "${userInput}". 
          Responde de manera detallada y coherente a la consulta del usuario.
      `;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });

      // Convertir la respuesta a JSON
      const data = await response.json();

      // Verifica que la respuesta tenga la estructura esperada
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const aiText = data.candidates[0].content.parts[0].text;
        return aiText; // Devuelve el texto para usarlo en la conversación
      } else {
        console.error('Unexpected response structure:', data);
        return 'Lo siento, no pude procesar la respuesta del chatbot. Intenta de nuevo más tarde.'; // Mensaje de error para mostrar al usuario
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      
      // Manejo de errores específicos
      if (error.message.includes("503")) {
        attempt++;
        console.log(`Intento ${attempt} fallido. Reintentando...`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos antes de reintentar
      } else {
        return 'Lo siento, hubo un problema al obtener la respuesta del chatbot.'; // Mensaje de error para mostrar al usuario
      }
    }
  }

  return 'Lo siento, el servicio está actualmente no disponible. Por favor, intenta de nuevo más tarde.'; // Mensaje final si se superan los reintentos
};