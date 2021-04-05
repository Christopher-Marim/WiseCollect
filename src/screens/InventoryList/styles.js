import commonStyles from '../../commonStyles';

import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebed',
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: commonStyles.color.InventoryPrincipal,
    alignItems: 'center',
    justifyContent: 'space-between',
    height:Dimensions.get('window').height*0.08
  },
  collectList: {
    padding: 5,
  },
  Text: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 25,
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonStyles.color.InventoryPrincipal,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  addButtonCenter: {
    position: 'absolute',
    width: Dimensions.get('window').width / 1.5,
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonStyles.color.InventoryPrincipal,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  buttonOpenDrawer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonFilter: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
