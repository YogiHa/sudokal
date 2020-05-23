import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Switch } from 'react-native';
import customAlert from './customAlert';
import { getSqure, addVerifyNumbers, solve } from './solveUtils';
import { styles } from './styles';

export default function Sudoku({ initPuzzle, setInitPuzzle }) {
  const initializePuzzle = initPuzzle.map((row) =>
    row.map((num) => {
      return { num, isInit: num != 0 };
    })
  );
  const [puzzle, setPuzzle] = useState(initializePuzzle);
  const [showConfilcts, setShowConflicts] = useState(true);
  const [timer, setTimer] = useState(0);
  const puzzleValues = puzzle.map((row) => row.map((cell) => cell.num));

  let timeOut = useRef(null);
  useEffect(() => {
    if (
      [].concat.apply(
        [],
        puzzleValues.map((row) => row.filter((num) => num == 0))
      ).length
    ) {
      timeOut.current = setTimeout(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearTimeout(timeOut.current);
    }
    return () => clearTimeout(timeOut.current);
  }, [timer, puzzle]);

  const isInConflict = (i, j, num) => {
    let customFilterBool = (arr) =>
      arr.filter((cell) => cell == num).length > 1;
    return (
      customFilterBool(puzzleValues.map((row) => row[j])) ||
      customFilterBool(puzzleValues[i]) ||
      customFilterBool(getSqure(i, j, puzzleValues))
    );
  };
  let conflicts = 0;

  return (
    <View style={styles.sudokuHolder}>
      <View style={styles.sudokuButtonGrid}>
        <Text>
          {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${
            timer % 60
          }`}
        </Text>
        <View style={styles.topRow}>
          <Text style={{ marginRight: showConfilcts ? 12 : 18 }}>
            {showConfilcts ? 'show' : 'hide'} conflicts
          </Text>
          <Switch
            trackColor={'#79cdcd'}
            thumbColor={'#79cdcd'}
            onValueChange={() => setShowConflicts((prev) => !prev)}
            value={showConfilcts}
          />
        </View>
      </View>
      <View style={styles.columns}>
        {puzzle.map((row, i) => (
          <View
            key={i}
            style={[
              styles.row,
              (i == 0 || i == 3 || i == 6) && styles.borderTop,
              i == 8 && styles.borderBottom,
            ]}
          >
            {row.map((cell, j) => {
              const { isInit, isHint, num } = cell;
              let conflictFlag = num != 0 && isInConflict(i, j, num);
              conflictFlag && conflicts++;
              return (
                <TextInput
                  key={j}
                  keyboardType={'number-pad'}
                  style={[
                    styles.cell,
                    (j == 0 || j == 3 || j == 6) && styles.borderLeft,
                    j == 8 && styles.borderRight,
                    !isInit && styles.blueText,
                    isHint && styles.greenText,
                    showConfilcts && conflictFlag && styles.conflictBackGround,
                  ]}
                  value={num != 0 ? `${num}` : ''}
                  editable={!isInit}
                  onChangeText={(text) => {
                    if (!isNaN(text)) {
                      let modifyPuzzle = [...puzzle];
                      modifyPuzzle[i][j] = {
                        num: +text.substring(text.length - 1, text.length),
                      };
                      setPuzzle(modifyPuzzle);
                    }
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.sudokuButtonGrid}>
        <TouchableOpacity onPress={() => setInitPuzzle([])}>
          <View style={styles.sudokuButton}>
            <Text> go back </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPuzzle(initializePuzzle);
            setTimer(0);
          }}
        >
          <View style={styles.sudokuButton}>
            <Text> reset </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!conflicts) {
              let hint = addVerifyNumbers(puzzleValues, [], true);
              if (hint.length) {
                let modifyPuzzle = [...puzzle];
                let { i, j, value } = hint[0];
                modifyPuzzle[i][j] = {
                  num: +value,
                  isHint: true,
                  isInit: false,
                };
                setPuzzle(modifyPuzzle);
              } else {
                customAlert(
                  `Couldn't find a verified addition`,
                  `continue solving and ask for hint later'`
                );
              }
            } else {
              customAlert('remove conflicts before hinting');
            }
          }}
        >
          <View style={styles.sudokuButton}>
            <Text> hint </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!conflicts) {
              let solution = solve(puzzleValues);
              if (solution) {
                setPuzzle((prevPuzzle) =>
                  solution.map((row, i) =>
                    row.map((num, j) => {
                      return {
                        num,
                        isInit: prevPuzzle[i][j].isInit,
                        isHint:
                          prevPuzzle[i][j].num == 0
                            ? true
                            : prevPuzzle[i][j].isHint,
                      };
                    })
                  )
                );
              } else {
                customAlert('couldnt find a solution');
              }
            } else {
              customAlert('remove conflicts before solving');
            }
          }}
        >
          <View style={styles.sudokuButton}>
            <Text> solve </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
