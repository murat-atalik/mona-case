import {FunctionComponent, memo} from 'react';

export const standartComponentMemoiser = <P extends object>(
  Component: FunctionComponent<P>,
  propsAreEqual?: any,
) => memo(Component, propsAreEqual);
