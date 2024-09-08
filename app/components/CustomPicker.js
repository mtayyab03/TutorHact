import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

const CustomPicker = ({ options, selectedItem, onSelect, title }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectItem = (item) => {
    onSelect(item);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerContainer} onPress={toggleModal}>
        <Text style={styles.pickerText}>
          {selectedItem ? selectedItem : title}
        </Text>
        <FontAwesome
          name="chevron-down"
          size={RFPercentage(2)}
          color={Colors.primary}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{ width: "85%", justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <FontAwesome
                  name="times"
                  size={RFPercentage(2.7)}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              style={{ width: "50%" }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectItem(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: RFPercentage(1),
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: RFPercentage(1),
    backgroundColor: Colors.white,
    backgroundColor: Colors.white,
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.primary,
    borderRadius: RFPercentage(5),
  },
  pickerText: {
    color: Colors.blacky,
    fontFamily: FontFamily.medium,
    fontSize: RFPercentage(1.5),
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "50%",
    backgroundColor: Colors.white,
    borderRadius: RFPercentage(1),
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow for Android
    paddingVertical: RFPercentage(1),
    borderWidth: RFPercentage(0.2),
    borderColor: Colors.primary,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  option: {
    width: "100%",
    paddingVertical: RFPercentage(1),
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    color: Colors.blacky,
    fontFamily: FontFamily.regular,
    fontSize: RFPercentage(1.8),
    textAlign: "center",
  },
});

export default CustomPicker;
