enum Colors {
  Reset = "\u001B[0m",
  Bright = "\u001B[1m",
  Dim = "\u001B[2m",
  Underscore = "\u001B[4m",
  Blink = "\u001B[5m",
  Reverse = "\u001B[7m",
  Hidden = "\u001B[8m",

  FgBlack = "\u001B[30m",
  FgRed = "\u001B[31m",
  FgGreen = "\u001B[32m",
  FgYellow = "\u001B[33m",
  FgBlue = "\u001B[34m",
  FgMagenta = "\u001B[35m",
  FgCyan = "\u001B[36m",
  FgWhite = "\u001B[37m",
  FgGray = "\u001B[90m",

  BgBlack = "\u001B[40m",
  BgRed = "\u001B[41m",
  BgGreen = "\u001B[42m",
  BgYellow = "\u001B[43m",
  BgBlue = "\u001B[44m",
  BgMagenta = "\u001B[45m",
  BgCyan = "\u001B[46m",
  BgWhite = "\u001B[47m",
  BgGray = "\u001B[100m",
}

const reset = "\u001B[0m";

export const logger = {
  log: (text: string) => console.log(Colors.FgWhite + text + reset),
  green: (text: string) => console.log(Colors.FgGreen + text + reset),
  red: (text: string) => console.log(Colors.FgRed + text + reset),
  blue: (text: string) => console.log(Colors.FgBlue + text + reset),
  yellow: (text: string) => console.log(Colors.FgYellow + text + reset),
};
