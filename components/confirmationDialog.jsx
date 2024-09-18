import * as React from "react";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const ConfirmationDialog = ({
  visible,
  setVisible,
  message,
  setConfirmation,
}) => {
  const handleDelete = () => {
    setConfirmation(true);
    setVisible(false);
  };
  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyLarge">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button onPress={handleDelete}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;
