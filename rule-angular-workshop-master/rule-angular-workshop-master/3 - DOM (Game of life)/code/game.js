window.addEventListener('DOMContentLoaded', function () {
	//When the page structure is loaded...

	var ROWS = 90, COLS = 90,
		cellProto,
		getLiveNeighbours,
		nextCycle,
		createCanvas,
		createCell,
		init,
		appendListeners,
		isPending = false,
		cycleTimeout,
		cells;

	cellProto = {
		isAlive: function(){
			return this.alive;
		},

		die: function(){
			this.alive = false;
			this.dom.classList.remove('alive');
		},

		live: function(){
			this.alive = true;
			this.dom.classList.add('alive');
		},
	};

	appendListeners = function (container, startBtn, stopBtn, clearBtn) {

		container.addEventListener('mousedown', function(e){

			var cell, target = e.target;
			if(target.classList.contains('cell'))
			{
				cell=cells[target.dataset.index];
				if(cell.isAlive())
					{cell.die();}
				else
					{cell.live();}
			}
		});

		startBtn.addEventListener('click',function(e){
			nextCycle(cells);
		});

		stopBtn.addEventListener('click', function(e){
			clearTimeout(cycleTimeout);
		});

		clearBtn.addEventListener('click', function(e){

			for(var x in cells)
			{
				cells[x].die();
			}
		});
	};

	init = function (xRows, yRows) {
		var container = document.querySelector('#game-canvas');
		cells = createCanvas(container, xRows, yRows).map(createCell);
		appendListeners(
			container,
			document.querySelector('.start'),
			document.querySelector('.stop'),
			document.querySelector('.clear')
		);
	};

	createCanvas = function (container, rows, colls) {

		var cellElements = [];
		var cellElement = document.createElement("div");
		cellElement.classList.add('cell');
		var fragment = document.createDocumentFragment();

		for(var i=0;i<rows;i++)
		{
			for(var j=0;j<colls;j++)
			{
				var child = cellElement.cloneNode(true);
				child.style.position = "absolute";
				child.style.left = (j * 10) + "px";
				child.style.top = (i * 10) + "px";
				child.setAttribute('data-index',(rows*i)+j);
				fragment.appendChild(child);
				cellElements.push(child);
			}
		}
		container.appendChild(fragment);
		return cellElements;
	};

	createCell = function (domEl) {
		var cell = Object.create(cellProto);
		cell.alive = false;
		cell.dom = domEl;
		return cell;
	};

	getLiveNeighbours = function (index, cells) {
		return [
			index - 1,
			index + 1,
			index - COLS - 1,
			index - COLS,
			index - COLS + 1,
			index + COLS - 1,
			index + COLS,
			index + COLS + 1,
		].filter(function (cellInd) {
			return cellInd >= 0 && cellInd < COLS * ROWS;
		}).reduce(function (preValue, cellInd) {
			return preValue + (cells[cellInd].isAlive() ? 1 : 0);
		}, 0);
	};

	nextCycle = function (cells) {
		cycleTimeout = window.setTimeout(function () {
			cells.map(function (cell, index) {
				return getLiveNeighbours(index, cells);
			}).forEach(function (neighbours, index) {
				if (cells[index].isAlive()) {
					if (neighbours < 2 || neighbours > 3) {
						cells[index].die();
					}
				} else if (neighbours === 3) {
					cells[index].live();
				}
			});

			nextCycle(cells);
		}, 150);
	};
	init(ROWS, COLS);

});
