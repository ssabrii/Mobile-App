import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';
import Image from 'react-native-remote-svg';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import { validatePassword, validateConfirmPassword } from '../../../utils/validation';
import GoBack from '../../atoms/GoBack';
import SmartInput from '../../atoms/SmartInput';
import styles from './styles';


class CreatePassword extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                params: PropTypes.object //eslint-disable-line
            })
        }),
        onNextPress: PropTypes.func
    }

    static defaultProps = {
        navigation: {
            navigate: () => {},
            state: {
                params: {}
            }
        },
        onNextPress: () => {}
    }
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            password: '',
            confirmPassword: ''
        };
    }

    onChangeHandler(property) {
        return (value) => {
            this.setState({ [property]: value });
        };
    }

    @autobind
    onNextPressHandler() {
        const { navigate } = this.props.navigation;
        const { password } = this.state;
        this.props.onNextPress({ password });
        navigate('Terms');
    }

    render() {
        const { password, confirmPassword } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <GoBack
                    onPress={() => navigate('CreateAccount')}
                    icon="arrowLeft"
                />

                <View style={styles.main}>
                    <View style={styles.titleView}><Text style={styles.titleText}>Create Password</Text></View>

                    <Text style={styles.finePrintText}>
                    Your password must be 8 or more characters long. Do not use any common passwords, repetition or sequences.
                    Try making it longer or adding symbols, like !, # or %.
                    </Text>

                    <View style={styles.inputView}>
                        <SmartInput
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={this.onChangeHandler('password')}
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            rightIcon={validatePassword(password) ? 'check' : null}
                        />
                    </View>

                    <View style={styles.subTitleView}><Text style={styles.titleText}>Please Confirm Your Password</Text></View>

                    <View style={styles.inputView}>
                        <SmartInput
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={confirmPassword}
                            onChangeText={this.onChangeHandler('confirmPassword')}
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            rightIcon={validateConfirmPassword(password, confirmPassword) ? 'check' : null}
                        />
                    </View>

                    <View style={styles.nextButtonView}>
                        <TouchableOpacity
                            disabled={!validatePassword(password) || !validateConfirmPassword(password, confirmPassword)}
                            onPress={this.onNextPressHandler}
                        >
                            <View style={styles.nextButton}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome>{Icons.arrowRight}</FontAwesome>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.lowOpacity}>
                    <Image
                        source={require('../../../assets/get-started-white-outline.svg')}
                        style={styles.getStartedImage}
                    />
                </View>
            </View>
        );
    }
}

export default CreatePassword;
