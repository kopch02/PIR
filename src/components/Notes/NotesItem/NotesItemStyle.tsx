import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  vv: {
    borderWidth:2,
    borderColor:"grey",
    borderRadius:15,
    padding:10,
    width:"100%",
    maxHeight:160,
    marginBottom:7
  },
  top: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  status: {
    textAlign:"left",
    fontSize:22,
    paddingBottom: 10,
    color:"black"
  },
  text: {
    maxHeight:100,
    color:"black"
  },
  selecterText:{
    fontSize:14,
    color:"black"
  },
});