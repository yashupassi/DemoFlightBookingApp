import React, { memo } from 'react';
import { WSpinner, WView } from '../ui';
import Colors from '../styles/Colors';

function Loader() {
    return (
        <WView dial={5} flex backgroundColor={Colors.white}>
          <WSpinner size={'large'} color={Colors.black} />
        </WView>
    );
}

export default memo(Loader);