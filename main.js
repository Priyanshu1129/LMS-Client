import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation, DrawerActions, useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import Login from './screens/auth/login';
import Register from './screens/auth/register';
import ForgotPassword from './screens/auth/forgotPassword';
import Home from './screens/home/Home';
import Profile from './screens/profile/profile';
import UpdateProfile from './screens/profile/updateProfile';
import Members from './screens/member/members';
import MemberDetails from './screens/member/memberDetails';
import AddMember from './screens/member/addMember';
import PaymentList from './screens/payment/paymentList';
import PaymentDetails from './screens/payment/paymentDetails';
import SeatList from './screens/seat/seatList';
import ReservedSeatDetails from './screens/seat/reservedSeatDetails';
import Search from './screens/search/search';
import Notifications from './screens/notification/notification';
import Subscription from './screens/subscription/subscription';
import ChangePassword from './screens/changePassword/changePassword';
import StaffsList from './screens/staff/staffsList';
import StaffDetails from './screens/staff/staffDetails';
import AddStaff from './screens/staff/addStaff';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';


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

const StackNav = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
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
                name='Members'
                component={Members}
            />
            <Stack.Screen
                name='AddMember'
                component={AddMember}
            />
            <Stack.Screen
                name='MemberDetails'
                component={MemberDetails}
            />
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerRight: () => {
                        return (
                            <Icon
                                size={30}
                                name='menu'
                                onPress={() => navigation.navigate('UpdateProfile')}
                            />
                        )
                    }
                }}
            />
            <Stack.Screen
                name='UpdateProfile'
                component={UpdateProfile}
            />
            <Stack.Screen
                name='StaffsList'
                component={StaffsList}
            />
            <Stack.Screen
                name='AddStaff'
                component={AddStaff}
            />
            <Stack.Screen
                name='StaffDetails'
                component={StaffDetails}
            />
            <Stack.Screen
                name='PaymentList'
                component={PaymentList}
            />
            <Stack.Screen
                name='PaymentDetails'
                component={PaymentDetails}
            />
            <Stack.Screen
                name='SeatList'
                component={SeatList}
            />
            <Stack.Screen
                name='ReservedSeatDetails'
                component={ReservedSeatDetails}
            />
            <Stack.Screen
                name='Subscription'
                component={Subscription}
            />
            <Stack.Screen
                name='Search'
                component={Search}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Notifications'
                component={Notifications}
            />
            <Stack.Screen
                name='ChangePassword'
                component={ChangePassword}
            />
            <Stack.Screen
                name='Login'
                component={UnAuthNav}
            />
        </Stack.Navigator>
    )
}

const DrawNav = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Home'}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name='Home' component={StackNav} />
        </Drawer.Navigator>
    )
}


export const Main = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getData = async () => {
        const data = await AsyncStorage.getItem('isAuthenticated');
        console.log("isAuthenticated:", data);
        setIsAuthenticated(data);
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
            {
                isAuthenticated ? (<DrawNav />) : (<UnAuthNav />)
            }
        </NavigationContainer>
    );
}
