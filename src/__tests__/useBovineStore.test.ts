import { act } from '@testing-library/react'
import { useBovinosStore } from '../store/useBovinoStore'
import { BovinoModel } from '../interfaces/IBovino'
import { agregarBovinoService, obtenerGanadoPorFincaServices, obtenerGanadoPorUsuarioServices } from '../services/bovinosService'
import { TOKEN_TEST } from '@env'
import { useAuthStore } from '../store/authStore'
import { IBovine } from '../interfaces/Livestock'

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

// Simular los servicios
jest.mock('../services/bovinosService', () => ({
  agregarBovinoService: jest.fn(),
  obtenerGanadoPorUsuarioServices: jest.fn(),
  obtenerGanadoPorFincaServices: jest.fn(),
}))

jest.mock('../store/authStore', () => ({
  useAuthStore: {
    getState: jest.fn()
  }
}))


describe('useBovinosStore', () => {
  beforeEach(() => {
    // Limpiar el store antes de cada prueba
    useBovinosStore.setState({ bovinos: [] });
    (useAuthStore.getState as jest.Mock).mockImplementation(() => ({
      user: { _id: '67129238732d53dfe8e112e1' },
      token: TOKEN_TEST
    }))
  })

  it('debería iniciar con un array vacío de bovinos', () => {
    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toEqual([])
  })

  it('debería agregar un bovino correctamente', async () => {
    const nuevoBovino:IBovine =  {
      id: '1',
      name: 'Angus',
      identifier: 'C001',
      breed: 'Angus',
      dateOfBirth: '2020-05-15',
      status: 'saludable',
      farmStr: 'North Pasture',
      weight: 550,
      gender: 'hembra',
      image:
        'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
      type: 'carne',
      farmId: 'North Pasture',

    };

    (agregarBovinoService as jest.Mock).mockResolvedValue(nuevoBovino)

    const crearGanado = useBovinosStore.getState().crearGanado

    const resultado = await crearGanado(nuevoBovino)

    expect(resultado).toBe(true)
    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toContainEqual(nuevoBovino)
  })

  it('debería manejar el error al agregar un bovino', async () => {
    const nuevoBovino:IBovine =  {
      id: '1',
      name: 'Angus',
      identifier: 'C001',
      breed: 'Angus',
      dateOfBirth: '2020-05-15',
      status: 'saludable',
      farmStr: 'North Pasture',
      weight: 550,
      gender: 'hembra',
      image:
        'https://enciclopediaiberoamericana.com/wp-content/uploads/2022/01/vaca.jpg',
      type: 'carne',
      farmId: 'North Pasture',

    };

    (agregarBovinoService as jest.Mock).mockRejectedValue(
      new Error('Error al agregar')
    )

    const crearGanado = useBovinosStore.getState().crearGanado

    const resultado = await crearGanado(nuevoBovino)

    expect(resultado).toBe(false)
    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toHaveLength(0)
  })

  it('debería obtener ganado por usuario', async () => {
    const bovinosMock = [
      {
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
      },
    ];

    (obtenerGanadoPorUsuarioServices as jest.Mock).mockResolvedValue(
      bovinosMock
    )

    const obtenerGanadoPorUsuario =
      useBovinosStore.getState().obtenerGanadoPorUsuario

    await act(async () => {
      await obtenerGanadoPorUsuario()
    })

    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toEqual(bovinosMock);
  })

  it('debería manejar el error al obtener ganado por usuario', async () => {
    (obtenerGanadoPorUsuarioServices as jest.Mock).mockRejectedValue(
      new Error('Error al obtener')
    )

    const obtenerGanadoPorUsuario =
      useBovinosStore.getState().obtenerGanadoPorUsuario

    await act(async () => {
      await obtenerGanadoPorUsuario()
    })

    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toEqual([])
  })

  it('debería obtener ganado por finca', async () => {
    const fincaId = 'finca-1'
    const bovinosMock = [{ id: '2', nombre: 'Vaca 2' }];

    (obtenerGanadoPorFincaServices as jest.Mock).mockResolvedValue(bovinosMock)

    const obtenerGanadoPorFinca =
      useBovinosStore.getState().obtenerGanadoPorFinca

    await act(async () => {
      await obtenerGanadoPorFinca(fincaId)
    })

    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toEqual(bovinosMock)
  })

  it('debería manejar el error al obtener ganado por finca', async () => {
    const fincaId = 'finca-1';

    (obtenerGanadoPorFincaServices as jest.Mock).mockRejectedValue(
      new Error('Error al obtener')
    )

    const obtenerGanadoPorFinca =
      useBovinosStore.getState().obtenerGanadoPorFinca

    await act(async () => {
      await obtenerGanadoPorFinca(fincaId)
    })

    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toEqual([]) // Asumiendo que el estado no cambia en caso de error
  })
})
