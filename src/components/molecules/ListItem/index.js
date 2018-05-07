import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

import styles from './styles';

const defaulProps = {
    textFirst: '',
    textLast:'',
};
/* eslint-disable */
const ListItem = ({

    textFirst,
    textLast,

}) => (
            <View style={styles.Item}>

                <Text style={styles.textFirst}>{textFirst}</Text>
                <Text style={styles.textLast}>{textLast}</Text>

            </View>
    
);

ListItem.defaulProps = defaulProps;

export default ListItem;
