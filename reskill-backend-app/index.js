const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/posts", async (req, res) => {
  try {
    const [postsResponse, photosResponse] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/photos"),
    ]);

    const posts = postsResponse.data;
    const photos = photosResponse.data;

    const photosByAlbum = photos.reduce((acc, photo) => {
      if (!acc[photo.albumId]) {
        acc[photo.albumId] = [];
      }
      acc[photo.albumId].push(photo);
      return acc;
    }, {});

    const mergedData = posts.map((post) => {
      const albumPhotos = photosByAlbum[post.userId] || [];
      return {
        ...post,
        photos: albumPhotos.map((photo) => ({
          id: photo.id,
          url: photo.url,
          thumbnailUrl: photo.thumbnailUrl,
        })),
      };
    });

    const limitedMergedData = mergedData.slice(0, 9);
    const homeData = {
      subheading: `Subheading that sets up context,
                    shares more info about the author,
                    or generally gets people psyched to keep reading`,
      firstBody: `Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:\n
                      Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.\n
                      Exquisite sophisticated iconic cutting-edge laborum deserunt Addis Ababa esse bureaux cupidatat id minim. Sharp classic the best commodo nostrud delightful. Conversation aute Rochester id. Qui sunt remarkable deserunt intricate airport handsome K-pop excepteur classic esse Asia-Pacific laboris.
                      `,
      secondBody: `Excepteur efficient emerging, minim veniam anim cloying aute carefully curated gauche. Espresso exquisite perfect nostrud nisi intricate. Punctual adipisicing Borzoi, essential lovely tempor eiusmod irure. Exclusive izakaya charming Quezon City impeccable aute quality of life soft power pariatur occaecat discerning. Qui wardrobe aliquip, et Amadeus rock opera.\n
                      Exquisite sophisticated iconic cutting-edge laborum deserunt esse bureaux cupidatat id minim. Sharp classic the best commodo nostrud delightful. Conversation aute wifey id. Qui sunt remarkable deserunt intricate airport excepteur classic esse riot girl.
                      `,
      photos: [
        { id: 0, url: "https://via.placeholder.com/600/363789" },
        { id: 2, url: "https://via.placeholder.com/600/7375af" },
        { id: 3, url: "https://via.placeholder.com/600/363789" },
      ],
    };
    const finalData = {
      mainData: homeData,
      relatedData: limitedMergedData,
    };
    res.json(finalData);
  } catch (error) {
    console.error("Backend Error fetching data:", error.message);
    res.status(500).json({ message: "Backend Error fetching data" });
  }
});

app.get("/post/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const postResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post = postResponse.data;

    const photosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos`
    );
    const allPhotos = photosResponse.data;

    const userPhotos = allPhotos.filter(
      (photo) => photo.albumId === post.userId
    );

    const combinedData = {
      ...post,
      photos: userPhotos.map((photo) => ({
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
      })),
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Backend Error fetching post or photos:", error.message);
    res.status(500).json({ message: "Backend Error fetching post or photos" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
