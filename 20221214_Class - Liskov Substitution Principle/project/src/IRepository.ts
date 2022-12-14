export interface IRepository {
  insert<Type>(request: Type): void;
  get<Type>(request: number): Type;
}
