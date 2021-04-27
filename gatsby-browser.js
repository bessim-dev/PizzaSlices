/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Layout from './src/components/Layout';
import wrapWithProvider from "./wrapWithProvider"

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
export const wrapRootElement = wrapWithProvider