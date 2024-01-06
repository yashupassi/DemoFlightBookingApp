import React, { memo } from 'react';
import { Modal, Platform } from 'react-native';
import { WText, WTouchable, WView } from '../ui';
import DateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../styles/Colors';
import { Utils } from '../util';

function CustomDatePicker(props: any) {
  const { mode = "date", display = "", value = "", onChange, closeModal, minDate = "" } = props;

  // Function to render the DateTimePicker for iOS
  const renderIOSPicker = () => {
    return (
      <Modal visible={true} statusBarTranslucent={true} transparent={true} animationType={"fade"}>
        <WView flex dial={8} style={{ backgroundColor: Colors.black_opacity }}>
          {/* Close button for iOS */}
          <WTouchable style={{ alignSelf: "flex-end" }} onPress={closeModal}>
            <WText right color={Colors.white} fontSize={Utils.scaleSize(20)} fontWeight={'600'}>{"Done"}</WText>
          </WTouchable>
          {/* Date picker container for iOS */}
          <WView style={{ backgroundColor: Colors.white, width: '100%' }}>
            <DateTimePicker minimumDate={minDate} mode={mode} display={display} value={value} onChange={onChange} />
          </WView>
        </WView>
      </Modal>
    )
  }

  // Function to render the DateTimePicker for Android
  const renderAndroidPicker = () => {
    return <DateTimePicker minimumDate={minDate} mode={mode} display={display} value={value} onChange={onChange} />
  }

  // Render the appropriate picker based on the platform
  return <>{Platform.OS === 'ios' ? renderIOSPicker() : renderAndroidPicker()}</>
}

export default memo(CustomDatePicker);
