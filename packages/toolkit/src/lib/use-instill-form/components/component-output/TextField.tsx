"use client";

import { Nullable } from "../../../type";
import { ComponentOutputFieldBaseProps } from "../../types";
import { FieldRoot } from "./FieldRoot";
import { MDTextViewer } from "./MDTextViewer";
import { NoOutput } from "./NoOutput";

export type TextFieldProps = {
  text: Nullable<string>;
} & ComponentOutputFieldBaseProps;

export const TextField = (props: TextFieldProps) => {
  const { title, text, hideField } = props;

  const normalizedText = text ? String(text) : null;

  return (
    <FieldRoot title={title} fieldKey={`${title}-field`}>
      {!hideField ? (
        typeof normalizedText === "string" ? (
          <MDTextViewer text={normalizedText} />
        ) : (
          <NoOutput />
        )
      ) : null}
    </FieldRoot>
  );
};
