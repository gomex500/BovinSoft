import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { AddCattleModal } from '../components/Bovine/AddCattleModal';
import { useFincaStore } from '../store/fincaStore';
import { useAuthStore } from '../store/authStore';
import { useSnackbarStore } from '../store/snackbarStore';
import { TOKEN_TEST } from '@env';
import { IBovine } from '../interfaces/Livestock';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { Text } = require('react-native');

  // Mock del componente DateTimePicker
  const MockedDateTimePicker = ({ value, onChange }: { value: Date; onChange: (event: any, date: Date) => void }) => {
    const handlePress = () => {
      onChange({ nativeEvent: {} }, new Date('2023-01-01')); // Simular selección de fecha
    };

    return (
      <Text onPress={handlePress}>
        DateTimePicker Mock: {value?.toISOString()}
      </Text>
    );
  };

  return {
    __esModule: true, // Permite usar "default" correctamente
    default: MockedDateTimePicker,
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    __esModule: true,
    default: {
      setItem: jest.fn(() => Promise.resolve()),
      getItem: jest.fn(() => Promise.resolve(null)),
      removeItem: jest.fn(() => Promise.resolve()),
      clear: jest.fn(() => Promise.resolve()),
    },
  };
});

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
  };
});

jest.mock('../store/authStore', () => ({
  useAuthStore: {
    getState: jest.fn(() => ({
      user: { _id: '67129238732d53dfe8e112e1', rol: 'USER' },
      token: TOKEN_TEST,
    }))
  }
}))

jest.mock('../store/snackbarStore', () => ({
  useSnackbarStore: {
    getState: jest.fn(() => ({
      dispatchSnackbar: jest.fn(),
    }))
  }
}))

jest.mock('../store/fincaStore', () => ({
  useFincaStore: {
    getState: jest.fn(() => ({
      obtenerFincaPorUsuario: jest.fn(),
      fincas: [{ _id: '1', nombre: 'Finca Uno' }],
      fincaSelected: { _id: '1', nombre: 'Finca Uno' },
    }))
  }
}))

describe('AddCattleModal', () => {
  beforeEach(() => {
    (useFincaStore.getState as jest.Mock).mockImplementation(() => ({
      obtenerFincaPorUsuario: jest.fn(),
      fincas: [{ _id: '1', nombre: 'Finca Uno' }],
      fincaSelected: { _id: '1', nombre: 'Finca Uno' },
    }));

    // Mock de useAuthStore
    (useAuthStore.getState as jest.Mock).mockImplementation(() => ({
      user: { _id: '67129238732d53dfe8e112e1', rol: 'USER' },
      token: TOKEN_TEST
    }));

    (useSnackbarStore.getState as jest.Mock).mockImplementation(() => ({
      dispatchSnackbar: jest.fn(),
    }));
  });

  it('renders correctly when visible', () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <PaperProvider theme={DefaultTheme}>
        <AddCattleModal visible={true} onClose={jest.fn()} onAdd={jest.fn()} />
      </PaperProvider>
  );

    expect(screen.getByText('Añadir nuevo ganado')).toBeTruthy();
    expect(screen.getByTestId('Name')).toBeTruthy();
  });

  it('validates form fields and shows errors', async () => {
    const onAddMock = jest.fn();
    const { getByPlaceholderText, getByText, findByText } = render(
      <PaperProvider theme={DefaultTheme}>
        <AddCattleModal visible={true} onClose={jest.fn()} onAdd={onAddMock} />
      </PaperProvider>
  );

    fireEvent.press(screen.getByText('Crear')); // Intentar enviar sin completar el formulario

    // Espera a que aparezcan los mensajes de error
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeTruthy();
      expect(screen.getByText('Breed is required')).toBeTruthy();
      expect(screen.getByText('Weight must be greater than 0')).toBeTruthy();
      expect(screen.getByText('Image is required')).toBeTruthy();
    });
  });

  it('submits the form when valid', async () => {
    const onAddMock = jest.fn();
    const { getByPlaceholderText, getByText, findByText } = render(
      <PaperProvider theme={DefaultTheme}>
        <AddCattleModal visible={true} onClose={jest.fn()} onAdd={onAddMock} />
      </PaperProvider>
    );

    // Completar los campos del formulario
    fireEvent.changeText(screen.getByTestId('Name'), 'Bessie');
    fireEvent.changeText(screen.getByTestId('Image'), 'https://example.com/image.jpg');
    fireEvent.changeText(screen.getByTestId('Breed'), 'Holstein');
    fireEvent.changeText(screen.getByTestId('Weight'), '500');

    // Enviar el formulario
    fireEvent.press(screen.getByText('Crear'));

    await waitFor(() => {
      expect(onAddMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Bessie',
          image: 'https://example.com/image.jpg',
          breed: 'Holstein',
          weight: 500,
        })
      );
    });
  });

  it('displays loading indicator while submitting', async () => {
    const onAddMock: jest.Mock<Promise<void>, [IBovine]> = jest.fn(async (animal: IBovine) => {
      return new Promise((resolve) => setTimeout(resolve, 1000)); // Simular retraso
    });
    
    const { getByPlaceholderText, getByText, findByText } = render(
      <PaperProvider theme={DefaultTheme}>
        <AddCattleModal visible={true} onClose={jest.fn()} onAdd={onAddMock} />
      </PaperProvider>
    );

     // Completar los campos del formulario
     fireEvent.changeText(screen.getByTestId('Name'), 'Bessie');
     fireEvent.changeText(screen.getByTestId('Image'), 'https://example.com/image.jpg');
     fireEvent.changeText(screen.getByTestId('Breed'), 'Holstein');
     fireEvent.changeText(screen.getByTestId('Weight'), '500');
    fireEvent.press(screen.getByText('Crear'));

    expect(screen.getByTestId('activity-indicator')).toBeTruthy(); // Indicador de carga

    await waitFor(() => {
      expect(onAddMock).toHaveBeenCalled();
    });
  });

  it('calls onClose when cancel button is pressed', () => {
    const onCloseMock = jest.fn();
    
    render(<PaperProvider theme={DefaultTheme}>
      <AddCattleModal visible={true} onClose={onCloseMock} onAdd={jest.fn()} />
    </PaperProvider>);

    fireEvent.press(screen.getByText('Cancelar'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
