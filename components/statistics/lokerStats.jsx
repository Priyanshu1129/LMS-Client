import { Text, View, StyleSheet } from "react-native"
import Legend from "./legend";
import { useTheme } from "react-native-paper";
import { Pie , PolarChart} from "victory-native";
import MyChart from "./myChart";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Legend2 from "./legend2";

const LokerStats = ()=>{
    const theme = useTheme()


    return(
        <View  style={{backgroundColor : 'white', margin : 5, borderRadius : 8, padding : 5}}>
        <View style={{flex : 1, flexDirection : 'row' , gap : 4}}>
            <FontAwesome5 size={16} name={"user-lock"}/>
             <Text style={{fontWeight : 500, color : theme.colors.primary}}>Loker Stats</Text>
        </View>    
        <View style={[styles.graphWrapper]}>
              <View style={{flex : 1 , justifyContent : 'space-between', padding : 10, gap : 5 }}>
                <MyChart/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection : 'row', gap : 4 }}>
                        <Legend label={"Avail"} color={theme.colors.primary} color2={'#E2E8F0'} size={12} />
                        <Legend label={"booked"} color={'#E2E8F0'} color2={'#E2E8F0'}  size={12} /> 
                    </View>
                </View>
              </View>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    graphWrapper: {
      
      backgroundColor: 'white',
  
    }
  })

export default LokerStats;