import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewPropTypes
} from 'react-native';
import CardView from 'react-native-cardview'
import PropTypes from 'prop-types';
import Image from 'react-native-remote-svg';

import styles from './styles';

const RNPropTypes = PropTypes || React.PropTypes;

const FacilityView = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            {
                props.isMore == true?
                    props.more != 0 ?
                        <TouchableOpacity onPress={props.onPress}>
                            <Text style={styles.facilityMore}>+{props.more}</Text>
                        </TouchableOpacity>
                    :
                        <View/>
                :   
                    <CardView style={styles.imageBackground}
                        cardElevation={1}
                        cardMaxElevation={1}
                        cornerRadius={0}>
                    
                        <Image source={props.image} style={styles.facilityImage}/>
                    </CardView>
            }

        </View>
    );
}

FacilityView.propTypes = {
    more: PropTypes.number,
    isMore: PropTypes.bool,
};

FacilityView.defaultProps = {
    more: 0,
    isMore: false,
};

export default FacilityView;
