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
        <TouchableOpacity onPress={() => { router.replace('/stack/profile'); }}>
          <View style={styles.profileContainer}>
            <View style={[styles.profileCircle, { backgroundColor: '#02989D' }]}>
              <Text style={styles.profileText}>EH</Text>
            </View>
            <Text style={styles.profileName}>Ewa HealthCare</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellIcon}>
          <MaterialIcons name="notifications" size={30} color="#02989D" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}


<View style={{ padding: 10 }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#02989D',
          backgroundColor: 'rgba(7, 144, 148, 0.06)',
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
          color: '#000',
        }}
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
               {
                 width: 20, // Rectangular width
                 height: 7, // Rectangular height
                 borderRadius: 5, // Rounded corners
                 backgroundColor: '#02989D', // Dot color
                 marginHorizontal: 5,
                 opacity: index === activeIndex ? 1 : 0.3, // Active state opacity
               },
             ]}
           />
         ))}
       </View>
     </View>


   {/* Header Section */}
   <View
         style={{
           padding: 20,
           backgroundColor: '#fff',
           borderBottomLeftRadius: 20,
           borderBottomRightRadius: 20,
           flex: 1, // Ensures the container takes up the full available space
           justifyContent: 'center', // Centers the content vertically
           alignItems: 'center', // Centers the content horizontally
         }}
       >
         <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#02989D' }}>
           Welcome to EwaHealthcare
         </Text>
         <Text
           style={{
             fontSize: 16,
             color: 'rgba(7, 144, 148, 0.8)',
             marginTop: 5,
             textAlign: 'center', // Ensures both texts are centered
           }}
         >
           Your trusted healthcare partner
         </Text>
       </View>


{/* Services Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/services')}>
          <Text style={[styles.exploreLink, { color: '#02989D' }]}>
            Explore All <MaterialIcons name="arrow-forward" size={16} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.serviceContainer}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard} onPress={() => router.replace('/(tabs)/services')}>
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
            <MaterialIcons name={specialist.icon} size={40} color="#02989D" />
            <Text style={styles.specialistName}>{specialist.name}</Text>
            <Text style={styles.specialistDescription}>{specialist.description}</Text>
            <TouchableOpacity
                                onPress={() => Linking.openURL('https://wa.me/+919686638384')}
                                style={{
                                  backgroundColor: '#02989D',
                                  paddingVertical: 8,
                                  paddingHorizontal: 20,
                                  borderRadius: 20,
                                  alignSelf: 'center',
                                  height: 35,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingTop: 10, // Added top padding for button
                                  paddingBottom: 10, // Added bottom padding for button
                                }}
                              >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Book Now</Text>
                              </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

 {/* Popular Packages Section */}
      <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10}}>
              Popular Packages
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                'Full Body Checkup',
                'Blood Sugar',
                'Platelet Count',
                'VitaminD, 25-Hydroxy',
                'Urine Culture',
                'Kidney Function Test',
                'Vitamin B',
                'Liver Function Test',
                'Lipid Profile',
                'Post Prandial Blood Sugar',
                'Urine Complete Analysis',
                'Thyroid Function Test',
                'Fasting Blood Sugar',
                'Dengue Profile',
                'Glycosylated Haemoglobin',
                'Complete Blood Count',
              ].map((packageName, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginRight: 15,
                    width: 150,
                    height: 100, // Square card
                    alignItems: 'center',
                    justifyContent: 'space-between', // To align the text and button properly
                    borderWidth: 1,
                    borderColor: '#02989D',
                    borderRadius: 10,
                    position: 'relative', // Ensures the "Book Now" button stays at the bottom
                    paddingTop: 10, // Added top padding
                    paddingBottom: 10, // Added bottom padding
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                      fontSize: 16,
                      lineHeight: 22, // Helps with readability
                      height: 40, // Limit text height to ensure proper layout
                      overflow: 'hidden', // Prevents overflow if the text is too long
                      paddingTop: 10, // Added top padding for text
                      paddingBottom: 10, // Added bottom padding for text
                    }}
                    numberOfLines={3} // Limits package name to 3 lines
                  >
                    {packageName}
                  </Text>

                  <TouchableOpacity
                    onPress={() => Linking.openURL('https://wa.me/+919686638384')}
                    style={{
                      backgroundColor: '#02989D',
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 20,
                      alignSelf: 'center',
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: 10, // Added top padding for button
                      paddingBottom: 10, // Added bottom padding for button
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Book Now</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );

      <View style={{ padding: 20, backgroundColor: "#fff", marginVertical: 10, borderRadius: 10 }}>
             <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 10 }}>
               Partner Hospitals
             </Text>
             <Animated.FlatList
               data={[
                     { id: '1', image: require('../../assets/images/1.png') },
                     { id: '2', image: require('../../assets/images/2.png') },
                     { id: '3', image: require('../../assets/images/3.png') },
                     { id: '4', image: require('../../assets/images/4.png') },
                     { id: '5', image: require('../../assets/images/5.png') },
                     { id: '6', image: require('../../assets/images/6.png') },
                     { id: '7', image: require('../../assets/images/7.png') },
                     { id: '8', image: require('../../assets/images/8.png') },
                     { id: '9', image: require('../../assets/images/9.png') },
                     { id: '10', image: require('../../assets/images/10.png') },
                     { id: '11', image: require('../../assets/images/11.png') },
                     { id: '12', image: require('../../assets/images/12.png') },
                     { id: '13', image: require('../../assets/images/13.png') },
                   ]}
               keyExtractor={(item) => item.id}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               onScroll={Animated.event(
                 [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                 { useNativeDriver: false }
               )}
               renderItem={({ item }) => (
                 <View style={{ justifyContent: "center", alignItems: "center" }}>
                   <Image
                     source={ item.image }
                     style={{ height: 100, width: 310,borderRadius: 15 }}
                   />
                 </View>
               )}
             />
           </View>


      {/* New Section: Health Tips */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.healthTipsContainer}>
        {healthTips.map((tip) => (
          <View key={tip.id} style={styles.healthTipCard}>
            <MaterialIcons name={tip.icon} size={40} color="#02989D" />
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