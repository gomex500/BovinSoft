import { act } from '@testing-library/react'
import { useBovinosStore } from '../store/useBovinoStore'
import { BovinoModel } from '../interfaces/IBovino'
import { useUserStore } from '../store/userStore'
import { agregarBovinoService, obtenerGanadoPorFincaServices, obtenerGanadoPorUsuarioServices } from '../services/bovinosService'

// Simular los servicios
jest.mock('../services/bovinosService', () => ({
  agregarBovinoService: jest.fn(),
  obtenerGanadoPorUsuarioServices: jest.fn(),
  obtenerGanadoPorFincaServices: jest.fn(),
}))

jest.mock('../store/userStore', () => ({
  useUserStore: {
    getState: jest.fn()
  }
}))


describe('useBovinosStore', () => {
  beforeEach(() => {
    // Limpiar el store antes de cada prueba
    useBovinosStore.setState({ bovinos: [] });
    (useUserStore.getState as jest.Mock).mockImplementation(() => ({
      user: { _id: '67129238732d53dfe8e112e1' },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTI5MjM4NzMyZDUzZGZlOGUxMTJlMSIsIm5vbWJyZSI6Ikp1bmlvciBVbGlzZXMiLCJhcGVsbGlkbyI6ImdvbnphbGV6IiwiZmVjaGFfbmFjaW1pZW50byI6IllZWVktTU0tREQiLCJlbWFpbCI6ImdvbWV6ZnJlZGR5ODg2QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJEJHMVBRRFl5VlFHb21aNnJWb0Q5RnVMZDhsUGtuN1REZFhoN29VNldCdEtZdGJYNC5FZldTIiwidGVsZWZvbm8iOiIrNTA1IDgyODEgNjYzIiwicm9sIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJqdWlnYWxwYSwgY2hvbnRhbGVzIiwidGlwb1N1c2NyaXBjaW9uIjoibWVuc3VhbCIsImV4cCI6MTczMjIzNTEzNn0.LjCWpXPxIlJx0QGuOsgNUmTZ8GuaBkUXWTWYIRwLhOs'
    }))
  })

  it('debería iniciar con un array vacío de bovinos', () => {
    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toEqual([])
  })

  it('debería agregar un bovino correctamente', async () => {
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
    }; // Asegúrate de que este modelo coincida con tu definición.

    (agregarBovinoService as jest.Mock).mockResolvedValue(nuevoBovino)

    const crearGanado = useBovinosStore.getState().crearGanado

    const resultado = await crearGanado(nuevoBovino)

    expect(resultado).toBe(true)
    const { bovinos } = useBovinosStore.getState()
    expect(bovinos).toContainEqual(nuevoBovino)
  })

  it('debería manejar el error al agregar un bovino', async () => {
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
