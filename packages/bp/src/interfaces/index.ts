
export interface Constructor<T extends object> extends Function {
  new(...args: any[]): T
}

export interface PropertySelector<T extends object, K extends keyof T = keyof T> {
  (object: T): T[K]
}

export interface MethodDecorator<T> {
  (target: any, propertyKey: string, descriptor: PropertyDescriptor): TypedPropertyDescriptor<(...args: any[]) => T>
}
