import React, { useState } from "react";
import { Button, View, Text, Alert, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { serverURL } from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Subscription = ({ navigation }) => {
  const [showWebView, setShowWebView] = useState(false); // To control WebView visibility
  const [paymentUrl, setPaymentUrl] = useState(''); // The URL for WebView to load
  const [loading, setLoading] = useState(false); // Loading indicator

  const handlePayment = async () => {
    const baseUrl = `${serverURL}/razorpay-payment`;

    try {
      setLoading(true); // Show loading while order is being created
      const data = await AsyncStorage.getItem('data');
      const objData = JSON.parse(data);
      const user = objData.data;
      const token = await AsyncStorage.getItem('token');
      
      // Call backend to create Razorpay order
      const response = await axios.post(
        `${baseUrl}/order`,
        { planId: "66e9ac2d3e7105dad9dabc09" },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      
      const order = response.data.data;
      
      // Prepare Razorpay options
      const options = {
        description: "Library Subscription",
        image: "https://your-logo-url.com",
        currency: "INR",
        key: "rzp_test_1wbAMGP7q5pzpf", // Razorpay Key ID
        amount: order.amount, // Amount in the smallest unit of currency (paise)
        order_id: order.id, // Razorpay Order ID
        name: "Lib Steering",
        prefill: {
          email: user.email,
          contact: "9876543210",
          name: user.name,
        },
        theme: { color: "#F37254" },
      };

      // Open the WebView with Razorpay Checkout form
      const razorpayHtml = generateRazorpayHtml(options);
      setPaymentUrl(`data:text/html,${encodeURIComponent(razorpayHtml)}`);
      setShowWebView(true); 
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong during payment creation.");
    } finally {
      setLoading(false);
    }
  };

  // Function to generate Razorpay checkout HTML content
  const generateRazorpayHtml = (options) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Razorpay Checkout</title>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body>
      <script>
        var options = ${JSON.stringify(options)};
        options.handler = function (response) {
          window.ReactNativeWebView.postMessage(JSON.stringify(response));
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
      </script>
    </body>
    </html>
  `;

  // Handle messages received from the WebView
  const onMessage = async (event) => {
    try {
      const paymentResponse = JSON.parse(event.nativeEvent.data);
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentResponse;
      
      // Verify payment on the backend
      const verificationData = {
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
      };

      const token = await AsyncStorage.getItem('token');
      await axios.post(`${serverURL}/razorpay-payment/verify`, verificationData, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      setShowWebView(false); // Close WebView
      Alert.alert("Success", "Payment successful!");
      navigation.navigate("Home");

    } catch (error) {
      console.error("Payment verification failed:", error);
      Alert.alert("Error", "Payment verification failed.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {!showWebView ? (
        <View>
          <Text>Subscribe to Premium Plan</Text>
          <Button title="Pay Now" onPress={handlePayment} />
        </View>
      ) : (
        <WebView
          source={{ uri: paymentUrl }}
          onMessage={onMessage}
          onError={() => {
            setShowWebView(false);
            Alert.alert("Error", "Payment failed, please try again.");
          }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

export default Subscription;
