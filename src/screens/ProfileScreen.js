import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import Options from "../components/General/Options";
import fonts from "../constants/fonts";
const ProfileScreen = () => {
  const profileData = useSelector((state) => state.Profile);
  const [image, setImage] = useState(
    profileData.imageURL
      ? `${profileData.imageURL}`
      : "https://image.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
  );
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    setImage(
      profileData.imageURL
        ? `${profileData.imageURL}`
        : "https://image.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
    );
  }, [profileData, setImage]);

  return (
    <View style={styles.container} centerContent={true}>
      <ScrollView>
        <View
          style={{
            margin: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 80, height: 80, borderRadius: 15 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.nameStyle}>
              {profileData.username ? profileData.username : "User"}
            </Text>
            {profileData.email && <Text>{profileData.email_id}</Text>}
            {profileData.phone_number.length === 10 && (
              <Text> +91 {profileData.phone_number}</Text>
            )}
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <Options
            title="Account"
            color="#22ae7a"
            iconName="person-outline"
            navigateTo="EditProfile"
          />
          <Options
            title="Payments"
            color="#83ae21"
            iconName="wallet-outline"
            navigateTo="PaymentMethods"
            headerTitle="Manage payment methods"
          />
          <Options
            title="Current Bookings"
            color="#fd6d24"
            iconName="newspaper-outline"
            navigateTo="Bookings"
          />
          <Options
            title="Rewards"
            color="#7051eb"
            iconName="business-outline"
            navigateTo="Address"
          />
          <Options
            title="Help & Support"
            color="#ed3bc5"
            iconName="information-outline"
          />
          <Options
            title="Preferences"
            color="#1756a3"
            iconName="settings-outline"
          />
          <Options
            title="Logout"
            color="#ee3f3e"
            iconName="exit-outline"
            logOut={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bookmarkTitle: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bkg,
    marginTop: 0,
  },
  nameStyle: {
    fontSize: 24,
    fontFamily: fonts.Bold,
  },

  cardsContainer: {
    marginTop: 20,
  },
});

export default ProfileScreen;
