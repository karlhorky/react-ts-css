import { parse } from "@babel/parser";
import { isImportDeclaration, Program } from "@babel/types";
import * as vscode from "vscode";
import { Range } from "vscode-css-languageservice";
import { colors } from "../constants";
import { Variable } from "./v2/css";

export const getImportDeclarations = (
  ast: ReturnType<typeof parse> | undefined
) => {
  if (!ast?.program) {
    return [];
  }
  return ast.program.body.filter((node) => isImportDeclaration(node));
};

export const isColorString = (color: string) => {
  return (
    color in colors ||
    /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color) ||
    color.startsWith("hsl") ||
    color.startsWith("rgba") ||
    color.startsWith("rgb")
  );
};

export const toColorCode = (color: string) => {
  return color in colors ? colors[color] : color;
};

export const generateVariableKey = (v: Variable) => {
  return `${v.name}_${v.location.value_range.start.line}_${v.location.value_range.start.character}_${v.location.value_range.end.line}_${v.location.value_range.end.character}`;
};

export const rangeStrictEqual = (source: Range, target: Range) => {
  return (
    source.start.line === target.start.line &&
    source.start.character === target.start.character &&
    source.end.line === target.end.line &&
    source.end.character === target.end.character
  );
};

export const rangeLooseEqual = (source: Range, target: Range) => {
  return (
    source.start.line === target.start.line &&
    source.start.character >= target.start.character &&
    source.end.line === target.end.line &&
    source.end.character <= target.end.character
  );
};

export const toVsCodeRange = (range: Range) => {
  return new vscode.Range(
    new vscode.Position(range.start.line, range.start.character),
    new vscode.Position(range.end.line, range.end.character)
  );
};

export const toVsCodePosition = (range: Range) => {
  return new vscode.Position(range.start.line, range.start.character);
};

export const isSuffix = (selector: string) => {
  return selector.startsWith("&-") || /^&[a-z|A-Z|0-9]/i.test(selector);
};

export const isSibling = (selector: string) => {
  return selector.startsWith("&.");
};

export const isChild = (selector: string) => {
  return selector.startsWith("& .");
};

export const isPsuedo = (selector: string) => {
  return selector.indexOf(":") > -1;
};

export const isNormal = (selector: string) => {
  return selector.startsWith(".");
};

export const isCombination = (selector: string) => {
  return selector.indexOf(".") > -1;
};
