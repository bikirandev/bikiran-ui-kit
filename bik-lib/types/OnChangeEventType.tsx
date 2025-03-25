import { ChangeEvent } from "react";

export type TOnChangeEvent = ChangeEvent<HTMLInputElement>;

export type TOnSelectEvent = ChangeEvent<HTMLSelectElement>;

export type TOnChangeTextarea = ChangeEvent<HTMLTextAreaElement>;

export type TOnChangeEventWithCheckbox = ChangeEvent<HTMLInputElement>;

export type TOnChangeAllEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
