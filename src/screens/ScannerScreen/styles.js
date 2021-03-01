import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
      },
      preview: {
        flex: 9,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
      },
      topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
      },
      
      headerView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: 'black',
        alignItems: 'center',
      },
      text: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
        fontSize: 25,
        color: commonStyles.color.secondary,
        borderBottomWidth: 2,
        borderBottomColor: '#FFF',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
})