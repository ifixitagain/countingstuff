import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index, removeCountable, editCountableName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(countable.name);

  const handleSave = () => {
    if (editedName.trim() && editedName !== countable.name) {
      editCountableName(index, editedName);
      setIsEditing(false);
    }
  };

  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
          />
        ) : (
          <Text style={CommonStyles.textItem}>{countable.name}</Text>
        )}
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <CountableButton
          label="+"
          submit={() => changeCount(1, index)}
        />
        <CountableButton
          label="-"
          submit={() => changeCount(-1, index)}
          disabled={countable.count === 0}
        />
        <CountableButton
          label="Remove"
          submit={() => removeCountable(index)}
        />
        {isEditing ? (
          <CountableButton label="Save" submit={handleSave} />
        ) : (
          <CountableButton label="Edit" submit={() => setIsEditing(true)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    width: "100%",
  },
});
