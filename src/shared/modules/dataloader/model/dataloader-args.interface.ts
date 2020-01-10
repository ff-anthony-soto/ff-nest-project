export interface IDataloaderArgs<T> {
  findAll: (keys: number[]) => Promise<T[]>;
  filterBy: keyof T;
  resolvedProperty?: keyof T;
}
