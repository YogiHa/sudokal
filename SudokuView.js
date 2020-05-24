import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Switch } from 'react-native';
import Sudoku from './components/Sudoku';
import customAlert from './components/customAlert';
import {
  addVerifyNumbers,
  solve,
  isSolved,
  isInConflict,
} from './utils/solveUtils';
import { styles } from './styles';
import ReactNativeZoomableView from './components/ReactNativeZommableView';

export default function SudokuView({ initPuzzle, setInitPuzzle }) {
  const initializePuzzle = initPuzzle.map((row) =>
    row.map((num) => {
      return { num, isInit: num != 0 };
    })
  );
  const [puzzle, setPuzzle] = useState(initializePuzzle);
  const [showConfilcts, setShowConflicts] = useState(true);
  const [timer, setTimer] = useState(0);
  const puzzleValues = puzzle.map((row) => row.map((cell) => cell.num));

  let interval = useRef(null);
  useEffect(() => {
    if (!isSolved(puzzleValues)) {
      interval.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [isSolved(puzzleValues)]);

  let isConflicts = [].concat.apply(
    [],
    puzzleValues
      .map((row, i) =>
        row.map((num, j) => num != 0 && isInConflict(i, j, num, puzzleValues))
      )
      .map((row) => row.filter((bool) => bool))
  ).length;

  return (
    <View style={styles.sudokuHolder}>
      <ReactNativeZoomableView
        maxZoom={1.8}
        minZoom={0.2}
        zoomStep={0.2}
        initialZoom={1}
        bindToBorders={true}
      >
        <Sudoku
          puzzle={puzzle}
          showConfilcts={showConfilcts}
          setPuzzle={setPuzzle}
          puzzleValues={puzzleValues}
        />
      </ReactNativeZoomableView>
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
            if (!isConflicts) {
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
                customAlert(`Couldn't find a verified addition`);
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
            if (!isConflicts) {
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
      <View
        style={[
          styles.sudokuButtonGrid,
          {
            backgroundColor: '#6988a2',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        ]}
      >
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
    </View>
  );
}
