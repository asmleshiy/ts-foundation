
export const isNil = (value: unknown): value is (null | undefined) => value === null || value === undefined

export const exact = <T extends object> (arg: T): T => arg
