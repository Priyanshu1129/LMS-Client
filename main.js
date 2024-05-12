import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation, DrawerActions, useFocusEffect } from '@react-navigation/native';
import { BackHandler, SafeAreaView } from 'react-native';
import Login from './screens/auth/login';
import Register from './screens/auth/register';
import ForgotPassword from './screens/auth/forgotPassword';
import Home from './screens/home/Home';
import Profile from './screens/profile/profile';
import MembersList from './screens/member/membersList';
import MemberDetails from './screens/member/memberDetails';
import AddMember from './screens/member/addMember';
import PaymentList from './screens/payment/paymentList';
import PaymentDetails from './screens/payment/paymentDetails';
import MakePayment from './screens/payment/makePayment';
import AllSeats from './screens/seat/allSeats';
import AllLockers from './screens/locker/allLockers';
import SeatDetails from './screens/seat/seatDetails';
import LockerDetails from './screens/locker/lockerDetails';
import Search from './screens/search/search';
import Notifications from './screens/notification/notification';
import Subscription from './screens/subscription/subscription';
import ChangePassword from './screens/changePassword/changePassword';
import AddSeat from './screens/seat/addSeat';
import AddLocker from './screens/locker/addLocker';
import StaffsList from './screens/staff/staffsList';
import StaffDetails from './screens/staff/staffDetails';
import AddStaff from './screens/staff/addStaff';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyOrganization from './screens/myOrganization/myOrganization';
import { fetchToken } from './config/fetchAsyncStorage';
import Icon from 'react-native-vector-icons/Ionicons';

import { Provider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';


import React, { useState, useEffect } from 'react';
import DrawerContent from './components/drawerContent';


const Stack = createNativeStackNavigator();


const UnAuthNav = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Login'}>
            <Stack.Screen
                name='Login'
                component={Login}
            />
            <Stack.Screen
                name='Register'
                component={Register}
            />
            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
            />
        </Stack.Navigator>
    )
}

const StackNav = ({ token }) => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center"
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
                initialParams={{ token }}
                options={{
                    headerRight: () => {
                        return (
                            <>
                                <Icon
                                    size={30}
                                    name='search-outline'
                                    onPress={() => navigation.navigate('Search')}

                                />
                                <Icon
                                    size={30}
                                    name='notifications-outline'
                                    onPress={() => navigation.navigate('Notifications')}
                                />
                            </>


                        )
                    },
                    headerLeft: () => {
                        return (
                            <Icon
                                size={30}
                                name='menu'
                                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                            />
                        )
                    }
                }}
            />
            <Stack.Screen
                name="MyOrganization"
                initialParams={{ token }}
                component={MyOrganization}
            />
            <Stack.Screen
                name='Members'
                initialParams={{ token }}
                component={MembersList}
            />
            <Stack.Screen
                name='AddMember'
                initialParams={{ token }}
                component={AddMember}
            />
            <Stack.Screen
                name='MemberDetails'
                initialParams={{ token }}
                component={MemberDetails}
            />
            <Stack.Screen
                name='Profile'
                component={Profile}
                initialParams={token}

            />
            <Stack.Screen
                name='StaffsList'
                initialParams={{ token }}
                component={StaffsList}
            />
            <Stack.Screen
                name='AddStaff'
                initialParams={{ token }}
                component={AddStaff}
            />
            <Stack.Screen
                name='StaffDetails'
                initialParams={{ token }}
                component={StaffDetails}
            />
            <Stack.Screen
                name='PaymentList'
                initialParams={{ token }}
                component={PaymentList}
            />
            <Stack.Screen
                name='MakePayment'
                initialParams={{ token }}
                component={MakePayment}
            />
            <Stack.Screen
                name='PaymentDetails'
                initialParams={{ token }}
                component={PaymentDetails}
            />
            <Stack.Screen
                name='AllSeats'
                initialParams={{ token }}
                component={AllSeats}
            />
            <Stack.Screen
                name='AddSeat'
                initialParams={{ token }}
                component={AddSeat}
            />
            <Stack.Screen
                name='SeatDetails'
                initialParams={{ token }}
                component={SeatDetails}
            />
            <Stack.Screen
                name='AllLockers'
                initialParams={{ token }}
                component={AllLockers}
            />
            <Stack.Screen
                name='AddLocker'
                initialParams={{ token }}
                component={AddLocker}
            />
            <Stack.Screen
                name='LockerDetails'
                initialParams={{ token }}
                component={LockerDetails}
            />
            <Stack.Screen
                name='Subscription'
                initialParams={{ token }}
                component={Subscription}
            />
            <Stack.Screen
                name='Search'
                initialParams={{ token }}
                component={Search}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Notifications'
                initialParams={{ token }}
                component={Notifications}
            />
            <Stack.Screen
                name='ChangePassword'
                initialParams={{ token }}
                component={ChangePassword}
            />
            <Stack.Screen
                name='Login'
                component={UnAuthNav}
            />
        </Stack.Navigator>
    )
}

const DrawNav = ({ token }) => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Home'}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name='Home' >
                {() => <StackNav token={token} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}


export const Main = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const getData = async () => {
        const data = await AsyncStorage.getItem('isAuthenticated');
        const storedToken = await fetchToken();
        setIsAuthenticated(data);
        setToken(storedToken);
        console.log("isAuthenticated:", data);

    }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         BackHandler.addEventListener('hardwareBackPress', () => { BackHandler.exitApp() });

    //         return BackHandler.removeEventListener('hardwareBackPress', () => { BackHandler.exitApp() })
    //     })
    // )

    useEffect(() => {
        getData();
    }, [])

    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
                {
                    isAuthenticated && token ? (<DrawNav token={token} />) : (<UnAuthNav />)
                }
            </SafeAreaView>
        </NavigationContainer>
    );
}
