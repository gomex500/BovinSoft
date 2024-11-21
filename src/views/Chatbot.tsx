import React, {useRef, useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Esquema from '../components/Esquema';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

interface IChatbot {
    user: string;
    message: string;
    type: string;
}

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState<IChatbot[]>([]);
    const chatboxRef = useRef<ScrollView>(null);


    const apiKey = 'AIzaSyD2CcdBui_NlNkeLgzI4-2RExw4I5R6Em8';

    // Función que obtiene la respuesta de la IA
    const getMonicaResponse = async (userInput:string) => {
        const apiKey = 'AIzaSyBDSmQgTV4Q0f3dtU-UHvYa6NYQ2vjSTzA';  // Asegúrate de reemplazar con tu clave de API real
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
        try {
            const prompt = `
            Eres un sistecia virtual llamado Monica de un aplicacion llamada bovinsoft pero no es nesesario que meniones tu nombre todo el tiempo, esta aplicacion cuneta con gestion y control de ganado, con metricas, foro, fincas, generacion de informes, alertas, el cual ayudas al usuario con preguntas en el ambito del sector agropuecuario del ganado solo del ganado bovino como enfermedades y tratamientos, razas, tipos etc , y solo hablas espanol ademas q si te preguntan algo diferente q no tiene q ver con el tema tu respondes que solo estas entrenado solo para este tema, ademas puedes utilizar emojin, para mas iteractivo
                
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

    const conversacion = async () => {
        try {
            // const response = await axios.post('https://hydrobot.onrender.com/chat', { input });
            const Usuario = {
                user: 'Tu',
                message: input,
                type: 'user',
            };

            // Llamar a la función para obtener la respuesta del bot, pasando el input del usuario
            const botResponse = await getMonicaResponse(input);

            const bot = {
                user: 'Monica',
                message: botResponse,
                type: 'bot',
            };
            setConversation((prevConversation) => [...prevConversation, Usuario, bot]);
            setInput('');
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollToEnd({ animated: true });
        }
    }, [conversation]);

    return (
        <View style={styles.container}>
            <Esquema />
            <View style={styles.chatContainer}>
                <ScrollView
                    ref={chatboxRef}
                    style={styles.chatBody}
                    contentContainerStyle={styles.chatContent}
                    showsVerticalScrollIndicator={false}
                >
                        {conversation.map((message, index) => (
                            <View key={index} style={message.type === 'user' ? styles.userMessage : styles.botMessage}>
                                <Text style={styles.messageUser}>{message.user}: </Text>
                                <Text style={styles.mes}>{message.message}</Text>
                            </View>
                        ))}
                </ScrollView>
                <View style={styles.chatFooter}>
                    <TextInput
                        style={styles.inputChat}
                        value={input}
                        placeholder="Pregunta algo..."
                        onChangeText={setInput}
                        placeholderTextColor="#c2c2c2"
                    />
                    <TouchableOpacity style={styles.btnSend} onPress={conversacion}>
                        <Icon
                            name={'cube-send'}
                            size={25}
                            color="#ffffff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },Esquema:{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
    },
    chatContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        paddingBottom:10
    },
    chatBody: {
        maxHeight: 540,
    },
    chatContent: {
        padding: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(80, 173, 102, 0.95)',
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 20,
        padding: 10,
        marginVertical: 5,
        maxWidth: '75%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(27, 71, 37, 0.9)',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
        padding: 10,
        marginVertical: 5,
        maxWidth: '75%',
    },
    messageUser: {
        fontWeight: 'bold',
        color:'#fff'
    },
    chatFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    inputChat: {
        flex: 1,
        borderRadius: 8,
        borderColor: '#1B4725',
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        fontSize: 18,
        color: '#1B4725',
        fontWeight: 'bold',
        padding: 10,
        marginRight: 10,
    },
    btnSend: {
        backgroundColor: '#1B4725',
        borderRadius: 8,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 10,
    },
    btnChat: {
        margin: 10,
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#007BFF',
    },
    btnChatText: {
        fontSize: 24,
        color: '#fff',
    },
    mes:{
        color:'#fff'
    }

});

export default Chatbot;
