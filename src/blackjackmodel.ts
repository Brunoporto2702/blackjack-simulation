import Cassino from "./models/cassino";
import Player from "./models/player";

let cassion = new Cassino(1, [new Player("Player 1", 0, false), new Player("Player 2", 0, false)]);
cassion.start(1000);