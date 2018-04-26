


// --------------------------------------------------------------------
// Recursive backtracking algorithm for maze generation. Requires that
// the entire maze be stored in memory, but is quite fast, easy to
// learn and implement, and (with a few tweaks) gives fairly good mazes.
// Can also be customized in a variety of ways.
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1. Allow the maze to be customized via command-line parameters
// --------------------------------------------------------------------

const width = process.argv[2] || 3
const height = process.argv[3] || width

const grid = (new Array(height)).fill((new Array(width)).fill(0, 0), 0)

// --------------------------------------------------------------------
// 2. Set up constants to aid with describing the passage directions
// --------------------------------------------------------------------

const [N, S, E, W] = [1, 2, 4, 8]
const DX = { E: 1, W: -1, N: 0, S: 0 }
const DY = { E: 0, W:  0, N: -1, S: 1 }
const OPPOSITE = { E: W, W: E, N: S, S: N }

// --------------------------------------------------------------------
// 3. The recursive-backtracking algorithm itself
// --------------------------------------------------------------------

function carve (cx, cy, grid) {
	console.log(`carve ${cx} x ${cy}`)
	const directions = shuffle(['N', 'S', 'E', 'W'])

	directions.forEach( direction => {
		const [nx, ny] = [cx + DX[direction], cy + DY[direction]]

		if (ny < 0 || ny >= height) return // outside of vertical grid
		if (nx < 0 || nx >= width) return // outside of horizontal grid
		if (grid[ny][nx] !== 0) return // this grid placement is already taken

		console.log('grid', grid)
		console.log('pre', direction, cy, cx, ny, nx)
		grid[cy][cx] |= direction
		grid[ny][nx] |= OPPOSITE[direction]
		carve(nx, ny, grid)
	})
}

carve(0, 0, grid)

// --------------------------------------------------------------------
// 4. A simple routine to emit the maze as ASCII
// --------------------------------------------------------------------
console.log('grid', grid)

console.log(` _`.repeat(width))

grid.forEach( (yValue, y) => {
	let rowOutput = '|'
	grid[y].forEach( (xValue, x) => {
		rowOutput += (grid[y][x] & S != 0) ? ' ' : '_'
		//if (grid[y][x] & S != 0) 
		// if grid[y][x] & E != 0
		// 	print(((grid[y][x] | grid[y][x+1]) & S != 0) ? " " : "_")
		// else
		// 	print "|"
	})
	console.log(rowOutput)
})
// height.times do |y|
//   print "|"
//   width.times do |x|
//     print((grid[y][x] & S != 0) ? " " : "_")
//     if grid[y][x] & E != 0
//       print(((grid[y][x] | grid[y][x+1]) & S != 0) ? " " : "_")
//     else
//       print "|"
//     end
//   end
//   puts
// end

// --------------------------------------------------------------------
// 5. Show the parameters used to build this maze, for repeatability
// --------------------------------------------------------------------

console.log(`${width} ${height}`)

function shuffle (array) {
	let currentIndex = array.length, temporaryValue, randomIndex
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}
  
	return array
}