import { Text, View, StyleSheet } from "react-native"
import Legend from "./legend";
import { useTheme } from "react-native-paper";
import { Pie , PolarChart} from "victory-native";
import MyChart from "./myChart";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Legend2 from "./legend2";

const MemberStats = ()=>{
    const theme = useTheme()


    return(
        <View  style={{backgroundColor : 'white', margin : 5, borderRadius : 8, padding : 5}}>
        <View style={{flex : 1, flexDirection : 'row' , gap : 4}}>
            <MaterialIcons size={20} name={"event-seat"}/>
             <Text style={{fontWeight : 500, color : theme.colors.primary}}>MemberStats</Text>
        </View>    
        <View style={[styles.graphWrapper]}>
              <View style={{flexDirection : 'row' , justifyContent : 'space-between', padding : 10 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth : 1, borderColor : '#A5B4C8' }}>
                    <View style={{  }}>
                        <Legend label={"Active"} color={theme.colors.primary}  size={12} />
                        <Legend label={"Inactive"} color={theme.colors.primary}  size={12} />
                        <Legend label={"Expired"} color={theme.colors.primary}   size={12} />
                    </View>
                    </View>

                  <View style={{width : "50%", }}>
                       <MyChart/>
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

export default MemberStats;