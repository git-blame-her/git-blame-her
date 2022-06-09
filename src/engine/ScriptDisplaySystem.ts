export interface ScriptOptions {
  script: string;
  hideWindow: boolean;
}

export interface TextLine {
  type: "text";
  text: string;
}

export interface Line {
  type: "text" | "delay",

}

export interface ScriptObject extends ScriptOptions {
  lines: Line[];
}

export function parseScriptObject(so: ScriptObject) {

}