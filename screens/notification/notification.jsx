import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Text, Divider } from 'react-native-paper';

const NotificationPage = () => {
  const notifications = [
    { id: 1, message: 'New order received', date: 'Today', seen: true },
    { id: 2, message: 'Payment processed', date: 'Yesterday', seen: false },
    { id: 3, message: 'Project completed', date: 'Yesterday', seen: true },
    { id: 4, message: 'New message from client', date: 'Last 7 days', seen: false },
    { id: 5, message: 'Project update', date: 'Last 7 days', seen: false },
    { id: 6, message: 'Feedback received', date: 'Last 7 days', seen: true },
    { id: 7, message: 'Task assigned', date: 'Last 7 days', seen: false },
    { id: 8, message: 'Account balance updated', date: 'Last 7 days', seen: true },
    { id: 9, message: 'New feature available', date: 'Last 7 days', seen: false },
    { id: 10, message: 'Order cancelled', date: 'Last 7 days', seen: true },
    { id: 11, message: 'Profile updated', date: 'Last 7 days', seen: false },
    { id: 12, message: 'New review received', date: 'Last 7 days', seen: true },
    { id: 13, message: 'Notification settings updated', date: 'Last 7 days', seen: true },
    { id: 14, message: 'New gig created', date: 'Last 7 days', seen: false },
    { id: 15, message: 'New buyer inquiry', date: 'Last 7 days', seen: true },
    // Add more notifications as needed
  ];

  const renderNotificationItem = ({ item }) => (
    <List.Item
      title={item.message}
      description={item.date}
      descriptionStyle={styles.date}
      left={props => (
        <View style={[styles.dot, { backgroundColor: item.seen ? '#cccccc' : '#FF5733' }]} />
      )}
      onPress={() => console.log('Notification clicked:', item)}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Subheader style={styles.subheader}>Today</List.Subheader>
          {notifications
            .filter(notification => notification.date === 'Today')
            .map(notification => (
              <View key={notification.id}>
                <Divider />
                {renderNotificationItem({ item: notification })}
              </View>
            ))}
        </List.Section>
        <List.Section>
          <List.Subheader style={styles.subheader}>Yesterday</List.Subheader>
          {notifications
            .filter(notification => notification.date === 'Yesterday')
            .map(notification => (
              <View key={notification.id}>
                <Divider />
                {renderNotificationItem({ item: notification })}
              </View>
            ))}
        </List.Section>
        <List.Section>
          <List.Subheader style={styles.subheader}>Last 7 days</List.Subheader>
          {notifications
            .filter(notification => notification.date === 'Last 7 days')
            .map(notification => (
              <View key={notification.id}>
                <Divider />
                {renderNotificationItem({ item: notification })}
              </View>
            ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding:10
  },
  subheader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  date: {
    color: '#666666',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default NotificationPage;
