import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import SudokuView from './SudokuView';
import { styles } from './styles';

export default function App() {
  const [initPuzzle, setInitPuzzle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if ((isLoading && initPuzzle.length) || isError) {
      setIsLoading(false);
      if (!initPuzzle.length) setErrorCount((prevCount) => prevCount + 1);
      else {
        setErrorCount(0);
        setIsError(false);
      }
    }
  }, [isLoading, initPuzzle, isError]);

  const onStartPress = (level) => {
    setIsError(false);
    setIsLoading(true);
    fetch(
      `${
        Platform.OS == 'web' ? 'https://cors-anywhere.herokuapp.com/' : ''
      }http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9?level=${level}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (!json.squares) setIsError(true);
        else {
          let arr = Array.from({ length: 9 }, () => Array(9).fill(0));
          json.squares.forEach((square) => {
            let { x, y, value } = square;
            arr[x][y] = value;
          });
          setInitPuzzle(arr);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}> Sudokal! </Text>
      <View style={styles.flexOne}>
        {initPuzzle.length ? (
          <View style={styles.flexOne}>
            <SudokuView initPuzzle={initPuzzle} setInitPuzzle={setInitPuzzle} />
          </View>
        ) : (
          <View style={styles.container}>
            {isError && errorCount > 3 ? (
              <Text> please check your internt connection and try again</Text>
            ) : isError ? (
              <Text> Error occured, please try again </Text>
            ) : (
              isLoading && <Text>Loading</Text>
            )}
            <TouchableOpacity
              style={{ marginTop: isError || isLoading ? 0 : 20 }}
              onPress={() => onStartPress(1)}
            >
              <View style={styles.button}>
                <Text> easy </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onStartPress(2)}>
              <View style={styles.button}>
                <Text> medium </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onStartPress(3)}>
              <View style={styles.button}>
                <Text> hard </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setInitPuzzle(Array.from({ length: 9 }, () => Array(9).fill(0)))
              }
            >
              <View style={[styles.button]}>
                <Text> blank table </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
