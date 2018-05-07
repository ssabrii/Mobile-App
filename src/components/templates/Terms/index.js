import React from 'react';
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        pop: PropTypes.func.isRequired
    }).isRequired,
    onAcceptPress: PropTypes.func
};

const defaultProps = {
    onAcceptPress: () => {}
};

const Terms = (props) => {
    const { navigate, pop } = props.navigation;
    const onAccpetPressHandler = async () => {
        await props.onAcceptPress();
        navigate('App');
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                translucent
                barStyle="dark-content"
            />

            <Text style={styles.title}>Before continuing</Text>
            <Text style={styles.paragraph}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                as opposed to using 'Content here, content here', making it look like readable English.
            </Text>
            <Text style={styles.paragraph}>
                I agree many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by accident,
                sometimes on purpose (injected humour and the like).
            </Text>

            <View style={styles.buttonsView}>
                <TouchableOpacity onPress={onAccpetPressHandler}>
                    <View style={styles.acceptButtonView}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => pop(3)}>
                    <View style={styles.declineButtonView}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

Terms.propTypes = propTypes;
Terms.defaultProps = defaultProps;

export default Terms;
