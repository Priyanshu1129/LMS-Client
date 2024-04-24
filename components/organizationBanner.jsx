import { Image, View , StyleSheet} from "react-native"

const OrganizationBanner = ()=>{

    return(
       <View style={[styles.bannerContainer]}>
        <Image 
  source={{uri: "https://th.bing.com/th/id/OIP._eqpTBVg-POc9J8BjEUoeQHaEo?rs=1&pid=ImgDetMain"}} 
  style={{width: '100%', height: '100%'}} 
  resizeMode="cover" 
/>

       </View>
    )
}

const styles = StyleSheet.create({
    bannerContainer : {
       elevation : 10,
       height  : 200
    }
})

export default OrganizationBanner;
