import moment from 'moment';

export function calcularDiferenciaDeTiempo(fecha: string | Date) {
    const fechaMoment = moment(fecha);
    const ahora = moment();

    // Calcular la diferencia total en milisegundos
    const diferenciaTotal = ahora.diff(fechaMoment);

    // Validar si no ha pasado tiempo
    if (diferenciaTotal < 0) {
        return 'La fecha es en el futuro.';
    }

    // Calcular años, meses, días, horas y minutos
    const años = ahora.diff(fechaMoment, 'years');
    const meses = ahora.diff(fechaMoment.add(años, 'years'), 'months');
    const días = ahora.diff(fechaMoment.add(meses, 'months'), 'days');
    const horas = ahora.diff(fechaMoment.add(días, 'days'), 'hours');
    const minutos = ahora.diff(fechaMoment.add(horas, 'hours'), 'minutes');

    let fechaTexto = '';

    // Comprobar y construir el texto según la diferencia
    if (años > 0) {
      let añosTexto = años > 1 ? `${años} años` : `${años} año`;
        fechaTexto += añosTexto;
    }
    if (meses > 0) {
      let mesesTexto = meses > 1 ? `${meses} meses` : `${meses} mes`;
        fechaTexto += (fechaTexto ? ', ' : '') + `${mesesTexto}`;
    }
    if (días > 0) {
      if (!fechaTexto) {
        let díasTexto = días > 1 ? `${días} días` : `${días} día`;
        fechaTexto += (fechaTexto ? ', ' : '') + `${díasTexto}`;
        if (horas > 0) {
          let horasTexto = horas > 1 ? `${horas} horas` : `${horas} hora`;
          fechaTexto += (fechaTexto ? ', ' : '') + `${horasTexto}`;
        }
        if (minutos > 0) {
          let minutosTexto = minutos > 1 ? `${minutos} minutos` : `${minutos} minuto`;
          fechaTexto += (fechaTexto ? ', ' : '') + `${minutosTexto}`;
        }
      } 
    } else {
      if (horas > 0) {
        let horasTexto = horas > 1 ? `${horas} horas` : `${horas} hora`;
        fechaTexto += (fechaTexto ? ', ' : '') + `${horasTexto}`;
      }
      if (minutos > 0) {
        let minutosTexto = minutos > 1 ? `${minutos} minutos` : `${minutos} minuto`;
        fechaTexto += (fechaTexto ? ', ' : '') + `${minutosTexto}`;
      }
    }

    // Si no ha pasado nada, mostrar "0 minutos"
    if (!fechaTexto) {
        fechaTexto = '0 minutos';
    }

    return fechaTexto;
}