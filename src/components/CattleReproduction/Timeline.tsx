import { View, StyleSheet } from "react-native";
import { CattleReproduction, ReproductiveEvent } from "../../interfaces/ReproductiveEvent";
import { EventMarker } from "./EventMarker";

interface TimelineProps {
  cattle: CattleReproduction;
  setIsEventDetailsModalVisible: (isVisible: boolean) => void
  setSelectedEvent: (event: ReproductiveEvent | null) => void
}

export const Timeline = ({ cattle, setIsEventDetailsModalVisible, setSelectedEvent }: TimelineProps) => {
  const sortedEvents = [...cattle.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const startDate = new Date(sortedEvents[0]?.date || new Date());
  const endDate = new Date(sortedEvents[sortedEvents.length - 1]?.date || new Date());
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) || 1;

  return (
    <View style={styles.timeline}>
      {sortedEvents.map((event, index) => {
        const eventDate = new Date(event.date);
        const daysFromStart = (eventDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        const position = (daysFromStart / totalDays) * 100;

        return (
          <View key={event.id} style={[styles.eventMarkerContainer, { left: `${Math.max(Math.min(position, 95), 10 * (index + 0.5))}%` }]}>
            <EventMarker
              event={event}
              setIsEventDetailsModalVisible={setIsEventDetailsModalVisible}
              setSelectedEvent={setSelectedEvent}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    marginVertical: 20,
    position: 'relative',
  },
  eventMarkerContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -15 }],
    marginTop: 15,
  },
})