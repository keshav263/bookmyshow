import React, { useState } from "react";
import { View, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const CustomCarousel = () => {
  const carouselItems = [
    {
      imageUrl: "https://i.redd.it/ywa6tqhta1051.jpg",
    },
    {
      imageUrl:
        "https://s.yimg.com/ny/api/res/1.2/KxVA_r63yW2B_uYIaBbi9w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU5Ny4zMzMzMzMzMzMzMzM0/https://s.yimg.com/uu/api/res/1.2/y9Ooas8bwKhxgwL.mh4fow--~B/aD04OTY7dz0xNDQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/digital_spy_281/4a4525624342ea35664f088b5c881869",
    },
    {
      imageUrl:
        "http://posterposse.com/wp-content/uploads/2017/06/wonder-woman-banner.jpeg",
    },
    {
      imageUrl:
        "https://i.pinimg.com/736x/67/0d/06/670d0601fea8a5616e9722992a227cfc.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          // borderRadius: 30,
          height: 200,
          overflow: "hidden",
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: item.imageUrl }}
          style={{ height: 250, width: "100%", overflow: "hidden" }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: "center",
        height: 250,
      }}
    >
      <Carousel
        layout={"default"}
        layoutCardOffset={8}
        ref={(ref) => (carousel = ref)}
        data={carouselItems}
        sliderWidth={450}
        itemWidth={350}
        autoplay={true}
        loop={true}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {/* <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          width: "100%",
          position: "absolute",
          bottom: -20,
        }}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 3.5,
          marginHorizontal: 3,
          backgroundColor: Colors.primary,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
    </View>
  );
};

export default CustomCarousel;
