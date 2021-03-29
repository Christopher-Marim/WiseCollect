import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    headerView: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight:10,
        backgroundColor: commonStyles.color.InventoryPrincipal,
        alignItems: 'center',
        justifyContent: 'space-between',
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