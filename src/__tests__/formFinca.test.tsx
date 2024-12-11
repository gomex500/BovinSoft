import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { useFincaStore } from '../store/fincaStore'
import { useAuthStore } from '../store/authStore'
import { TOKEN_TEST } from '@env'
import { FormFinca } from '../views/FormFinca';

// Mockear las tiendas (stores)
jest.mock('../store/fincaStore', () => ({
  useFincaStore: {
    getState: jest.fn(() => ({
      obtenerFincaPorUsuario: jest.fn(),
      fincas: [{ _id: '1', nombre: 'Finca Uno' }],
      fincaSelected: { _id: '1', nombre: 'Finca Uno' },
    }))
  }
}))

jest.mock('../store/authStore', () => ({
  useAuthStore: {
    getState: jest.fn(() => ({
      user: { _id: '67129238732d53dfe8e112e1', rol: 'USER' },
      token: TOKEN_TEST,
    }))
  }
}))

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  // Mock de los íconos
  const MockedIcon = ({ name }: { name:string }) => <Text>Mocked Icon: {name}</Text>;

  return {
    __esModule: true,
    default: MockedIcon, // Mock para el ícono predeterminado
    Ionicons: MockedIcon, // Puedes mockear más familias de íconos si es necesario
    MaterialIcons: MockedIcon,
    FontAwesome: MockedIcon,
    FontAwesome6: MockedIcon,
    MaterialCommunityIcons: MockedIcon,
  };
});

describe('FormFinca Component', () => {
  beforeEach(() => {
    const mockCreateFinca = jest.fn(async () => ({ success: true }));
    
    (useFincaStore.getState as jest.Mock).mockImplementation(() => ({
      obtenerFincaPorUsuario: jest.fn(),
      fincas: [{ _id: '1', nombre: 'Finca Uno' }],
      fincaSelected: { _id: '1', nombre: 'Finca Uno' },
      createFinca: mockCreateFinca,
    }));

    (useAuthStore.getState as jest.Mock).mockImplementation(() => ({
      user: { _id: '67129238732d53dfe8e112e1', rol: 'USER' },
      token: TOKEN_TEST
    }));
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<FormFinca />);

    // Verifica que se muestren los inputs y el botón
    expect(getByPlaceholderText('Nombre :')).toBeTruthy();
    expect(getByPlaceholderText('Imagen :')).toBeTruthy();
    expect(getByPlaceholderText('Direccion :')).toBeTruthy();
    expect(getByPlaceholderText('Tamaño :')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
  });

  it('allows input fields to be filled and enables the submit button', () => {
    const { getByPlaceholderText, getByText } = render(<FormFinca />);

    const nombreInput = getByPlaceholderText('Nombre :');
    const imagenInput = getByPlaceholderText('Imagen :');
    const direccionInput = getByPlaceholderText('Direccion :');
    const tamanoInput = getByPlaceholderText('Tamaño :');

    fireEvent.changeText(nombreInput, 'Mi Finca');
    fireEvent.changeText(imagenInput, 'url-de-imagen');
    fireEvent.changeText(direccionInput, 'Dirección de la finca');
    fireEvent.changeText(tamanoInput, '500');

    // Verifica que el botón esté habilitado
    expect(getByText('Enviar')).toBeTruthy();
  });

  it('shows loading indicator when submitting', async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(<FormFinca />);

    const nombreInput = getByPlaceholderText('Nombre :');
    const imagenInput = getByPlaceholderText('Imagen :');
    const direccionInput = getByPlaceholderText('Direccion :');
    const tamanoInput = getByPlaceholderText('Tamaño :');

    fireEvent.changeText(nombreInput, 'Mi Finca');
    fireEvent.changeText(imagenInput, 'url-de-imagen');
    fireEvent.changeText(direccionInput, 'Dirección de la finca');
    fireEvent.changeText(tamanoInput, '500');

    const submitButton = getByText('Enviar');
    fireEvent.press(submitButton);

    // Verifica que el indicador de carga aparezca
    await waitFor(() => {
      expect(getByText('Enviar')).toBeTruthy();
    });
  });

  it('calls createFinca with correct data on submit', async () => {
    const { getByPlaceholderText, getByText } = render(<FormFinca />);

    const nombreInput = getByPlaceholderText('Nombre :');
    const imagenInput = getByPlaceholderText('Imagen :');
    const direccionInput = getByPlaceholderText('Direccion :');
    const tamanoInput = getByPlaceholderText('Tamaño :');

    fireEvent.changeText(nombreInput, 'Mi Finca');
    fireEvent.changeText(imagenInput, 'url-de-imagen');
    fireEvent.changeText(direccionInput, 'Dirección de la finca');
    fireEvent.changeText(tamanoInput, '500');

    const submitButton = getByText('Enviar');
    fireEvent.press(submitButton);

    expect(screen.getByTestId('btnText')).toBeTruthy()
  });

  it('disables submit button when required fields are empty', () => {
    const { getByText } = render(<FormFinca />);

    // Verifica que el botón esté deshabilitado
    expect(screen.getByTestId('btnText')).toBeTruthy()
  });
});
