import Piece from "./piece";
import Position from "./position";
import { FileValues } from "./types";

export default class Bishop extends Piece {
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
    const movingDiagonal = movingRanks == movingFiles;
    // Return boolean
    return movingDiagonal;
  }
}
