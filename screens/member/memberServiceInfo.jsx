import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import PageLoader from "../../components/pageLoader";
import { useDispatch, useSelector } from "react-redux";
import { getMemberServices } from "../../redux/actions/serviceActions";
import { serviceActions } from "../../redux/slices/serviceSlice";
import { useTheme, Snackbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import ServiceCard from "./serviceCard";

const MemberServiceInfo = ({ memberId, token }) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const { status, data, error } = useSelector(
    (state) => state.service.memberServices
  );
  const {
    status: deAllocateServiceStatus,
    data: deAllocateServiceData,
    error: deAllocateServiceError,
  } = useSelector((state) => state.service.deAllocateService);
  const dispatch = useDispatch();

  const [services, setServices] = useState(data?.data ?? []);

  const fetchAllServices = useCallback(() => {
    if (token) {
      dispatch(getMemberServices(memberId, token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!data?.data) {
      fetchAllServices();
    }
  }, [fetchAllServices]);

  useEffect(() => {
    if (status == "pending") {
      console.log("loading->pending", status);
      setLoading(true);
    } else if (status === "success" && data.status === "success") {
      setServices(data?.data);
      setLoading(false);
      dispatch(serviceActions.clearMemberServicesStatus());
    } else {
      setMessage(error);
      setVisible(true);
      setLoading(false);
      dispatch(serviceActions.clearMemberServicesData());
      dispatch(serviceActions.clearMemberServicesStatus());
    }
  }, [status]);

  useEffect(() => {
    if (deAllocateServiceStatus == "pending") {
      console.log("deAllocate service loading->pending", status);
      setLoading(true);
    } else if (
      deAllocateServiceStatus === "success" &&
      deAllocateServiceData.status === "success"
    ) {
      setServices(
        services.map((service) => {
          if (service._id == deAllocateServiceData.data._id) {
            service.status = "inactive";
          }
        })
      );
      setLoading(false);
      dispatch(serviceActions.clearDeAllocateServiceStatus());
    } else if(deAllocateServiceStatus == 'failed') {
      setMessage(deAllocateServiceError);
      console.log("++++========================++++++",deAllocateServiceError)
      setVisible(true);
      setLoading(false);
      dispatch(serviceActions.clearDeAllocateServiceStatus());
      dispatch(serviceActions.clearDeAllocateServiceError());
    }
  }, [deAllocateServiceStatus]);

  const theme = useTheme();
  const colors = {
    labelColor: theme.colors.primary,
    buttonBackground: theme.colors.primary,
  };

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  return (
    <>
      <ScrollView>
        {loading ? (
          <PageLoader />
        ) : services?.length > 0 ? (
          <>
            {services.map((service) => (
              <ServiceCard service={service} token={token}/>
            ))}
            <Text>{JSON.stringify(services)}</Text>
          </>
        ) : (
          <Text>No Services Available</Text>
        )}
      </ScrollView>
      {console.log("popup-message1", message)}
      {message && (
        <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Hide",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
        >
          
          {message}
        </Snackbar>
      )}
    </>
  );
};

export default MemberServiceInfo;

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
