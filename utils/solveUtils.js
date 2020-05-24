const getSqure = (rowPosition, columnPosition, arr) => {
  let squre = [];
  let getSqurePlace = (position) => {
    if (position < 3) return 0;
    if (position < 6) return 3;
    return 6;
  };
  let rowPlacement = getSqurePlace(rowPosition);
  let columnPlacement = getSqurePlace(columnPosition);
  for (let i = rowPlacement; i < rowPlacement + 3; i++) {
    for (let j = columnPlacement; j < columnPlacement + 3; j++)
      squre = [...squre, arr[i][j]];
  }
  return squre;
};

export const isInConflict = (i, j, num, valArr) => {
  let conflictBool = (arr) => arr.filter((cell) => cell == num).length > 1;
  return (
    conflictBool(valArr.map((row) => row[j])) ||
    conflictBool(valArr[i]) ||
    conflictBool(getSqure(i, j, valArr))
  );
};
const checkPosibiliets = (rowPosition, columnPosition, arr) => {
  let squre = getSqure(rowPosition, columnPosition, arr);
  let posibilities = [];
  for (let i = 1; i < 10; i++) {
    if (
      arr[rowPosition].indexOf(i) +
        arr.map((tmpRow) => tmpRow[columnPosition]).indexOf(i) +
        squre.indexOf(i) ==
      -3
    )
      posibilities = [...posibilities, i];
  }
  return posibilities;
};

export const addVerifyNumbers = (arr, changed = [], hint = false) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] !== 0) continue;
      let posibilities = checkPosibiliets(i, j, arr);
      if (!posibilities.length) {
        changed.map((position) => (arr[position.i][position.j] = 0));
        throw new Error();
      }
      if (posibilities.length !== 1) continue;
      if (hint) return [{ i, j, value: posibilities[0] }];
      arr[i][j] = posibilities[0];
      try {
        return addVerifyNumbers(arr, [...changed, { i, j }]);
      } catch {
        throw new Error();
      }
    }
  }
  return changed;
};

export const isSolved = (arr) =>
  ![].concat.apply(
    [],
    arr.map((row) => row.filter((num) => num == 0))
  ).length;

export const solve = (arr) => {
  let changed = [];
  try {
    changed = addVerifyNumbers(arr);
  } catch {
    return;
  }
  if (!isSolved(arr)) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[i][j] !== 0) continue;
        let posibilities = checkPosibiliets(i, j, arr);
        if (!posibilities.length) return;
        for (let k = 0; k <= posibilities.length; k++) {
          if (isSolved(arr)) break;
          if (k == posibilities.length) {
            changed.map((position) => (arr[position.i][position.j] = 0));
            arr[i][j] = 0;
            return;
          }
          arr[i][j] = posibilities[k];
          solve(arr);
        }
      }
    }
  }
  return arr;
};
