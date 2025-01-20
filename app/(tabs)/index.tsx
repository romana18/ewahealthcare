import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Dimensions, TextInput } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { Card } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');



const renderHospital = ({ item }) => (
  <View style={{  justifyContent: "center", alignItems: "center" }}>
    <Image
      source={{ uri: item.image }}
      style={{height: 200, borderRadius: 15 }}
    />
  </View>
);
const services = [
  { id: 1, src: 'https://i.ibb.co/Z2sDJ7M/english-teacher-doing-her-lessons-online.jpg', text: 'Online Consultation' },
  { id: 2, src: 'https://i.ibb.co/rdnRXFt/gynecologist-evaluating-pregnancy-with-patient.jpg', text: 'OPD/Clinical Appointment' },
  { id: 3, src: 'https://i.ibb.co/89hswTM/close-up-laboratory-desk-with-professional-research-equipment-tray-vacutainers-with-blood-microscopi.jpg', text: 'Book Lab Tests' },
  { id: 4, src: 'https://i.ibb.co/7JZwFdq/450079-PEZQXQ-805.jpg', text: 'Emergency Ambulance' },
];
const scrollX = useRef(new Animated.Value(0)).current;

const partnerHospitals = [
  { id: "1", image: "https://via.placeholder.com/300" },
  { id: "2", image: "https://via.placeholder.com/300" },
  { id: "3", image: "https://via.placeholder.com/300" },
];

const carouselItems = [
  { id: 1, imageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg', text: 'Your Health, Our Priority' },
  { id: 2, imageUrl: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg', text: 'Comprehensive Care for All' },
  { id: 3, imageUrl: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg', text: 'Stay Fit, Stay Healthy' },
];

const healthTips = [
  { id: 1, icon: 'local-drink', tip: 'Stay Hydrated' },
  { id: 2, icon: 'directions-run', tip: 'Exercise Daily' },
  { id: 3, icon: 'nightlight-round', tip: 'Sleep Well' },
  { id: 4, icon: 'favorite-border', tip: 'Heart Health' },
];

const specialists = [
  { id: 1, icon: 'favorite', name: 'Cardiologist', description: 'Heart and blood vessels' },
  { id: 2, icon: 'face', name: 'Dermatologist', description: 'Skin, hair, and nails' },
  { id: 3, icon: 'visibility', name: 'Ophthalmologist', description: 'Eyes and vision' },
];

const reviews = [
  { 
    id: 1, 
    text: 'Excellent service, very professional!', 
    name: 'Alice Brown', 
    rating: 5, 
    photo: 'https://i.ibb.co/6J0CcbM/user1.jpg' 
  },
  { 
    id: 2, 
    text: 'Highly recommend this clinic.', 
    name: 'Michael Smith', 
    rating: 4.5, 
    photo: 'https://i.ibb.co/F6ZfFMm/user2.jpg' 
  },
  { 
    id: 3, 
    text: 'Caring staff and great facilities.', 
    name: 'Sophia Johnson', 
    rating: 5, 
    photo: 'https://i.ibb.co/x3zBTHY/user3.jpg' 
  },
];

export default function HomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
    scrollX.setValue(event.nativeEvent.contentOffset.x);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Profile and Bell Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.replace('/stack/register'); }}>
          <View style={styles.profileContainer}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>JD</Text>
            </View>
            <Text style={styles.profileName}>John Doe</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellIcon}>
          <MaterialIcons name="notifications" size={30} color="#005a9c" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search My EwaHealthcare..."
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.carouselScrollView}
        >
          {carouselItems.map((item) => (
            <Card key={item.id} style={styles.carouselCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
              <Text style={styles.carouselText}>{item.text}</Text>
            </Card>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {carouselItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: index === activeIndex ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>
      </View>

   {/* Header Section */}
   <View style={{ padding: 20, backgroundColor: "#fff", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>Welcome to Our App</Text>
        <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>Your trusted healthcare partner</Text>
      </View>

      {/* Popular Packages Section */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 10 }}>Popular Packages</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((_, index) => (
            <TouchableOpacity key={index} style={{ marginRight: 15, width: 150 }}>
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                style={{ width: 150, height: 100, borderRadius: 10 }}
              />
              <Text style={{ marginTop: 5, fontWeight: "bold", color: "#333" }}>Package {index + 1}</Text>
              <Text style={{ color: "#777" }}>Details of the package</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Partner Hospitals Section */}
      <View style={{ padding: 20, backgroundColor: "#fff", marginVertical: 10, borderRadius: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 10 }}>Partner Hospitals</Text>
        <Animated.FlatList
          data={partnerHospitals}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={renderHospital}
        />
      </View>

      {/* Services Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/services')}>
          <Text style={styles.exploreLink}>Explore All <MaterialIcons name="arrow-forward" size={16} /></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.serviceContainer}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard} onPress={() => router.replace('/(tabs)/explore')}>
            <Image source={{ uri: service.src }} style={styles.serviceImage} />
            <Text style={styles.serviceText}>{service.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

         {/* New Section: Featured Specialists */}
         <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Specialists</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialistsContainer}>
        {specialists.map((specialist) => (
          <View key={specialist.id} style={styles.specialistCard}>
            <MaterialIcons name={specialist.icon} size={40} color="#005a9c" />
            <Text style={styles.specialistName}>{specialist.name}</Text>
            <Text style={styles.specialistDescription}>{specialist.description}</Text>
            <TouchableOpacity style={styles.specialistButton}>
              <Text style={styles.specialistButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* New Section: Health Tips */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.healthTipsContainer}>
        {healthTips.map((tip) => (
          <View key={tip.id} style={styles.healthTipCard}>
            <MaterialIcons name={tip.icon} size={40} color="#005a9c" />
            <Text style={styles.healthTipText}>{tip.tip}</Text>
          </View>
        ))}
      </ScrollView>

   

      {/* New Section: Reviews */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>What Our Clients Say</Text>
      </View>
      {/* Reviews Section */}
<ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  style={styles.reviewsContainer}
>
  {reviews.map((review) => (
    <View key={review.id} style={styles.reviewCard}>
      <Image source={{ uri: review.photo }} style={styles.reviewPhoto} />
      <Text style={styles.reviewText}>"{review.text}"</Text>
      <Text style={styles.reviewName}>- {review.name}</Text>
      <Text style={styles.reviewRating}>Rating: {review.rating} ⭐</Text>
    </View>
  ))}
</ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    backgroundColor: '#F7F8FA',
    paddingTop: 70,
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#005a9c',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 18,
    color: '#333',
  },
  bellIcon: {
    marginTop: 5,
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 40,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  carouselContainer: {
    marginBottom: 30,
  },
  carouselScrollView: {
    paddingHorizontal: 20,
  },
  carouselCard: {
    width: screenWidth - 40,
    marginRight: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  carouselText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#005a9c',
    margin: 5,
  },
  sectionHeader: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  exploreLink: {
    fontSize: 16,
    color: '#005a9c',
    fontWeight: 'bold',
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  serviceText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  healthTipsContainer: {
    marginBottom: 20,
  },
  healthTipCard: {
    width: 120,
    backgroundColor: '#E8F4FA',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthTipText: {
    marginTop: 10,
    fontSize: 14,
    color: '#005a9c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialistsContainer: {
    marginBottom: 20,
  },
  specialistCard: {
    width: screenWidth * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginRight: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  specialistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  specialistDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  specialistButton: {
    backgroundColor: '#005a9c',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  specialistButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginBottom: 30,
  },
  reviewCard: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  reviewText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  reviewName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  reviewRating: {
    fontSize: 14,
    color: '#005a9c',
    fontWeight: 'bold',
  },
  reviewPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  
});
