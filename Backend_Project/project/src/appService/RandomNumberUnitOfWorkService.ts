export default class RandomNumberSupportService {
  randomNumber(maxValue: number): number {
    const currentTime = new Date();
    const [month, day, hour, minutes, seconds, milliseconds] = [
      currentTime.getMonth(),
      currentTime.getDay(),
      currentTime.getHours(),
      currentTime.getMinutes(),
      currentTime.getSeconds(),
      currentTime.getMilliseconds(),
    ];
    const randomNumber = (month * day * hour * minutes * seconds * milliseconds)
      .toString()
      .slice(0, 6);
    return Number(randomNumber) % maxValue;
  }
}
