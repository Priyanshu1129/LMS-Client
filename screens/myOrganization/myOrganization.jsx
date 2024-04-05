import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

const OrganizationProfile = ({ route }) => {
  const logoUri = "https://example.com/logo.png";

  const owner = {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  };

  const staffs = [
    { name: "Alice Smith", role: "Manager" },
    { name: "Bob Johnson", role: "Assistant" },
    { name: "Eva Brown", role: "Clerk" },
  ];

  // Dummy organization data
  const dummyOrganization = {
    name: "ABC Corporation",
    address: "123 Main St, City, Country",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Avatar.Image size={100} source={{ uri: logoUri }} />
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{dummyOrganization.name}</Title>
          <Paragraph>{dummyOrganization.description}</Paragraph>
        </Card.Content>
        <Card.Content>
          <List.Section>
            <List.Subheader>Organization Details</List.Subheader>
            <List.Item
              title="Address"
              description={dummyOrganization.address}
            />
            <List.Item title="Owner" description={owner.name} />
          </List.Section>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Subheader>Staffs</List.Subheader>
            {staffs.map((staff, index) => (
              <List.Item
                key={index}
                title={staff.name}
                description={staff.role}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
});

export default OrganizationProfile;
