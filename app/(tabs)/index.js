import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';

export default function HomeScreen() {
  return (
    <MenuProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/reve-icon.png')} // Use the imported image
              style={styles.logo}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Home</Text>
            </View>
            <Menu>
              <MenuTrigger>
                <Image
                  source={require('@/assets/images/reve-icon.png')} // Replace with your profile icon path
                  style={styles.profileLogo}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => alert('Log Out')}>
                  <Text style={styles.menuText}>Log Out</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <View>
            <Text style={styles.fotobesar}>ini tempat foto</Text>
          </View>
          <View>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', paddingTop: 20, paddingLeft: 20 }}>Catalogue</Text>
          </View>

        </View>
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Match the background color of the header
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures space between the items
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center', // Centers the title horizontally within this container
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  menuText: {
    padding: 10,
    fontSize: 16,
  },
  fotobesar: {
    fontSize: 80,
    textAlign: 'center',
    backgroundColor: '#f00',
  },
});
