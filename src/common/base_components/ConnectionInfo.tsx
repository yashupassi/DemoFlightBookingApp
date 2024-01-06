// Import necessary components and utilities from React, PropTypes, custom UI components, NetInfo, Colors, and Redux
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WText } from '../ui';
import * as NetInfo from "@react-native-community/netinfo";
import Colors from '../styles/Colors';
import { connect } from 'react-redux'

// Class component for displaying connection status information
class ConnectionInfo extends PureComponent {
    // Declare instance variables
    _isMount: any;
    interval: any;
    connectStatus: any;
    _state: any;
    state: any;

    // Define propTypes for the component
    static propTypes = {
        onConnectionStatusChange: PropTypes.func
    }

    // Constructor to initialize state and instance variables
    constructor(props: any) {
        super(props);

        // Initialize state with default values
        this.state = {
            isShowAlert: false,
            response: {
                status: '',
                message: ''
            }
        }

        // Initialize instance variables
        this._isMount = true;
        this.interval = undefined;
        this.connectStatus = "online";

        // Call the initialization function
        this.init();

    }

    // Function to show a message based on the connection status
    showMessage = (status: any) => {
        const { onConnectionStatusChange } = this.props as any;
        // If the connection status hasn't changed, return
        if (this.connectStatus === status) {

            return;
        }

        // Update connection status and show appropriate message
        this.connectStatus = status;
        if (status === "offline") {
            this._setState({
                isShowAlert: true,
                response: {
                    message: "Offline",
                    status: "offline"
                }
            });
            onConnectionStatusChange && onConnectionStatusChange(false);
            return;
        }

        this._setState({
            isShowAlert: true,
            response: {
                message: "Back Online",
                status: "online"
            }
        });

        // Hide the message after a delay
        setTimeout(() => {
            this._setState({
                isShowAlert: false,
                response: {
                    message: "",
                    status: ""
                }
            });
            this.connectStatus = "online";
        }, 2000);
        onConnectionStatusChange && onConnectionStatusChange(true);
    }

    // Helper function to safely set the component state
    _setState = (state: any, cb?: () => void): any => {
        if (!this._isMount) return;

        if (cb) this.setState(state, cb);
        else this.setState(state);
    }

    // Initialization function to set up periodic checks for connection status
    init = () => {
        this._handleSetInterval(this._handleSetInterval.bind(this));
    }

    // Recursive function to periodically check and handle the connection status
    _handleSetInterval = (cb: (a: any) => void): any => {
        setTimeout(async () => {
            try {
                // Check connection status at the specified interval
                const { isConnected } = await NetInfo.fetch();
                this.handleFirstConnectivityChange(isConnected);
                // If the component is unmounted, return
                if (!this._isMount) return;
                cb && cb(this._handleSetInterval.bind(this));
            } catch (error) { }
        }, 1 * 1000); // Check every 1 second
    }

    // Function to handle the first change in connectivity and show appropriate message
    handleFirstConnectivityChange = (isConnected: boolean | null) => {
        this.showMessage(isConnected ? "online" : "offline");
    }

    // Lifecycle method to clean up resources when the component is unmounted
    componentWillUnmount = () => {
        this._isMount = false;
    }

    // Render method to display the connection status message
    render() {
        const { isShowAlert, response } = this.state;

        // If the message is not to be shown, return null
        if (!isShowAlert) return null;

        // Render a view with the connection status message
        return (
            <WView backgroundColor={response.status === "online" ? Colors.green : Colors.red} dial={5} padding={[2, 10]}>
                <WText color={Colors.white} center>{response.message}</WText>
            </WView>
        )
    }
}

// Map state to props function (currently empty)
const mapToProps = ({ }) => {

    return ({});
}

// Connect the component to the Redux store
export default connect(mapToProps)(ConnectionInfo as any);