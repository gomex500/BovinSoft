import { CattleReproduction, EstrusPhase, ReproductiveEventType } from "../interfaces/ReproductiveEvent";


const estrusPhases: EstrusPhase[] = [
  { name: 'Proestrus', duration: 3, color: '#FFA726' },
  { name: 'Estrus', duration: 1, color: '#FF7043' },
  { name: 'Metestrus', duration: 4, color: '#66BB6A' },
  { name: 'Diestrus', duration: 14, color: '#42A5F5' },
];

export const getEventIcon = (type: ReproductiveEventType) => {
  switch (type) {
    case 'proestrus':
      return 'heart';
    case 'insemination':
      return 'eyedropper-plus';
    case 'gestation':
      return 'baby';
    case 'parturition':
      return 'stethoscope';
    default:
      return 'calendar';
  }
};

export const getEventColor = (type: ReproductiveEventType) => {
  switch (type) {
    case 'proestrus': return '#FFA726';
    case 'insemination': return '#2196F3';
    case 'gestation': return '#4CAF50';
    case 'parturition': return '#E91E63';
    default: return '#000000';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pregnant':
      return '#4CAF50';
    case 'Recent Birth':
      return '#2196F3';
    case 'Birth':
      return '#FFC107'; // Color para el estado 'Birth'
    case 'Open':
      return '#FF9800';
    default:
      return '#000000';
  }
};

export const getDueDate = (cattle: CattleReproduction) => {
  const gestationEvents = cattle?.events?.filter(event => event.type === 'gestation') || [];
  
  if (gestationEvents.length > 0) {
    const lastGestationEvent = gestationEvents[gestationEvents.length - 1];
    const gestationStartDate = new Date(lastGestationEvent.date);
    
    // Calcular la fecha de parto sumando 285 días
    const dueDate = new Date(gestationStartDate);
    dueDate.setDate(gestationStartDate.getDate() + 285);
    
    return dueDate;
  }
  
  return null; // No hay eventos de gestación
};

export const calculateEstrusProgress = (cattle: CattleReproduction) => {
  const lastProestrusEvent = cattle.events
    .filter(event => event.type === 'proestrus')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const lastGestationEvent = cattle.events
    .filter(event => event.type === 'gestation')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // Si hay un evento de gestación o parturición, retornar el estado correspondiente
  if (lastGestationEvent) {
    return { phase: 'discontinued', progress: 1, color: '#FFB74D' }; // Color para la gestación
  }
  
  if (!lastProestrusEvent) {
    return { phase: 'Unknown', progress: 0, color: '#9E9E9E' };
  }

  const lastProestrusDate = new Date(lastProestrusEvent.date);
  const today = new Date();
  const daysSinceProestrus = Math.floor((today.getTime() - lastProestrusDate.getTime()) / (1000 * 3600 * 24));

  let accumulatedDays = 0;
  for (const phase of estrusPhases) {
    accumulatedDays += phase.duration;
    if (daysSinceProestrus < accumulatedDays) {
      const phaseProgress = (daysSinceProestrus - (accumulatedDays - phase.duration)) / phase.duration;
      return { phase: phase.name, progress: phaseProgress, color: phase.color };
    }
  }

  // If we've passed all phases, we're back to Proestrus
  const cycleLength = estrusPhases.reduce((sum, phase) => sum + phase.duration, 0);
  const daysIntoCycle = daysSinceProestrus % cycleLength;
  const proestrusProgress = daysIntoCycle / estrusPhases[0].duration;
  return { phase: 'Proestrus', progress: proestrusProgress, color: estrusPhases[0].color };
};

export const getReproductiveStatus = (cattle: CattleReproduction) => {
  const today = new Date();
  
  // Filtrar eventos de parturición
  const parturitionEvents = cattle.events.filter(event => event.type === 'parturition');
  
  if (parturitionEvents.length > 0) {
    // Obtener la fecha del último evento de parturición
    const lastParturitionEvent = parturitionEvents[parturitionEvents.length - 1];
    const lastParturitionDate = new Date(lastParturitionEvent.date);
    const daysSinceBirth = Math.floor((today.getTime() - lastParturitionDate.getTime()) / (1000 * 3600 * 24));
    
    // Definir un umbral, por ejemplo, 30 días
    const birthThreshold = 30; // Puedes ajustar este valor según tus necesidades

    if (daysSinceBirth > birthThreshold) {
      return 'Birth';
    } else {
      return 'Recent Birth';
    }
  } else if (cattle.events.some(event => event.type === 'gestation')) {
    return 'Pregnant';
  } else {
    return 'Open';
  }
};