import {View} from 'react-native';
import React from 'react';
import {
  themeBaseStyleCreate,
  useCustomTheme,
} from '../../library/theme/useCustomTheme';
import {SearchIcon} from '../../icons';
import {TextInput} from 'react-native-gesture-handler';

type SearchInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
};

export const SearchInput = (props: SearchInputProps) => {
  const {value, onChangeText} = props;
  const theme = useCustomTheme();
  const styles = themed_style[theme.mode];

  return (
    <View style={styles?.wrapper}>
      <TextInput
        style={styles?.inputStyle}
        placeholder="Şirket veya varlık ara"
        placeholderTextColor={theme.input.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={onChangeText}
        value={value}
      />
      <View style={styles?.iconWrapper} pointerEvents="none">
        <SearchIcon width={20} height={21} color={theme.input.icon} />
      </View>
    </View>
  );
};

const themed_style = themeBaseStyleCreate(theme => {
  return {
    wrapper: {marginHorizontal: 20},
    inputStyle: {
      backgroundColor: theme.input.background,
      height: 36,
      borderRadius: 12,
      overflow: 'hidden',
      paddingVertical: 8,
      paddingLeft: 36,
      paddingRight: 12,
      fontSize: 16,
      lineHeight: 20,
      color: theme.input.text,
    },
    iconWrapper: {
      position: 'absolute',
      left: 12,
      width: 20,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});
