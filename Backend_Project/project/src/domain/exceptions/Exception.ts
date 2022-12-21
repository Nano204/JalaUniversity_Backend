export default class Exception {
  itemNotFoundException(itemName: string, itemId: number) {
    throw new Error(`${itemName} with id ${itemId} not found.`);
  }
}
