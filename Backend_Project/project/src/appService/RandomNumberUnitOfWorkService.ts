let seed = 42;
export default class RandomNumberSupportService {
  randomNumber(maxValue: number): number {
    const currentTime = new Date();
    const result = (seed * seed).toString().padStart(4, "0").slice(1, 3);
    seed = parseInt(result);
    const randNum = (seed + currentTime.getMilliseconds()) % maxValue;
    return randNum;
  }
}
