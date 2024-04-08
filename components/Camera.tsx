import React, { useRef, useState } from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import Webcam from 'react-webcam';

const Camera = () => {
    const webcamRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const openCamera = () => {
        setIsCameraOpen(true);
    };

    const closeCamera = () => {
        setIsCameraOpen(false);
    };

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        closeCamera(); // Close the camera after capturing the image
    };

    return (
        <View style={styles.container}>
            {!isCameraOpen && (
                <Pressable onPress={openCamera} style={styles.button}>
                    <AntDesign name="camera" size={24} color="white" />
                    <Text style={styles.buttonText}>Open Camera</Text>
                </Pressable>
            )}
            {isCameraOpen && (
                <View style={styles.cameraContainer}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={styles.webcam}
                    />
                    <Pressable onPress={captureImage} style={styles.captureButton}>
                        <AntDesign name="camera" size={24} color="white" />
                    </Pressable>
                </View>
            )}
            {capturedImage && (
                <View style={styles.imageContainer}>
                    <Text style={styles.label}>Captured Image:</Text>
                    <Image style={styles.image} source={{uri: capturedImage}} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
    },
    cameraContainer: {
        alignItems: 'center',
    },
    webcam: {
        width: 320,
        height: 240,
        borderRadius: 5,
        marginBottom: 20,
    },
    captureButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 50,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 5,
    },
});

export default Camera;
