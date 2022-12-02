import Piece from "./piece";
import Position from "./position";
import { FileValues } from "./types";

export default class King extends Piece {
  canMoveTo(position: Position): boolean {
    //Destructuring for better reading
    const [currentFile, currentRank] = [this.position.getFile(), this.position.getRank()];
    const [targetFile, targetRank] = [position.getFile(), position.getRank()];
    // Validate the move is not to same position
    if (currentFile == targetFile && currentRank == targetRank) return false;
    // Create constants to count files and ranks spaces to move
    const movingFiles = Math.abs(FileValues[currentFile] - FileValues[targetFile]);
    const movingRanks = Math.abs(currentRank - targetRank);
    // Validate movements are posible in each
    const allowFilesMove = movingFiles == 1 || movingFiles == 0;
    const allowRanksMove = movingRanks == 1 || movingRanks == 0;
    // Return boolean
    return allowFilesMove && allowRanksMove;
  }
}
