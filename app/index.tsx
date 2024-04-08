import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegistrationForm from '@/components/RegistrationForm'
import Camera from '@/components/Camera'
import FileToBase64Screen from '@/components/IDProof'
import FileUploadScreen from '@/components/IDProof'
import FilePickerScreen from '@/components/IDProof'

const HomeScreen = () => {
  return (
    <ScrollView>
      <RegistrationForm/>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})