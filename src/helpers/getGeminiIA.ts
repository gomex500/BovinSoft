export const getMonicaResponse = async (userInput) => {
  const apiKey = 'AIzaSyBDSmQgTV4Q0f3dtU-UHvYa6NYQ2vjSTzA';  // Asegúrate de reemplazar con tu clave de API real
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
                  parts: [{ text: prompt }]  // Se envía el prompt completo con el contexto y el input del usuario
              }]
          }),
      });

      // Convertir la respuesta a JSON
      const data = await response.json();

      // Extraer el texto de la respuesta
      const aiText = data.candidates[0].content.parts[0].text;
      console.log('AI Response:', aiText);
      return aiText; // Devuelve el texto para usarlo en la conversación
  } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Lo siento, hubo un problema al obtener la respuesta del chatbot.'; // Mensaje de error para mostrar al usuario
  }
};