import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  app: {
    backgroundColor: '#6988a2',
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  buttonGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 10,
    borderRadius: 30,
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#79cdcd',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  sudokuHolder: {
    flex: 1,
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columns: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flex: 0.8,
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.5,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  cell: {
    width: '15%',
    textAlign: 'center',
    margin: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conflictBackGround: {
    backgroundColor: 'red',
  },
  blueText: {
    color: '#3232ff',
  },
  greenText: {
    color: 'green',
  },
  sudokuButtonGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sudokuButton: {
    margin: 10,
    borderRadius: 30,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#79cdcd',
  },
});
