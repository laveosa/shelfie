export enum InputPatternEnum {
  EMAIL = /(.+)@(.+){2,}\.(.+){2,}/,
  PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
}
