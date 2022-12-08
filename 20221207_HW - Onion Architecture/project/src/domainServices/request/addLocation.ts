export class AddLocationRepositoryRequest {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly dimension: string,
  ) {}
}
