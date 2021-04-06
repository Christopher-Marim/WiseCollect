import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight:10,
        backgroundColor: commonStyles.color.InventoryPrincipal,
        alignItems: 'center',
        justifyContent: 'space-between',
        height:Dimensions.get('window').height*0.08
      },
      buttonOpenDrawer: {
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
      Text: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
        fontSize: 20,
        color: 'white',
        marginLeft:60
      },
      collectList: {
        padding: 5,
      },
})