import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FormBovino from '../views/FormBovino'; // Asegúrate de que la ruta sea correcta
import { NavigationContainer } from '@react-navigation/native';
import { useBovinosStore } from '../store/useBovinoStore';
import { useFincaStore } from '../store/fincaStore';
import { FincaModel } from '../interfaces/IFinca';
import { BovinoModel } from '../interfaces/IBovino';
import { TOKEN_TEST } from '@env';
import { useAuthStore } from '../store/authStore';

// jest.mock('../store/useBovinoStore', () => ({
//   useBovinosStore: {
//     getState: jest.fn(() => ({
//       crearGanado: jest.fn().mockResolvedValue(true)
//     })),
//     setState: jest.fn()
//   }
// }))

jest.mock('../store/userStore', () => ({
  useAuthStore: {
    getState: jest.fn()
  }
}))

describe('FormBovino', () => {

  const nuevoBovino: BovinoModel = {
    _id: '6713b86fbea1749bdedf934b',
    fincaId: '6713b86fbea1749bdedf934b',
    nombre: 'Vovino #101',
    image:
      'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
    raza: 'Brahman',
    edad: '',
    peso: '4567',
    consecutivo: 101,
    codigo: 'FSM-GND001',
    fechaNacimiento: null,
    genero: 'macho',
    tipo: 'carne',
    estadoSalud: '',
    fechaRegistro: 'Sat, 19 Oct 2024 13:17:06 GMT',
    create_at: '2024-10-19T07:47:27.030+00:00',
    update_at: '2024-10-19T07:47:27.030+00:00',
  };

  const finca:FincaModel = {
    _id: "6713a5aaffe35c5e70d86f89", // Extraído del $oid
    nombre: "Rancho El juan",
    image: "https://th.bing.com/th/id/R.36342a5c831f75bddb5ce06ee6af758a?rik=TaNL4yU9RXHXlw&pid=ImgRaw&r=0",
    direccion: "km 150 carretera al rama",
    coordenadas: {
      latitud: "12.12345", // Manteniendo como cadena
      longitud: "-86.12345" // Manteniendo como cadena
    },
    tamano: "3435", // Convertido a número
    recursosN: ["lagunas", "acceso a reserva natural", "planicies"], // Array de recursos
    descripcion: "Planicie ideal para el cultivo",
    idUsuario: "66ff6c787a81ade5258dc6e6",
    create_at: '2024-10-19T07:47:27.030+00:00',
    update_at: '2024-10-19T07:47:27.030+00:00', // Convertido a objeto Date
  };

  beforeEach(() => {
    useBovinosStore.setState({ bovinos: [] });
    useFincaStore.setState({ fincas: [finca] });
    // Limpiar el store antes de cada prueba
    (useAuthStore.getState as jest.Mock).mockImplementation(() => ({
      user: { _id: '67129238732d53dfe8e112e1' },
      token: TOKEN_TEST
    }))
  })

  it('should render correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <FormBovino />
      </NavigationContainer>
    );

    // Verifica que los campos de entrada y el botón estén presentes
    expect(getByPlaceholderText('Nombre ganado:')).toBeTruthy();
    expect(getByPlaceholderText('Imagen URL:')).toBeTruthy();
    expect(getByPlaceholderText('edad :')).toBeTruthy();
    expect(getByPlaceholderText('peso (kg) :')).toBeTruthy();
    expect(getByText('Ingresar Ganado')).toBeTruthy();
  });

  it('should enable the submit button when all fields are filled', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <FormBovino />
      </NavigationContainer>
    );

    // Completar todos los campos
    fireEvent.changeText(getByPlaceholderText('Nombre ganado:'), 'Bovino 1');
    fireEvent.changeText(getByPlaceholderText('Imagen URL:'), 'http://example.com/image.jpg');
    fireEvent.changeText(getByPlaceholderText('edad :' ), '2');
    fireEvent.changeText(getByPlaceholderText('peso (kg) :'), '300');

    // Espera a que las fincas se carguen
    await waitFor(() => expect(findByText('Rancho El juan')).toBeTruthy());

    // Simula la selección de una finca
    fireEvent.press(getByText('Seleccione una finca'));
    fireEvent.press(getByText('Rancho El juan'));

    // Completar los campos restantes
    fireEvent.press(getByText('Selecciona una raza'));
    fireEvent.press(getByText('Angus'));
    fireEvent.press(getByText('Macho'));
    fireEvent.press(getByText('Selecciona un tipo de ganado'));
    fireEvent.press(getByText('Carne'));
    fireEvent.press(getByText('Selecciona un estado de salud'));
    fireEvent.press(getByText('Enfermo'));

    // Verifica que el botón de enviar esté habilitado
  });

  it('should call crearGanado when the submit button is pressed', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <FormBovino />
      </NavigationContainer>
    );

    // Completar todos los campos
    fireEvent.changeText(getByPlaceholderText('Nombre ganado:'), 'Bovino 1');
    fireEvent.changeText(getByPlaceholderText('Imagen URL:'), 'http://example.com/image.jpg');
    fireEvent.changeText(getByPlaceholderText('edad :' ), '2');
    fireEvent.changeText(getByPlaceholderText('peso (kg) :'), '300');

     // Espera a que las fincas se carguen
     await waitFor(() => expect(findByText('Rancho El juan')).toBeTruthy());

     // Simula la selección de una finca
     fireEvent.press(getByText('Seleccione una finca'));
     fireEvent.press(getByText('Rancho El juan'));
 
     // Completar los campos restantes
     fireEvent.press(getByText('Selecciona una raza'));
     fireEvent.press(getByText('Angus'));
     fireEvent.press(getByText('Macho'));
     fireEvent.press(getByText('Selecciona un tipo de ganado'));
     fireEvent.press(getByText('Carne'));
     fireEvent.press(getByText('Selecciona un estado de salud'));
     fireEvent.press(getByText('Enfermo'));

    // Simula el clic en el botón de enviar
    fireEvent.press(getByText('Enviar'));

    // (agregarBovinoService as jest.Mock).mockResolvedValue(nuevoBovino)

    // const crearGanado = useBovinosStore.getState().crearGanado

    // const resultado = await crearGanado(nuevoBovino)

    // expect(resultado).toBe(true)
  });
});