import React from 'react';
import { Link as LinkBase } from 'tamia';

export const Link = ({ to, ...props }) => <LinkBase href={to} {...props} />;
