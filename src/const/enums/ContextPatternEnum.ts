export enum ContextPatternEnum {
  EMAIL = /(.+)@(.+){2,}\.(.+){2,}/ as any,
  PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ as any,
}
