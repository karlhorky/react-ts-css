import {
  CancellationToken,
  Color,
  ColorInformation,
  ColorPresentation,
  DocumentColorProvider as _DocumentColorProvider,
  Position,
  ProviderResult,
  Range,
  TextDocument,
} from "vscode";
import Settings from "../../settings";
import { ProviderKind } from "../types";
import { CSSProvider } from "./CSSProvider";

export class CssDocumentColorProvider implements _DocumentColorProvider {
  provideDocumentColors(document: TextDocument): ColorInformation[] {
    if (!Settings.cssSyntaxColor) {
      return [];
    }
    const provider = new CSSProvider({
      providerKind: ProviderKind.Colors,
      document,
      position: new Position(0, 0), // providing a dummy position as it not needed for document
    });
    return provider.provideColorInformation();
  }
  provideColorPresentations(
    color: Color,
    context: { readonly document: TextDocument; readonly range: Range },
    token: CancellationToken
  ): ColorPresentation[] {
    if (!Settings.cssSyntaxColor) {
      return [];
    }
    const provider = new CSSProvider({
      providerKind: ProviderKind.Colors,
      document: context.document,
      position: new Position(0, 0), // providing a dummy position as it not needed for document
    });
    return provider.getColorPresentation(color, context.range);
  }
}
