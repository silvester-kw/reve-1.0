import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import HelpCenterAccordion from '@/components/Accordion';

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
          <ScrollView>
            <View style={styles.heroContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.heroText}>Change The Way You Dressed</Text>
                <Text style={styles.heroText2}>Welcome to ReVe, Indonesia’s first diverse and circular fashion rental app</Text>
              </View>
              <Image
                source={require('@/assets/images/herofoto.jpg')} // Use the imported image
                style={styles.fotobesar}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Catalogue</Text>
            </View>
            <View style={styles.columnCatalogue}>
              <View style={styles.row1}>
                <View style={[styles.box1, styles.box]}>
                  <Text style={styles.boxText}>Pants</Text>
                  <Image
                source={require('@/assets/images/pants.jpg')} // Use the imported image
                style={styles.fotobesar}
                resizeMode="cover"
              />
                </View>
                <View style={[styles.box2, styles.box]}>
                <Text style={styles.boxText}>Shirts</Text>
                  <Image
                source={require('@/assets/images/shirts.jpg')} // Use the imported image
                style={styles.fotobesar}
                resizeMode="cover"
              />
                </View>
              </View>
              <View style={styles.row2}>
                <View style={[styles.box3, styles.box]}>
                <Text style={styles.boxText}>Skirts</Text>
                  <Image
                source={require('@/assets/images/skirts.jpg')} // Use the imported image
                style={styles.fotobesar}
                resizeMode="cover"
              />
                </View>
                <View style={[styles.box4, styles.box]}>
                <Text style={styles.boxText}>Sweater</Text>
                  <Image
                source={require('@/assets/images/sweater.jpg')} // Use the imported image
                style={styles.fotobesar}
                resizeMode="cover"
              />
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginBottom: 10 }}>Help Center</Text>
            </View>
            <HelpCenterAccordion />
          </ScrollView>
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
    position: 'relative',
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
  test:{
    fontSize: 24,
  },
  columnCatalogue: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: '#fff', 
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  row1: {
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
  row2: {
    marginTop: 30,
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
  box: {
    height: 120,
    width: 163,
    alignItems: 'center', //kanan kiri
    justifyContent: 'center', //atas bawah
    borderRadius: 10,
    overflow: 'hidden'
  },
  box1: {
    backgroundColor: 'red',
  },
  box2: {
    backgroundColor: 'cyan',
  },
  box3: {
    backgroundColor: 'green',
  },
  box4: {
    backgroundColor: 'yellow',
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
  heroContainer: {
    width: '100%', // Adjust the width of the container as needed
    height: 200, // Adjust the height of the container as needed
    overflow: 'hidden', // This will clip the image to the container bounds
  },
  fotobesar: {
    width: '100%',
    height: '100%',
  },
  heroText:{
    fontSize: 15,
    color: 'white', // Adjust text color as needed
    fontWeight: 'bold',  textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5,
  },
  boxText:{
    fontSize: 25,
    color: 'white', // Adjust text color as needed
    fontWeight: 'bold',  textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5,
    zIndex: 1,
    position: 'absolute',
  },
  heroText2:{
    fontSize: 13,
    color: 'white', 
    width: '40%',
    marginTop: 10,
    flexShrink: 1,
  },
  textContainer: {
    position: 'absolute',
    left: 175,
    paddingRight: 30,
    top: 40,
    zIndex: 1, 
  },
});


