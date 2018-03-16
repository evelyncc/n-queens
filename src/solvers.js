/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  
  for (var i = 0; i < n; i++) {
    board.togglePiece(i,i);
  }
  
  for (var row = 0; row < n; row++) {
    solution.push(board.attributes[row]);
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  console.log(solution)
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount; //fixme
  
  var recurse = function(num) {
    if (num === 0) {
      return 1;
    } else {
      return num * recurse(num - 1)
    }
  }
  
  solutionCount = recurse(n);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];
  var solution = [];
  var board = new Board({n: n});
  
  if (n === 2 || n === 3) {
    return {n: n};
  }
  
  var recurse = function(board, row, col) {
    if (board.attributes[row][col] !== 0) {
      return board;
    } else {
      board.togglePiece(row, col);
      counter++
      for (var rowConflict = 0; rowConflict < n; rowConflict++) {
        for (var colConflict = 0; colConflict < n; colConflict++) {
          if (!(rowConflict === row && colConflict === col)) {
            board.togglePiece(rowConflict, colConflict);
            if (board.hasRowConflictAt(rowConflict) || board.hasColConflictAt(colConflict) || board.hasMajorDiagonalConflictAt(colConflict - rowConflict) || board.hasMinorDiagonalConflictAt(colConflict + rowConflict)) {
              board.attributes[rowConflict][colConflict] = 2;
            } else {
              counter++
            }
          }
        }
      }
      return recurse(board, row, col);
    }
  }
  
  for (var fRow = 0; fRow < n; fRow++) {
    for (var fCol = 0; fCol < n; fCol++) {
      var counter = 0;
      recurse(board, fRow, fCol);
      if (counter === n) {
        solutions.push(board.attributes)
      }
      if (counter !== n) {
        board = new Board({n: n});
      }
    }
  }
  
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (solutions[0][i][j] === 2) {
        solutions[0][i][j] = 0;
      }
    }
    solution.push(solutions[0][i]);    
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined;
  var solutions = [];
  var board = new Board({n: n});
  
  if (n === 2 || n === 3) {
    return {n: n};
  }
  
  var recurse = function(board, row, col) {
    if (board.attributes[row][col] !== 0) {
      return board;
    } else {
      board.togglePiece(row, col);
      counter++
      for (var rowConflict = 0; rowConflict < n; rowConflict++) {
        for (var colConflict = 0; colConflict < n; colConflict++) {
          if (!(rowConflict === row && colConflict === col)) {
            board.togglePiece(rowConflict, colConflict);
            if (board.hasRowConflictAt(rowConflict) || board.hasColConflictAt(colConflict) || board.hasMajorDiagonalConflictAt(colConflict - rowConflict) || board.hasMinorDiagonalConflictAt(colConflict + rowConflict)) {
              board.attributes[rowConflict][colConflict] = 2;
            } else {
              counter++
            }
          }
        }
      }
      return recurse(board, row, col);
    }
  }
  
  for (var fRow = 0; fRow < n; fRow++) {
    for (var fCol = 0; fCol < n; fCol++) {
      var counter = 0;
      recurse(board, fRow, fCol);
      if (counter === n) {
        solutions.push(board.attributes)
      }
      if (counter !== n) {
        board = new Board({n: n});
      }
    }
  }
  
  console.log(solutions);
  
  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  debugger;
  return solutionCount;
};






















  // if (n % 2 === 0) {
  //   for (var md = -n/2; md <= n/2; md++) {
  //     // true/false flag.
  //     var diagHasCol = false;
  //     if (md === 0) {
  //       // empty
  //     } else {
  //       for (var col = 0; col < n; col++) {
  //         var row = col - md;
  //         if (board._isInBounds(row, col) && ) {
  //           if (!diagHasCol) {
  //             board.togglePiece(row, col);
  //             // we were printing out every possible board solution
  //             // then we tried true/false and are now printing the first solution
  //             // how do we separate/match it to the right board
  //             diagHasCol = true;
  //           }
  //         }
  //       }
  //     }
  //   }
  // } else {
  //   for (var md = -(n-1)/2; md <= (n-1)/2; md++) {
  //     for (var col = 0; col < n; col++) {
  //       var row = col - md;
  //       board.togglePiece(row, col);
  //     }
  //   }
