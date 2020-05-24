import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { isInConflict } from '../utils/solveUtils';
import { styles } from '../styles';

export default function Sudoku({
  puzzle,
  showConfilcts,
  setPuzzle,
  puzzleValues,
}) {
  return (
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
                  showConfilcts &&
                    num != 0 &&
                    isInConflict(i, j, num, puzzleValues) &&
                    styles.conflictBackGround,
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
                    if (text != num && text) Keyboard.dismiss();
                  }
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}
