var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container', // Make sure to have a div with this id in your index.html
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('chessboard', 'path/to/chessboard.png');
  this.load.image('rook', 'path/to/rook.png');
}

function create() {
  this.add.image(400, 300, 'chessboard');
  this.rook = this.add.sprite(400, 300, 'rook');
}

this.input.on('pointerdown', function(pointer) {
    if (currentPlayer === playerId) {
        const newPosition = { x: pointer.x, y: pointer.y };
        moveRook(newPosition);
        socket.emit('rookMoved', newPosition);
        currentPlayer = nextPlayer(currentPlayer);
    }
});

function moveRook(newPosition) {
    // Update the rook's position
    rook.x = newPosition.x;
    rook.y = newPosition.y;
}

function nextPlayer(currentPlayer) {
    return currentPlayer === 'player1' ? 'player2' : 'player1';
}

socket.on('rookMoved', function(newPosition) {
    rook.x = newPosition.x;
    rook.y = newPosition.y;
});
