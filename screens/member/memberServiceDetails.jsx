import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import PageLoader from "../../components/pageLoader";
import { useDispatch, useSelector } from "react-redux";
import { getMemberServices } from "../../redux/actions/serviceActions";
import { serviceActions } from "../../redux/slices/serviceSlice";
import { ScrollView } from "react-native-gesture-handler";

const MemberAccountDetails = ({ memberId, token }) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const { status, data, error } = useSelector(
    (state) => state.service.memberServices
  );
  const dispatch = useDispatch();

  const [services, setServices] = useState(data?.data ?? []);

  const fetAllServices = useCallback(() => {
    if (token) {
      dispatch(getMemberServices(memberId, token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!data?.data) {
      fetAllServices();
    }
  }, [fetAllServices]);

  useEffect(() => {
    if (status === "pending") {
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

  return (
    <ScrollView>
      {loading ? (
        <PageLoader />
      ) : services.length > 0 ? (
        <Text>{JSON.stringify(services)}</Text>
      ) : (
        <Text>No Services Available</Text>
      )}
    </ScrollView>
  );
};

export default MemberAccountDetails;

const styles = StyleSheet.create({});
