import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Image } from 'react-native';
import { WView } from '.';

/**
 * WImage component for rendering an image with customizable styles and dimensions.
 *
 * @class WImage
 * @extends {Component}
 */

export default class WImage extends Component {
    isStateChange: boolean;
    state: any = {
        width: 0,
        height: 0
    };
    props: any;
    image: any;

    /**
     * Creates an instance of WImage.
     * @param {object} props - The properties of the component.
     */
    constructor(props: any) {
        super(props);

        this.isStateChange = true;
    }

    /**
     * Lifecycle method called after component mounts.
     */
    componentDidMount = () => {
        this.isStateChange = true;
    }

    /**
     * Lifecycle method called before component unmounts.
     */
    componentWillUnmount() {
        this.isStateChange = false;
    }

    // PropTypes for type checking
    static propTypes = {
        dial: PropTypes.number,
        containerStyle: PropTypes.any,
        imageStyle: PropTypes.any,
        source: PropTypes.any,
        width: PropTypes.number,
        ratio: PropTypes.number
    }

    // Default values for props
    static defaultProps = {
        dial: 5,
        width: 0,
        source: { uri: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }
    }

    /**
     * Callback function triggered when the component's layout changes.
     *
     * @param {object} event - The layout event.
     * @memberof WImage
     */
    _onLayout(event: any) {
        const { width, source, ratio }: any = this.props;
        const containerWidth = width ? width : event.nativeEvent.layout.width;

        if (this.props.ratio) {
            // Set dimensions based on the provided ratio
            this.setState({
                width: containerWidth,
                height: containerWidth * ratio
            });
        } else {
            // Calculate dimensions based on the image size
            this.isStateChange &&
                Image.getSize(source && source.uri ? source.uri : source, (width, height) => {
                    this.setState({
                        width: containerWidth,
                        height: containerWidth * height / width
                    });
                });
        }
    }

    /**
     * Renders the WImage component.
     *
     * @returns {JSX.Element} - Rendered WImage component.
     * @memberof WImage
     */
    render() {
        const { source, containerStyle, imageStyle }: any = this.props;
        const { dial }: any = this.props;

        return (
            <WView dial={dial} onLayout={this._onLayout.bind(this)} style={[containerStyle]}>
                <Image
                    ref={ref => this.image = ref}
                    source={source}
                    style={[
                        {
                            width: this.state.width,
                            height: this.state.height
                        },
                        imageStyle
                    ]} />
            </WView>
        );
    }
}

const styles = {
    container: {

    }
}