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
    width: Dimensions.get('window').width / 1.1,
  },
  borderTop: {
    borderTopWidth: 2,
    borderTopColor: 'black',
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  borderLeft: {
    borderLeftWidth: 2,
    borderLeftColor: 'black',
  },
  borderRight: {
    borderRightWidth: 2,
    borderRightColor: 'black',
  },

  cell: {
    width: '11%',
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
  zoomWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#6988a2',
  },
  zoomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  zoomBar: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    flex: 1,
    justifyContent: 'space-around',
  },
  zoomButton: {
    marginBottom: 10,
    borderRadius: 30,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#79cdcd',
    opacity: 0.6,
  },
});
