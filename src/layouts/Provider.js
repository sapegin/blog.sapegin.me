import React from 'react';
import { TamiaRoot } from 'tamia';
import theme from '../theme';

const Root = ({ children }) => <TamiaRoot theme={theme}>{children}</TamiaRoot>;

export default Root;
