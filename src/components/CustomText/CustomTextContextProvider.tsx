import React, {createContext, useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {CustomTextProps} from '.';

export const CustomTextContext = createContext<Partial<CustomTextProps>>({});

export const CustomTextContextProvider = (props: CustomTextProps) => {
  const parent = useContext(CustomTextContext);

  const value = useMemo(() => {
    return {
      ...parent,
      ...props,
      style: StyleSheet.compose(parent.style, props.style),
    };
  }, [parent, props]);

  return <CustomTextContext.Provider {...props} value={value} />;
};
