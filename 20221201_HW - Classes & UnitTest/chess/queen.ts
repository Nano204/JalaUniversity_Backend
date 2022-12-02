import Piece from "./piece";
import position from "./position";
import { FileValues } from "./types";

export default class Queen extends Piece {
  canMoveTo(position: position): boolean {
    //Destructuring for better reading
    const { file: currentFile, rank: currentRank } = this.position;
    const { file: targetFile, rank: targetRank } = position;
    // Validate the move is not to same position
    if (currentFile == targetFile && currentRank == targetRank) return false;
    // Create constants to count files and ranks spaces to move
    const movingFiles = FileValues[currentFile] - FileValues[targetFile];
    const movingRanks = currentRank - targetRank;
    // Validate movements are posible in each
    const movingHorizontal = movingFiles == 0;
    const movingVertical = movingRanks == 0;
    const movingDiagonal = movingRanks == movingFiles;
    // Return boolean
    return movingHorizontal || movingVertical || movingDiagonal;
  }
}
