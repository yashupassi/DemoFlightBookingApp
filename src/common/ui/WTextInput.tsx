import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Platform } from 'react-native';
import { WRow, WTouchable } from '.';
import Colors from '../styles/Colors';
import Utils from '../util/Utils';
import Eye from '../../../assets/img/eye.svg';
import Hidden from '../../../assets/img/hidden.svg';


/**
 * Custom TextInput component with additional features and styling options.
 *
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - Customized TextInput component.
 */
const WTextInput = forwardRef((props, ref) => {
  const {
    placeholderTextColor,
    placeholderName,
    keyboardType,
    onSubmitEditing,
    secureTextEntry,
    returnKeyLabel,
    returnKeyType,
    source,
    style,
    getFocus,
    multilineStyle,
    editable,
    multiline,
    isError,
    inputContainerStyle,
    isPassword,
    toggleSecureTextEntry,
    isAlignRight,
    component,
    currency,
    value,
    onChangeText,
    isSearchInput,
    icon,
    onPressScan,
    isCommentInput = false,
    onPressSend,
    ...rest
  }:any = props;

  // Destructure styles for better readability
  const { container, inputText, multilineTextInputStyle, iconStyle } = styles;
  const emailFormattedIcon = null;

  return (
    <WRow
      flex
      dial={5}
      style={[
        container,
        multilineStyle,
        inputContainerStyle,
        isError && isError.status
          ? { borderColor: Colors.white }
          : inputContainerStyle,
        { paddingLeft: Utils.scaleSize(icon ? 5 : 0) },
      ]}
    >
      {icon ? icon : null}
      {component ? component(isError) : null}
      <TextInput
        {...rest}
        ref={ref} // This line forwards the ref to the underlying TextInput
        editable={editable}
        underlineColorAndroid="transparent"
        placeholderTextColor={Colors.darker_gray}
        placeholder={placeholderName}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        style={[
          inputText,
          style,
          isAlignRight ? { textAlign: 'right' } : {},
          multiline ? { textAlignVertical: 'top' } : {},
        ]}
      />
      {isPassword ? (
        <WTouchable margin={[0, 10, 0, 0]} onPress={toggleSecureTextEntry} dial={5}>
          {!secureTextEntry ? (
            <Eye height={Utils.scaleSize(20)} width={Utils.scaleSize(20)} />
          ) : (
            <Hidden height={Utils.scaleSize(20)} width={Utils.scaleSize(20)} />
          )}
        </WTouchable>
      ) : null}
    </WRow >
  );
});

// PropTypes for type-checking and documentation
WTextInput.propTypes = {
  placeholderTextColor: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  returnKeyType: PropTypes.string,
  source: PropTypes.any,
  placeholderName: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  multilineStyle: PropTypes.any,
  multiline: PropTypes.bool,
  isError: PropTypes.object,
  isPassword: PropTypes.bool,
  toggleSecureTextEntry: PropTypes.func,
  component: PropTypes.func,
  isAlignRight: PropTypes.bool,
  currency: PropTypes.bool,
  isEmailFormatted: PropTypes.bool,
};

// Default prop values
WTextInput.defaultProps = {
  placeholderTextColor: Colors.dark_gray,
  keyboardType: 'default',
  secureTextEntry: false,
  returnKeyType: 'next',
  multiline: false,
  editable: true,
  isError: {},
  isPassword: false,
  isEmailFormatted: false,
};

// Styles for better organization
const styles = {
  container: {
    borderColor: Colors.border_gray,
    borderWidth: Utils.scaleSize(Platform.OS === 'ios' ? 2 : 3),
    borderRadius: Utils.scaleSize(5),
  },
  inputText: {
    flex: 1,
    minHeight: Utils.scaleSize(40),
    padding: 0,
    paddingHorizontal: Utils.scaleSize(8),
    fontSize: Utils.scaleSize(Platform.OS === 'ios' ? 13 : 14),
    fontStyle: 'normal',
    letterSpacing: 0,
    paddingVertical: 0,
    color: Colors.black,
  },
  multilineTextInputStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginHorizontal: Utils.scaleSize(20),
    marginVertical: Utils.scaleSize(10),
  },
  iconStyle: {
    width: Utils.scaleSize(20),
    height: Utils.scaleSize(20),
  },
};

export default WTextInput;
