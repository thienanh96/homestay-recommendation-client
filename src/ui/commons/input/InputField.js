import React from 'react';
import { Field, } from "redux-form/immutable";
import { Input } from "antd";
import { makeField } from "./MakeField";
const AInput = makeField(Input);

export const TextInput = props => <Field component={AInput} {...props} />;
