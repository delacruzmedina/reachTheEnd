/*
    Determna las columnas
 */
let maxLine = 0;

/*
    Determina las columnas
 */
let maxPosition = 0;
let closeRoad = [];
let openRoad = [];
let visited = [];
let returned = false;

let result = "NO";

function getPosition(line, column) {
    let posLine = line * maxPosition;
    return (posLine > 0 ? posLine : 0) + column + 1;
}

function getEdge(grid, grafo) {
    let hasMoreMove = true;

    // let line = 0;
    // let column = 0;

    for (let i = 0; i < maxLine; i++) {
        for (let j = 0; j < maxPosition; j++) {
            let next = nextStep(grid, i, j)

            // let postDestino = 0;
            // if (next.nextPosition !== null && next.nextPosition.length > 0) {
            //     if (next.nextPosition.length > 1) {
            //         for (let k = 0; k < next.nextPosition.length; k++) {
            //             let line = next.nextPosition[k].line;
            //             let column = next.nextPosition[k].column;
            //
            //             next = nextStep(grid, line, column)
            //
            //             let postOrigen = getPosition(next.currentLine, next.currentColumn);
            //
            //             if (next.nextPosition !== null) {
            //                 for (let l = 0; l < next.nextPosition.length; l++) {
            //                     postDestino = getPosition(next.nextPosition[l].line, next.nextPosition[l].column);
            //
            //                     grafo.addEdge(postOrigen, postDestino);
            //                 }
            //             }
            //         }
            //     } else {
            //         let postOrigen = getPosition(next.currentLine, next.currentColumn);
            //         postDestino = getPosition(next.nextPosition[0].line, next.nextPosition[0].column);
            //         grafo.addEdge(postOrigen, postDestino);
            //
            //         // console.log(postOrigen, postDestino);
            //
            //         line = next.nextPosition[0].line;
            //         column = next.nextPosition[0].column;
            //     }
            //
            //     // line = next.nextPosition.line;
            //     // column = next.nextPosition.column;
            // }
            //
            // console.log(next.currentLine, next.currentColumn, next.nextPosition);
        }
    }


    for (let i = 0; i < openRoad.length; i++) {
        if(openRoad[i].nextPosition === null){
            continue;
        }
        let postOrigen = getPosition(openRoad[i].currentLine, openRoad[i].currentColumn);
        for (let j = 0; j < openRoad[i].nextPosition.length; j++) {
            let postDestino = getPosition(openRoad[i].nextPosition[j].line, openRoad[i].nextPosition[j].column);
            // console.log(postOrigen, postDestino, openRoad[i].nextPosition[j]);
            grafo.addEdge(postOrigen, postDestino);
        }
    }

    // for (const open in openRoad) {
    //     let postOrigen = getPosition(open.currentLine, open.currentColumn);
    //     console.log('Position',  open);
    //     // for (let i = 0; i < open.nextPosition.length; i++) {
    //     //     console.log('Position',  postOrigen[i]);
    //     // }
    //     // for (const next in open.nextPosition) {
    //     //     console.log('Position',  next);
    //     //     // let postDestino = postDestino(next.cur);
    //     // }
    //
    // }

    // while (hasMoreMove) {
    //     let next = nextStep(grid, line, column)
    //
    //     console.log(next.currentLine, next.currentColumn, next.nextPosition);
    //
    //     let postDestino = 0;
    //     // if(next.nextPosition !== null){
    //     //     for (let i = 0; i < next.nextPosition.length; i++) {
    //     //         postDestino = getPosition(next.nextPosition[i].line, next.nextPosition[i].column);
    //     //         grafo.addEdge(postOrigen, postDestino);
    //     //     }
    //     // }
    //     if (next.nextPosition !== null && next.nextPosition.length > 0) {
    //         if(next.nextPosition.length > 1){
    //             for (let i = 0; i < next.nextPosition.length; i++) {
    //                 line = next.nextPosition[i].line;
    //                 column = next.nextPosition[i].column;
    //
    //                 next = nextStep(grid, line, column)
    //
    //                 let postOrigen = getPosition(next.currentLine, next.currentColumn);
    //
    //                 if(next.nextPosition !== null){
    //                     for (let i = 0; i < next.nextPosition.length; i++) {
    //                         postDestino = getPosition(next.nextPosition[i].line, next.nextPosition[i].column);
    //
    //                         grafo.addEdge(postOrigen, postDestino);
    //                     }
    //                 }
    //             }
    //         }else{
    //             let postOrigen = getPosition(next.currentLine, next.currentColumn);
    //             postDestino = getPosition(next.nextPosition[0].line, next.nextPosition[0].column);
    //             grafo.addEdge(postOrigen, postDestino);
    //
    //             // console.log(postOrigen, postDestino);
    //
    //             line = next.nextPosition[0].line;
    //             column = next.nextPosition[0].column;
    //         }
    //
    //         // line = next.nextPosition.line;
    //         // column = next.nextPosition.column;
    //     } else {
    //         line = 0;
    //         column = 0;
    //     }
    //
    //     if (!next.left && !next.right && !next.top && !next.bottom) {
    //         break;
    //     }
    //
    //     if (next.currentLine === maxLine - 1 && next.currentColumn === maxPosition - 1) {
    //         break;
    //     }
    // }
}

function nextStep(grid, line, column) {
    let canMove = nextPosition(grid, line, column);

    // console.log(canMove.nextPosition);

    if (canMove.isFinished) {
        openRoad.push(canMove);
    } else if (canMove.isBlocked || !canMove.hasMoreMove) {
        closeRoad.push(canMove);
        // backForward(grid);
    } else {
        openRoad.push(canMove)
    }

    visited.push({line: line, column: column});

    return canMove;
}

function nextPosition(grid, linePosition, currentPosition) {

    // console.log('Next Position Line Position', linePosition, currentPosition)

    let canMove = {
        currentLine: linePosition,
        currentColumn: currentPosition,
        nextPosition: [],
        left: false,
        right: false,
        top: false,
        bottom: false,
        isBlocked: false,
        hasMoreMove: true,
        isFinished: false
    };

    if (grid[linePosition][currentPosition] === '#') {
        canMove.isBlocked = true;
        canMove.nextPosition = null;
    }

    if (linePosition === maxLine - 1 && currentPosition === maxPosition - 1) {
        canMove.nextPosition = null;
        canMove.isFinished = true;

        return canMove;
    }

    canMove.right = canMoveRight(grid, linePosition, currentPosition);
    canMove.bottom = canMoveBottom(grid, linePosition, currentPosition);
    canMove.left = canMoveLeft(grid, linePosition, currentPosition);
    canMove.top = canMoveTop(grid, linePosition, currentPosition);

    if (!canMove.left && !canMove.right && !canMove.top && !canMove.bottom) {
        canMove.hasMoreMove = false;
        canMove.nextPosition = null;
    } else {

        // console.log('nextPosition: ', canMove.nextPosition);

        if (canMove.nextPosition === null) {
            canMove.nextPosition = [];
        }

        if (canMove.right) {
            canMove.nextPosition.push({line: linePosition, column: currentPosition + 1});
        }

        // if (canMove.left) {
        //     canMove.nextPosition.push({line: linePosition, column: currentPosition - 1});
        // }

        if (canMove.bottom) {
            canMove.nextPosition.push({line: linePosition + 1, column: currentPosition});
        }

        // if (canMove.top) {
        //     canMove.nextPosition.push({line: linePosition - 1, column: currentPosition});
        // }
    }

    return canMove;
}

function canMoveBottom(grid, linePosition, currentPosition) {
    const nextLinePosition = linePosition + 1;
    const row = grid[nextLinePosition];

    if (nextCellIsLocked(nextLinePosition, currentPosition) || isVisited(grid, nextLinePosition, currentPosition)) {
        return false
    }

    if (nextLinePosition === maxLine) {
        return false;
    }

    return row[currentPosition] === '.';
}

function canMoveTop(grid, linePosition, currentPosition) {
    if (linePosition === 0) {
        return false;
    }

    if (nextCellIsLocked(linePosition - 1, currentPosition) || isVisited(grid, linePosition - 1, currentPosition)) {
        return false
    }

    const row = grid[linePosition - 1];

    if (row[currentPosition] === '.') {
        return true;
    }

    return false;
}

function canMoveLeft(grid, linePosition, currentPosition) {
    const row = grid[linePosition];

    if (currentPosition === 0) {
        return false;
    }

    if (nextCellIsLocked(linePosition, currentPosition - 1) || isVisited(grid, linePosition, currentPosition - 1)) {
        return false
    }


    if (row[currentPosition - 1] === '.') {
        return true;
    }

    return false;
}

function canMoveRight(grid, linePosition, currentPosition) {
    const row = grid[linePosition]
    let nextColumn = currentPosition + 1

    if (nextCellIsLocked(row, nextColumn) || isVisited(grid, linePosition, currentPosition)) {
        return false
    }

    return row[nextColumn] === '.';
}

function nextCellIsLocked(line, column) {

    if (closeRoad === undefined) {
        return false;
    }

    if (closeRoad.length === 0) {
        return false;
    }

    let locked = closeRoad.filter(o => {
        return o !== undefined && o.currentLine === line && o.currentColumn === column;
    });

    // console.log('Locked', locked);

    return locked.length > 0;
}

function backForward(grid) {

    closeRoad.push(openRoad[openRoad.length - 1])

    // for (let i = openRoad.length - 1; i >= 0; i--) {
    //     // nextPosition(grid, )
    //     closeRoad.push(openRoad[i]);
    // }


    // openRoad.forEach((elem, index)=>{
    //      let cellStart = openRoad.filter(o => o.currentLine === 0 && o.currentColumn === 0);
    //
    //      if(elem !== cellStart[0]){
    //         openRoad.splice(index, 1);
    //         closeRoad.push(elem);
    //         visited= [];
    //      }
    // });

    // closeRoad.forEach((elem, index) =>{
    // if(elem.currentLine === 0 && elem.currentColumn === 0){
    //     closeRoad.splice(index, 1);
    // }
    // });

    visited = [];

    openRoad = [];

    // console.log('Close Roadsss', closeRoad);

    returned = true;
}

function reachTheEnd(grid, maxtime) {
    maxPosition = grid[0].length;
    maxLine = grid.length;

    let vertex = maxPosition * maxLine;
    let grafo = new Grafo(vertex);

    for (let i = 1; i < vertex; i++) {
        grafo.addVertex(i);
    }

    getEdge(grid, grafo);

    grafo.printGraph();

    var caminoValidoBFS = false;
    var caminoValidoDFS = false;

    let recorridobfs = grafo.bfs(1);
    let recorridodfs = grafo.dfs(1);

    if (recorridobfs.includes(vertex)) {
        pasos = 0;
        for (let i = 1; i < recorridodfs.length; i++) {
            if (recorridodfs[i] !== vertex) {
                pasos++;
            } else {
                pasos++;
                break;
            }
        }
        if (pasos <= maxtime)
            caminoValidoDFS = true;
    } else {
        // console.log("No existe camino");
    }

    recorridodfs = grafo.dfs(1);
    if (recorridodfs.includes(vertex)) {
        pasos = 0;
        for (let i = 1; i < recorridodfs.length; i++) {
            if (recorridodfs[i] !== vertex) {
                pasos++;
            } else {
                pasos++;
                break;
            }
        }
        if (pasos <= maxtime)
            caminoValidoDFS = true;
    } else {
        // console.log("No existe camino");
    }

    if (caminoValidoBFS || caminoValidoDFS) {
        console.log("Yes");
        result = "Yes";
    } else {
        console.log("No");
        result = "No";
    }

    document.getElementById("result").innerHTML = result;
}

function isVisited(grid, line, column) {
    if (visited.length === 0) {
        return false;
    }
    let filter = visited.filter(o => o.line === line && o.column === column);

    // console.log('Visited', visited, 'filter', filter, filter.length !== 0);

    if (line === 0 && column === 0) {
        return true;
    }

    return filter.length > 0;
}

class Grafo {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    // functions to be implemented

    // addVertex(v)
    // add vertex to the graph
    addVertex(v) {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }

    // addEdge(v, w)
    // add edge to the graph
    addEdge(v, w) {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.AdjList.get(v).push(w);

        // Since graph is undirected,
        // add an edge from w to v also
        // this.AdjList.get(w).push(v);
    }

    getEdge(v, w) {
        return this.AdjList;
    }

    // printGraph()
    // Prints the vertex and adjacency list
    printGraph() {
        // get all the vertices
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys) {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

    // bfs(v)
    // function to performs BFS
    bfs(startingNode) {

        // create a visited object
        var visited = {};
        var recorridobfs = [];

        // Create an object for queue
        var q = new Queue();

        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(startingNode);

        // loop until queue is element
        while (!q.isEmpty()) {
            // get the element from the queue
            var getQueueElement = q.dequeue();

            // passing the current vertex to callback funtion
            // console.log(getQueueElement);
            recorridobfs.push(getQueueElement);

            // get the adjacent list for current vertex
            var get_List = this.AdjList.get(getQueueElement);

            // loop through the list and add the element to the
            // queue if it is not processed yet
            for (var i in get_List) {
                var neigh = get_List[i];

                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.enqueue(neigh);
                }
            }
        }
        return recorridobfs;
    }

    // dfs(v)
    // Main DFS method
    dfs(startingNode) {
        var visited = {};
        var recorridodfs = [];

        this.DFSUtil(startingNode, visited, recorridodfs);
        return recorridodfs;
    }

    // Recursive function which process and explore
    // all the adjacent vertex of the vertex with which it is called
    DFSUtil(vert, visited, recorridodfs) {
        visited[vert] = true;
        // console.log(vert);
        recorridodfs.push(vert);

        var get_neighbours = this.AdjList.get(vert);

        for (var i in get_neighbours) {
            var get_elem = get_neighbours[i];
            if (!visited[get_elem])
                this.DFSUtil(get_elem, visited, recorridodfs);
        }
    }

}

class Queue {
    // Array is used to implement a Queue
    constructor() {
        this.items = [];
    }

    // Functions to be implemented
    // enqueue(item)
    // enqueue function
    enqueue(element) {
        // adding element to the queue
        this.items.push(element);
    }

    // dequeue()
    // dequeue function
    dequeue() {
        // removing element from the queue
        // returns underflow when called
        // on empty queue
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    // front()
    // front function
    front() {
        // returns the Front element of
        // the queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    // isEmpty()
    // isEmpty function
    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    // printQueue()
    // printQueue function
    printQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }

}

function reach(grid, maxtime){
    let inputGrid = grid.split(',');
    let time = parseInt(maxtime);

    let newGrid = [];

    for (let i = 0; i < inputGrid.length; i++) {
        newGrid.push(inputGrid[i]);
        // console.log(inputGrid, inputGrid[i].replace("\"",''));
    }

    console.log(newGrid);

    reachTheEnd(inputGrid, time);





}

// const grid01 = ["."];
// const grid02 = ["..", ".."];
// const grid03 = ['...##', '.#.##', '.####', '.....'];
// const grid04 = ['...##', '.#.##', '##.##', '.....'];
// const grid05 = ['...#', '##.#', '###.'];
// const grid06 = ["..#", "..#", "#..", "#.."];
// const grid010 = ['........#....#..#..#....#...#..#.#.#.#.#.#..#.....',
//     '..#..#..#.#....#..#.....#......#..##...........##.',
//     '.........#.###.##...#.....##......###............#',
//     '....##........#..#.#.#......#...#.##.......##.....',
//     '.................###...#.#...#......#.#.#.#.#...#.',
//     '.........#.....#...........##....#.#.#.##.....##..',
//     '.....#.##............#....#......#..#..#...##.....',
//     '.#.......###....#.#..##.##.#...##...#........#...#',
//     '..#.##..##..........#..........##.....##..........',
//     '#.#..##......#.#.#..##.###...#.........###..#...#.',
//     '.#..#..............#...#........#..#...#....#..#..',
//     '##..#..#........#....#........#...#.#......#.....#',
//     '#.#.......#.#..#...###..#..#.##...#.##.......#...#',
//     '#.#...#...#.....#....#......##.#.#.........#....#.',
//     '.#..........#......##..#....#....#.#.#..#..###....',
//     '#.#............#.##..#.##.##......###......#..#..#',
//     '.#..#.##...#.#......................#........#....',
//     '.....#....#.#..........##.#.#................#....',
//     '##............#.#......####...#.........#..##..#..',
//     '....#..##..##...#.........##..##....#..#.##...#...',
//     '.#........#...#..#...........#.###.....##.....##..',
//     '.......#..#..##...#..###.....#..##.........#......',
//     '...#......#..#...........###...............#......',
//     '...##.###.#.#....#...#..#.#.#....#....#.##.#...#..',
//     '..........#.......#..#..#...###....##.....#..#....',
//     '.............##.##.#.......#.#....#.......#..#..#.',
//     '.......#........#.....#....##...#...#.#...#.#.##..',
//     '.....#..#..#........#..#.....#...#.##.#....#...#..',
//     '....................#.#...#....###...###...##...#.',
//     '##.#.....##.....#..#.#.#...........#.#.##...#..#.#',
//     '#...........#....#.##...#.#.....#...#.....#.#.....',
//     '..#..##...#........#.##..#.....##.......#...#.#.#.',
//     '......#....#...##...........#..#.......#.##.......',
//     '......#..#..#.###..........#...#...........#..#...',
//     '....#.#..#..#.#.#...#.......#...#.##......#.......',
//     '....#.......#..#........#...#.#...#......#.......#',
//     '.#....##...#.#..#....#.#.##........#..#.#.........',
//     '#....#.......#..##......##...............#..#.##..',
//     '...#..##.......#.....#....#...#.#......#..##..###.',
//     '.....#...#...#...#...#...#..##...#..#.............',
//     '....##......#...#..#...#...#.#....#.....#..#.##...',
//     '...##.......#..##.....#........#.#....#...#.......',
//     '..#...#....#...#.###......#................#......',
//     '...#...###...#..##...###.....................#....',
//     '.....#....#....#...#.#.#.##....##......#....##....',
//     '...#.###...##.........#..........#.##.#.....#.....',
//     '##..#...#.........#.......#......##...........####',
//     '...###.#..........#.....#####........#..#.#.#...#.',
//     '...#..#.....#..##.##.#.....##...#...#.#.....#...##',
//     '.##.......#.##....#............#..................',
//     '#.....#.........#.#.........#..###....##...##.....',
//     '#....#.....#...#.....#.##...##...####........#....',
//     '#...........#..#...#........#.##..##..#...#.#.....',
//     '..#.#................#......###..##.#.#...##...#..',
//     '.#.#....#..#............#....#......#............#',
//     '..#..#...#.#.#...#...........#.......##.#...#.#...',
//     '#..........#.....#.....#......#.......#.#...##....',
//     '.......#...........#...........#....#............#',
//     '...####.#.....#.##.....#.......##.#..#......#.....',
//     '.#..#.....#..#......#.............#.#.#..##...#...',
//     '..#.#.#.........#...#..#.......#................##',
//     '.#..##.#.#...#.............#..#..........#..#...#.',
//     '....#........#......#...###..#.#..................',
//     '#..#..#.....#.#.#...##....##........#........#....',
//     '.....#.#.......##.......#.....#........#..##..#...',
//     '#.#.##........#..##.#..#.#...#........#.#......#..',
//     '....#.#.#.......#.##.##...##...#..#.###...#.#.#...',
//     '.....##.#....#........#....#.#........#.#.#.....#.',
//     '.....#..##..#.#....#.......#...#.#.###.........#.#',
//     '#.....#.##..#.......###.........#..##..#......##..'];
// const grid011 = ['........#....#..#..#....#...#..#.#.#.#.#.#..#.....',
//     '..#..#..#.#....#..#.....#......#..##...........##.',
//     '.........#.###.##...#.....##......###............#',
//     '....##........#..#.#.#......#...#.##.......##.....',
//     '.................###...#.#...#......#.#.#.#.#...#.',
//     '.........#.....#...........##....#.#.#.##.....##..',
//     '.....#.##............#....#......#..#..#...##.....',
//     '.#.......###....#.#..##.##.#...##...#........#...#',
//     '..#.##..##..........#..........##.....##..........',
//     '#.#..##......#.#.#..##.###...#.........###..#...#.',
//     '.#..#..............#...#........#..#...#....#..#..',
//     '##..#..#........#....#........#...#.#......#.....#',
//     '#.#.......#.#..#...###..#..#.##...#.##.......#...#',
//     '#.#...#...#.....#....#......##.#.#.........#....#.',
//     '.#..........#......##..#....#....#.#.#..#..###....',
//     '#.#............#.##..#.##.##......###......#..#..#',
//     '.#..#.##...#.#......................#........#....',
//     '.....#....#.#..........##.#.#................#....',
//     '##............#.#......####...#.........#..##..#..',
//     '....#..##..##...#.........##..##....#..#.##...#...',
//     '.#........#...#..#...........#.###.....##.....##..',
//     '.......#..#..##...#..###.....#..##.........#......',
//     '...#......#..#...........###...............#......',
//     '...##.###.#.#....#...#..#.#.#....#....#.##.#...#..',
//     '..........#.......#..#..#...###....##.....#..#....',
//     '.............##.##.#.......#.#....#.......#..#..#.',
//     '.......#........#.....#....##...#...#.#...#.#.##..',
//     '.....#..#..#........#..#.....#...#.##.#....#...#..',
//     '....................#.#...#....###...###...##...#.',
//     '##.#.....##.....#..#.#.#...........#.#.##...#..#.#',
//     '#...........#....#.##...#.#.....#...#.....#.#.....',
//     '..#..##...#........#.##..#.....##.......#...#.#.#.',
//     '......#....#...##...........#..#.......#.##.......',
//     '......#..#..#.###..........#...#...........#..#...',
//     '....#.#..#..#.#.#...#.......#...#.##......#.......',
//     '....#.......#..#........#...#.#...#......#.......#',
//     '.#....##...#.#..#....#.#.##........#..#.#.........',
//     '#....#.......#..##......##...............#..#.##..',
//     '...#..##.......#.....#....#...#.#......#..##..###.',
//     '.....#...#...#...#...#...#..##...#..#.............',
//     '....##......#...#..#...#...#.#....#.....#..#.##...',
//     '...##.......#..##.....#........#.#....#...#.......',
//     '..#...#....#...#.###......#................#......',
//     '...#...###...#..##...###.....................#....',
//     '.....#....#....#...#.#.#.##....##......#....##....',
//     '...#.###...##.........#..........#.##.#.....#.....',
//     '##..#...#.........#.......#......##...........####',
//     '...###.#..........#.....#####........#..#.#.#...#.',
//     '...#..#.....#..##.##.#.....##...#...#.#.....#...##',
//     '.##.......#.##....#............#..................',
//     '#.....#.........#.#.........#..###....##...##.....',
//     '#....#.....#...#.....#.##...##...####........#....',
//     '#...........#..#...#........#.##..##..#...#.#.....',
//     '..#.#................#......###..##.#.#...##...#..',
//     '.#.#....#..#............#....#......#............#',
//     '..#..#...#.#.#...#...........#.......##.#...#.#...',
//     '#..........#.....#.....#......#.......#.#...##....',
//     '.......#...........#...........#....#............#',
//     '...####.#.....#.##.....#.......##.#..#......#.....',
//     '.#..#.....#..#......#.............#.#.#..##...#...',
//     '..#.#.#.........#...#..#.......#................##',
//     '.#..##.#.#...#.............#..#..........#..#...#.',
//     '....#........#......#...###..#.#..................',
//     '#..#..#.....#.#.#...##....##........#........#....',
//     '.....#.#.......##.......#.....#........#..##..#...',
//     '#.#.##........#..##.#..#.#...#........#.#......#..',
//     '....#.#.#.......#.##.##...##...#..#.###...#.#.#...',
//     '.....##.#....#........#....#.#........#.#.#.....#.',
//     '.....#..##..#.#....#.......#...#.#.###.........#.#',
//     '#.....#.##..#.......###.........#..##..#......##..'];
//
// reachTheEnd(grid01, 3);
// reachTheEnd(grid02, 6);
// reachTheEnd(grid03, 5);
// reachTheEnd(grid04, 10);
// // reachTheEnd(grid05, 8);
// // reachTheEnd(grid06, 2244);
// reachTheEnd(grid010, 2244);
// reachTheEnd(grid011, 2244);

