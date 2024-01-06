import React, { forwardRef } from 'react';
import { WRow, WText, WTextInput, WView } from '../ui';
import Utils from '../util/Utils';
import Colors from '../styles/Colors';

// Input component using forwardRef for flexible usage
const Input = forwardRef((props, ref) => {

  const {
    icon,
    placeholder,
    isMultiple,
    onChangeText,
    isError,
    is_icon,
    style,
    onChange,
    value,
    editable,
    keyboardType,
    returnKeyType,
    onBlur,
    isCountryPicker,
    onCountrySelect,
    selectedCountry,
    maxLength,
    pointerEvents,
    isPassword,
    toggleSecureTextEntry,
    secureTextEntry,
    isSearchInput,
    title,
    onPressScan,
    inputContainerStyle,
    isCommentInput,
    onPressSend,
    fontSize,
    titleStyle,
    inputStyle,
    autoCapitalize,
    autoComplete,
    autoCorrect,
    clearButtonMode,
    cursorColor = Colors.theme_color,
    enablesReturnKeyAutomatically,
    enterKeyHint,
    importantForAutofill,
    inputMode,
    selectionColor = Colors.theme_color,
    selectTextOnFocus,
    onSubmitEditing,
    isUserName,
    inputRowStyle
  }: any = props;
  const { container } = getStyles();

  // Input configuration object with various properties
  let input: any = {
    ref: ref,
    placeholderName: placeholder,
    onSubmitEditing: onSubmitEditing,
    multiline: isMultiple,
    onChangeText: onChange,
    editable: editable,
    keyboardType: keyboardType,
    returnKeyType: returnKeyType,
    onBlur: onBlur,
    maxLength: maxLength,
    pointerEvents: pointerEvents,
    isPassword: isPassword,
    toggleSecureTextEntry: toggleSecureTextEntry,
    secureTextEntry: secureTextEntry,
    isSearchInput: isSearchInput,
    icon: icon,
    onPressScan: onPressScan,
    inputContainerStyle: inputContainerStyle,
    isCommentInput: isCommentInput,
    onPressSend: onPressSend,
    style: inputStyle,
    autoCapitalize: autoCapitalize,
    autoComplete: autoComplete,
    autoCorrect: autoCorrect,
    clearButtonMode: clearButtonMode,
    cursorColor: cursorColor,
    enablesReturnKeyAutomatically: enablesReturnKeyAutomatically,
    enterKeyHint: enterKeyHint,
    importantForAutofill: importantForAutofill,
    inputMode: inputMode,
    selectionColor: selectionColor,
    selectTextOnFocus: selectTextOnFocus,
  };

  if (value) input.value = value;

  return (
    <>
    {/* Container for the entire input component */}
      <WView style={[container, style]}>
        {/* Display title if provided */}
        {title?.length > 0 &&
          <WText
            style={[{ marginLeft: Utils.scaleSize(10) }, titleStyle]}
            color={Colors.dark_gray}
            fontFamily={'AtkinsonHyperlegible-Regular'}
            fontSize={fontSize || Utils.scaleSize(15)}>
            {title}
          </WText>}
          {/* Row containing input and optional icon elements */}
        <WRow style={inputRowStyle} flex >
          {/* Input component itself */}
          <WTextInput {...input} ref={ref} />
        </WRow>
      </WView>
      {/* Display error message if isError is true */}
      {isError && isError.status ? (
        <WText
          lines={0}
          color={Colors.orange}
          right
          margin={[0, Utils.scaleSize(5)]}>
          {isError?.message || 'Required'}
        </WText>
      ) : null}
    </>
  );
})

// Function to define styles for the Input component
const getStyles = () => {
  // const { isMultiple }: any = props;

  return {
    container: {
      marginTop: Utils.scaleSize(10),
    },
  };
};


export default Input