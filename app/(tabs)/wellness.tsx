import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // You can replace with another icon library if needed.

const WellnessTab: React.FC = () => {
  const handleOfferClick = (offer: string) => {
    Alert.alert("Offer Selected", `You selected: ${offer}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../../assets/images/wellness.png')}
          style={styles.bannerImage}
        />
      </View>

      {/* Title and Description Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Ewa's Health Care</Text>
        <Text style={styles.subtitle}>EWA’S WELLNESS CARD</Text>
        <Text style={styles.subtitleDetail}>Get access to top-quality health services</Text>
      </View>

      {/* Benefits Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          <Icon name="check-circle" size={20} color="#16A085" /> Card Benefits
        </Text>
        <View style={styles.cardList}>
          <View style={styles.benefitCard}>
            <Icon name="heartbeat" size={50} color="#16A085" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Unlimited Testing</Text>
            <Text style={styles.cardDescription}>Regular Monitoring & Diagnostic Tests</Text>
          </View>
          <View style={styles.benefitCard}>
            <Icon name="percent" size={50} color="#16A085" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Exclusive Discounts</Text>
            <Text style={styles.cardDescription}>Up to 20% off on tests and services</Text>
          </View>
          <View style={styles.benefitCard}>
            <Icon name="home" size={50} color="#16A085" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Home Blood Collection</Text>
            <Text style={styles.cardDescription}>Free home collection for samples</Text>
          </View>
        </View>
      </View>

      {/* Exclusive Offers Section */}
     <View style={[styles.sectionContainer, { backgroundColor: 'rgba(7, 144, 148, 0.1)' }]}>
       <Text style={[styles.sectionTitle, { color: '#02989D' }]}>
         <Icon name="gift" size={20} color="#02989D" /> Exclusive 110 Test List
       </Text>
       <View style={styles.offerList}>
         <TouchableOpacity
           style={[styles.offerCard, { backgroundColor: '#fff', borderColor: '#02989D', borderWidth: 1 }]}
           onPress={() => handleOfferClick('Hematology')}
         >
           <Text style={[styles.offerText, { color: '#333' }]}>
             Hematology - Complete Blood Count, ESR, Platelet Count
           </Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.offerCard, { backgroundColor: '#fff', borderColor: '#02989D', borderWidth: 1 }]}
           onPress={() => handleOfferClick('Bio-Chemistry')}
         >
           <Text style={[styles.offerText, { color: '#333' }]}>
             Bio-Chemistry - Diabetic Tests, Lipid Profile, Renal Function Test
           </Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.offerCard, { backgroundColor: '#fff', borderColor: '#02989D', borderWidth: 1 }]}
           onPress={() => handleOfferClick('Vitamin Profile')}
         >
           <Text style={[styles.offerText, { color: '#333' }]}>
             Vitamin Profile - Vitamin D3, B12, Calcium
           </Text>
         </TouchableOpacity>
       </View>
     </View>


      {/* Services Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          <Icon name="stethoscope" size={20} color="#02989D" /> Our Services
        </Text>
        <View style={styles.serviceGrid}>
          <View style={styles.serviceCard}>
            <Icon name="heart" size={60} color="#02989D" style={styles.serviceIcon} />
            <Text style={[styles.serviceTitle, { color: "#02989D" }]}>Ultrasound Scanning</Text>
          </View>
          <View style={styles.serviceCard}>
            <Icon name="scan" size={60} color="#02989D" style={styles.serviceIcon} />
            <Text style={[styles.serviceTitle, { color: "#02989D" }]}>Digital X-Ray</Text>
          </View>
          <View style={styles.serviceCard}>
            <Icon name="heartbeat" size={60} color="#02989D" style={styles.serviceIcon} />
            <Text style={[styles.serviceTitle, { color: "#02989D" }]}>2D ECHO & ECG</Text>
          </View>
        </View>
      </View>

      {/* Call-to-Action Section */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Get Your Wellness Card Now</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
   
    paddingTop:10,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 20,
    color: '#16A085',
    marginTop: 10,
  },
  subtitleDetail: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  cardList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  benefitCard: {
    backgroundColor: '#F7F9F9',
    width: '30%',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  offerList: {
    marginBottom: 20,
  },
  offerCard: {
    backgroundColor: '#FDEBD0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  offerText: {
    fontSize: 16,
    color: '#D35400',
    textAlign: 'center',
  },
  serviceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: '#F4F6F7',
    width: '30%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7D3C98',
  },
  ctaContainer: {
    alignItems: 'center',
    marginTop: 30,

  },
  ctaButton: {
    backgroundColor: '#16A085',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 100,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WellnessTab;