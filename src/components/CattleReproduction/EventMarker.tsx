import { TouchableOpacity, StyleSheet } from "react-native";
import { getEventColor, getEventIcon } from "../../helpers/cattleReproduction";
import { ReproductiveEvent } from "../../interfaces/ReproductiveEvent";
import { Avatar } from "react-native-paper";

interface EventMarkerProps {
  event: ReproductiveEvent;
  setSelectedEvent: (event: ReproductiveEvent | null) => void;
  setIsEventDetailsModalVisible: (isVisible: boolean) => void;
}

export const EventMarker = ({ event, setSelectedEvent, setIsEventDetailsModalVisible }: EventMarkerProps) => {
  return (
    <TouchableOpacity
      key={event.id}
      style={[styles.eventMarker, { backgroundColor: getEventColor(event.type) }]}
      onPress={() => {
        setSelectedEvent(event);
        setIsEventDetailsModalVisible(true);
      }}
    >
      <Avatar.Icon size={24} icon={getEventIcon(event.type)} style={{ backgroundColor: 'transparent' }} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})