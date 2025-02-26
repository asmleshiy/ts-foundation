
export default {

  isNil: (value: unknown): value is (null | undefined) => value === null || value === undefined,

  exact: <T extends object> (arg: T): T => arg,

}
