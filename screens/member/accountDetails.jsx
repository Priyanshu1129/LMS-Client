import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Snackbar, useTheme } from "react-native-paper";
import ConfirmationDialog from "../../components/confirmationDialog.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteMember, updateMember } from "../../redux/actions/memberActions.js";
import { memberActions } from "../../redux/slices/memberSlice.js";
import MemberBasicInfo from "./memberBasicInfo.jsx";
import MemberAccountDetails from "./memberAccountDetails.jsx";
import { getAllMember, getMember } from "../../redux/actions/memberActions.js";
import PageLoader from "../../components/pageLoader.jsx";
import { defaultAvatar } from "../../constant.js";
import EditProfilePic from "../../components/EditProfilePic.jsx";
import { ScrollView } from "react-native-gesture-handler";
import { getAllPaymentsOfMember } from "../../redux/actions/paymentActions.js";
import { paymentActions } from "../../redux/slices/paymentSlice.js";
import PaymentListCard from '../../components/paymentListCard.jsx';



const AccountDetails = ({memberId, token}) => {
  
  const [allPaymentDetails, setAllPaymentDetails] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
 

  const dispatch = useDispatch();
  const theme = useTheme();

  
  useEffect(() => {
    if (token) {
      dispatch(getAllPaymentsOfMember(memberId , token));
    }
  }, [memberId]);

  const {
    status: allPaymentsStatus,
    data: allPaymentsData,
    error: allPaymentsError,
  } = useSelector((state) => state.payment.allPaymentsOfMember);

  useEffect(() => {
    if (allPaymentsStatus == "pending") {
      setLoading(true);
    } else if (allPaymentsStatus == "success") {
      setAllPaymentDetails(allPaymentsData.data.payments);
      setAccountDetails(allPaymentsData.data.account)
      console.log("81 fetchedpayment------------------", allPaymentsData.data)
      setLoading(false);
      dispatch(paymentActions.clearAllPaymentsofMemberStatus());
    } else if (allPaymentsStatus == "failed") {
      setLoading(false);
      setMessage(allPaymentsError);
      setVisibleSnackBar(true);
      dispatch(paymentActions.clearAllPaymentsofMemberStatus());
      dispatch(paymentActions.clearAllPaymentsofMemberError());
    }
  }, [allPaymentsStatus]);

//   const {
//     status: deleteStatus,
//     data: deleteData,
//     error: deleteError,
//   } = useSelector((state) => state.member.deleteMember);

//   useEffect(() => {
//     if (deleteStatus === "pending") {
//       setLoading(true);
//     } else if (deleteStatus === "success") {
//       setLoading(false);
//       dispatch(getAllMember(token));
//       dispatch(memberActions.clearDeleteMemberStatus());
//       navigation.navigate({
//         name: "Members",
//         params: { memberDeleted: true },
//         merge: true,
//       });
//     } else if (deleteStatus === "failed") {
//       setLoading(false);
//       setMessage(deleteError);
//       setVisibleSnackBar(true);
//       dispatch(memberActions.clearDeleteMemberStatus());
//       dispatch(memberActions.clearDeleteMemberError());
//     }
//   }, [deleteStatus]);

//   useEffect(() => {
//     if (deleteConfirmation) {
//       dispatch(deleteMember(member._id, token));
//     }
//   }, [deleteConfirmation]);


  

  const onDismissSnackBar = () => {
    setVisibleSnackBar(false);
    setMessage(null);
  };

  
  
  return loading && !allPaymentDetails ? (
    <PageLoader />
  ) : (
    <ScrollView>
        
    <View style={styles.container}>
        <View style={[styles.accountWrapper, {backgroundColor : theme.colors.primary}]}>
            <Text style={[styles.text, {color : theme.colors.background}]}>{`Account Holder : ${accountDetails?.accountHolder.name}`}</Text>
            <Text style={[styles.text, {color : theme.colors.background}]}>{`Balance : ${accountDetails?.balance}`}</Text>
        </View>

        <View style={[styles.paymentContainer]}>
            {
                allPaymentDetails && allPaymentDetails.map((payment) => <PaymentListCard payment={payment}/> )
            }
        </View>
        
        {message && (
        <Snackbar
          visible={visibleSnackBar}
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
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  paymentContainer : {
    flex : 1,
    gap : 5,
    padding : 10,

  },
  accountWrapper : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    padding : 15,
  },
  text:{
   fontSize : 15,
   fontWeight : 500
  }
  
});

export default AccountDetails;

