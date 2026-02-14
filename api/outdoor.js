const express = require("express");
const axios = require("axios");
const { MongoClient } = require("mongodb");

const outdoorRouter = express.Router();

outdoorRouter.use(express.json());

outdoorRouter.use((req, res, next) => {
    next();
});

const { GoogleGenerativeAI } = require("@google/generative-ai");
const generation_config = { temperature: 0 };
const safety_settings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_NONE",
  },
];

// nikul
outdoorRouter.post("/get", async (req, res) => {

      const option = (req.body.option)
      
      const [lat, lng] = [42.73, -73.676728];
      let categoryIds = ""; // Initialize categoryIds string
    
      // Check the provided option and set categoryIds accordingly
      if (option === "ATTRACTIONS") {

        setTimeout(()=> {
            res.json([
              {
                fsq_id: '5b59fa47037be1002bc2e108',
                name: 'Capital Region Welcome Center',
                categories: [ 'Monument' ],
                address: '500 Kings Rd, Hannacroix, NY 12087',
                latitude: 42.431204,
                longitude: -73.802731,
                image: 'https://fastly.4sqi.net/img/general/original/6386_bg_jOFQxW61HJdAQhGWqLtBIJpilFtcIkK2OtkLrfQA.jpg'
              },
              {
                ai: 'The Capital Region Welcome Center is a place to visit to learn more about the history and culture of the area.'
              },
              {
                fsq_id: '4e4d0098bd413c4cc66de6d3',
                name: 'Century House',
                categories: [ 'Hotel', 'Monument', 'Dining and Drinking' ],
                address: '997 New Loudon Road, Latham, NY 12110',
                latitude: 42.771045,
                longitude: -73.753005,
                image: 'https://fastly.4sqi.net/img/general/original/20563465_bSvt7r-pZuovRmcb9r29xLkonhI53LQI7CkNrdPF_Ic.jpg'
              },
              {
                ai: 'Century House is a must-see destination for travelers seeking a unique blend of history, dining, and hospitality in a stunning setting.'
              }
            ]);
        },[2000])
        return
        categoryIds = "10000%2C10002%2C10027%2C16020%2C16026%2C16032%2C10056";
      } else if (option === "TOURS") {
        setTimeout(() => {
          res.send([
            {
              fsq_id: '70c99dd656414e1a8686223d',
              name: 'Erie-Champlain Canal Boating',
              categories: [ 'Tour Provider' ],
              address: '50 South St, Waterford, NY 12188',
              latitude: 42.788328,
              longitude: -73.680251,
              image: 'https://eriecanalway.org/application/files/8515/2537/8915/Macedon_PacketboatCorral_KeithBoas_569.jpg'
            },
            {
              ai: 'People should visit Erie-Champlain Canal Boating for a unique tour experience that allows them to explore the history and natural beauty of the region.'
            },
            {
              fsq_id: '5294a20a11d292cae29b9df5',
              name: 'Capital Bus Tour',
              categories: [ 'Tour Provider' ],
              address: '217 Central Ave, Albany, NY 12206',
              latitude: 42.662595,
              longitude: -73.769473,
              image: 'https://www.redfin.com/blog/wp-content/uploads/2023/07/Albany-NY-skyline.jpg'
            },
            { ai: 'Take a Capital Bus Tour for a guided tour of Albany, NY.' },
            {
              fsq_id: 'c8bcd34a770e4ad8b8c862c1',
              name: 'Upstate Charters',
              categories: [ 'Tour Provider' ],
              address: '133 Boght Rd, Watervliet, NY 12189',
              latitude: 42.745483,
              longitude: -73.714875,
              image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_334,q_75,w_579/v1/crm/newyorkstate/boat6_26019ad4-a862-2945-d975c189ddbb4fab.jpg'
            },
            {
              ai: 'Visit Upstate Charters for a guided tour of the breathtaking sights and sounds of the area.'
            }
          ])
        },[2000])
        return
        categoryIds = "19029";
      } else if (option === "OUTDOOR ACTIVITIES") {
        setTimeout(()=> {
            res.json([
              {
              fsq_id: '4de28d81922eba8a252084ee',
              name: 'Huyck Preserve',
              categories: [ 'Nature Preserve' ],
              address: '5052 Delaware Tpke, Rensselaerville, NY 12147',
              latitude: 42.515299,
              longitude: -74.140035,
              image: 'https://fastly.4sqi.net/img/general/original/94806813__hPjxYb19Xgo2YEVgtWrBbZDqyAlrg9hv3rCBM_a9l8.jpg'
            },
            {
              ai: "Visit Huyck Preserve for a tranquil escape amidst nature's beauty."
            },
            {
              fsq_id: 'f92017eb4bed4556df6a20f2',
              name: 'Monument Mountain',
              categories: [ 'Hiking Trail' ],
              address: '553 Stockbridge Rd, Great Barrington, MA 01230',
              latitude: 42.195929,
              longitude: -73.36175,
              image: 'https://thetrustees.org/wp-content/uploads/2020/07/Monument-Mountain.jpg'
            },
            {
              ai: 'Visit Monument Mountain in Great Barrington for an immersive hiking experience amidst breathtaking natural beauty.'
            },
            {
              fsq_id: '4d93475bf10ea093de68251e',
              name: 'Saratoga National Historical Park',
              categories: [ 'National Park' ],
              address: '648 Route 32, Stillwater, NY 12170',
              latitude: 42.99535678454208,
              longitude: -73.63122940063477,
              image: 'https://fastly.4sqi.net/img/general/original/376887_NwZ0NfnJvfikYCGeRv3RkmMsdqDfI8qhslTQWFwiWI4.jpg'
            },
            {
              ai: 'Saratoga National Historical Park is a must-see for history buffs and nature lovers alike, offering a glimpse into a pivotal battle of the American Revolution amidst stunning scenery.'
            },
            {
              fsq_id: '4e2ec98bfa7614797ddc4d2d',
              name: 'Victory Woods Trails',
              categories: [ 'Hiking Trail' ],
              address: '19 Schuyler Hts (off Burgoyne St.), Schuylerville, NY 12871',
              latitude: 43.098703237059055,
              longitude: -73.59385013580322,
              image: 'https://fastly.4sqi.net/img/general/original/10638803_UfR0ridWRx2ZGJpKZfivSlln-HcG16Ry54ztC-XYNhQ.jpg'
            },
            {
              ai: 'Victory Woods Trails is a great place to visit for anyone looking to enjoy the outdoors with a hike.'
            }
          ]);
        },[2000])
        return
        categoryIds = "18001%2C16028%2C16034%2C16035%2C16019";
      } else if (option === "CONCERT & SHOWS") {

        setTimeout(() => {
          res.json([
            {
              fsq_id: '4b32b997f964a520a31225e3',
              name: 'Proctors Theatre',
              categories: [ 'Music Venue', 'Theater' ],
              address: '432 State St (Broadway), Schenectady, NY 12305',
              latitude: 42.811893,
              longitude: -73.942007,
              image: 'https://fastly.4sqi.net/img/general/original/23518228_T6_B4fweIyR04KI9tpddypeKq4APrxwmVr30pUf-jeI.jpg'
            },
            {
              ai: 'Proctors Theatre is a unique destination for entertainment enthusiasts, where they can experience live music and theater performances in a captivating and historic setting.'
            },
            {
              fsq_id: '4a887033f964a520710620e3',
              name: 'Saratoga Performing Arts Center',
              categories: [ 'Concert Hall', 'Music Venue' ],
              address: '108 Avenue of the Pnes, Saratoga Springs, NY 12866',
              latitude: 43.055269,
              longitude: -73.805877,
              image: 'https://fastly.4sqi.net/img/general/original/29791134_WsnyxiHsJoGAbUcbPJe6qK1HSHmw8Us3rw4V0jrYHTA.jpg'
            },
            {
              ai: 'Saratoga Performing Arts Center offers both concert and music venue options for visitors to enjoy.'
            },
            {
              fsq_id: '4b8318c7f964a52075f730e3',
              name: 'Palace Theatre',
              categories: [ 'Music Venue', 'Theater' ],
              address: '19 Clinton Ave (at N Pearl St.), Albany, NY 12207',
              latitude: 42.654942,
              longitude: -73.750234,
              image: 'https://fastly.4sqi.net/img/general/original/13268063_1KTzWZ-806YhMmtRQ0_bSab37tggINQTimT2XH-DCrI.jpg'
            },
            {
              ai: 'The Palace Theatre is a great place to visit for a night of entertainment, offering both music and theater performances.'
            }
          ])
        },[2000])
        return
        categoryIds = "10039%2C10043%2C10042%2C10037";
      } else if (option === "FOOD & DRINK") {
        setTimeout(() => {
          res.json([
            {
              fsq_id: '4b9d42d6f964a520ff9d36e3',
              name: 'Bella-Napoli Italian Bakery',
              categories: [ 'Bakery', 'Deli', 'Italian Restaurant' ],
              address: '672 New Loudon Rd (Watervliet Shaker Rd), Latham, NY 12110',
              latitude: 42.737117,
              longitude: -73.762758,
              image: 'https://fastly.4sqi.net/img/general/original/4271296_Q-4C0H2FZFV6gZE1O9RAMJjVcXHEqksVXfALRcZ043I.jpg'
            },
            {
              ai: 'Bella-Napoli Italian Bakery is a fantastic place to visit for a delectable Italian dining experience, bakery, and deli treats.'
            },
            {
              fsq_id: '4c0d166e2466a59305017721',
              name: "Gershon's Deli & Caterers",
              categories: [ 'Deli', 'Sandwich Spot' ],
              address: '1600 Union St (at Lakewood Ave), Schenectady, NY 12309',
              latitude: 42.804949,
              longitude: -73.90604,
              image: 'https://fastly.4sqi.net/img/general/original/1513792_gR7WvwQ79giME0iCxnoYOeqOCbNtwF-LyNbQufAXZMw.jpg'
            },
            {
              ai: "Gershon's Deli & Caterers is a great place to visit for a delicious and satisfying deli or sandwich meal."
            },
            {
              fsq_id: '4b75bc59f964a520cf202ee3',
              name: 'Villa Italia',
              categories: [ 'Bakery', 'Ice Cream Parlor', 'Italian Restaurant' ],
              address: '226 Broadway, Schenectady, NY 12305',
              latitude: 42.811678,
              longitude: -73.943962,
              image: 'https://fastly.4sqi.net/img/general/original/85554789_xc1kxmlJNqyeMSFV7vvRXqXO4N3bYFgFDrvLCN5ztuA.jpg'
            },
            {
              ai: 'Villa Italia is a must-visit for those seeking a delectable culinary experience in Schenectady, offering a tantalizing array of baked goods, icy treats, and authentic Italian dishes.'
            }
          ])
        }, [2000])
        return
        categoryIds = "13000";
      } else if (option === "SHOPPING") {

        setTimeout(()=> {
          res.json([
            {
              fsq_id: '4d13ce4fbb488cfaae1491d4',
              name: 'Michaels',
              categories: [ 'Arts and Crafts Store' ],
              address: '555 Hubbard Ave, Pittsfield, MA 01201',
              latitude: 42.466293,
              longitude: -73.195812,
              image: 'https://fastly.4sqi.net/img/general/original/31982571_9JhgY_d0UztuVQ3sOSgiOTfCe2lHy_pYEQJTkLQBOVo.jpg'
            },
            {
              ai: 'Michaels is an Arts and Crafts store that is worth visiting for anyone looking to engage in creative activities.'
            },
            {
              fsq_id: '5fb74dcd5d48371a7ebae206',
              name: 'Stress Straws',
              categories: [ 'Jewelry Store' ],
              address: '14 Sanders Ave, Scotia, NY 12302',
              latitude: 42.822683,
              longitude: -73.961243,
              image: 'https://fastly.4sqi.net/img/general/original/1360205582_alugu-ix1tPSG3mCdipQQiEemM0VW8lvyjVXOwV6z_Y.jpg'
            },
            {
              ai: 'Stress Straws is a jewelry store that offers a unique and creative experience for those looking to express their individuality through their style.'
            }
          ]);
      },[2000])
        return
        categoryIds = "17114%2C17115%2C17039%2C17003";
      }
    
      let json = [];
    
      const searchOptions = {
        method: 'GET',
        url: `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=50000&categories=${categoryIds}&sort=rating&limit=4`,
        headers: {
          accept: 'application/json',
          Authorization: process.env.NIKUL_FOURSQUARE
        }
      };
    
      const parsePlaces = (places) => {
        return places.map(place => ({
          fsq_id: place.fsq_id,
          name: place.name,
          categories: place.categories.map(cat => cat.name),
          address: place.location.formatted_address,
          latitude: place.geocodes.main.latitude,
          longitude: place.geocodes.main.longitude
        }));
      };
    
      try {
        let response = await axios.request(searchOptions);
        let places = parsePlaces(response.data.results);
    
        // Adding images to each place
        for (let i = 0; i < places.length; i++) {
          let place = places[i];
          const imageOptions = {
            method: 'GET',
            url: `https://api.foursquare.com/v3/places/${place.fsq_id}/photos?limit=1&sort=POPULAR`,
            headers: {
              accept: 'application/json',
              Authorization: process.env.NIKUL_FOURSQUARE
            }
          };
    
          try {
            let imageResponse = await axios.request(imageOptions);
            let images = imageResponse.data;
                  if (Array.isArray(images) && images.length > 0) {
              place.image = `${images[0].prefix}original${images[0].suffix}`;
            } else {
              place.image = 'No image available';
            }
          } catch (error) {
            console.error(error);
            place.image = 'Failed to fetch image';
          }
        }
    
        const placess = [places[0], places[1], places[2]];
    
    for (const place of placess) {
      json.push(place);
    
      try {
          let prompt = `Here is a detail about the place: ${JSON.stringify(place)}. In one sentence, tell why someone should visit it. Don't be very specific.`;
          
          // Assuming GoogleGenerativeAI is set up correctly and can make API calls
          const genAI = new GoogleGenerativeAI(process.env.NIKUL_GEMINI); // Initialize with necessary credentials or config
          const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            generation_config: generation_config,
            safety_settings: safety_settings,
          });
          const result = await model.generateContent(prompt);
          const text = result.response.text(); 
          json.push({ ai: text });
        } catch (error) {
          console.error(error);
        }
      }
      } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch data");
      }
      res.json(json);
});
    
// nikul
outdoorRouter.post("/addPlaces", (req,res) => {
    const uri = process.env.NIKUL_MONGO
    const client = new MongoClient(uri);
    const database = client.db('bored');
    const collection = database.collection('LikedPlaces');

    collection.insertOne({
    title : req.body._title,
    location : req.body._location,
    image : req.body._image
    })
    res.status(200).send("good");
})
    
// nikul
outdoorRouter.get("/getPlaces", async (req,res) => {
    const uri = process.env.NIKUL_MONGO
    const client = new MongoClient(uri);
    const database = client.db('bored');
    const collection = database.collection('LikedPlaces');
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
})

// nikul
outdoorRouter.get("/createPlan", async (req, res) => {

  res.json({
    "Saratoga National Historical Park": [
    {
    "_id": "66226a18c1320f834fc25d21",
    "title": "Saratoga National Historical Park",
    "location": "648 Route 32, Stillwater, NY 12170",
    "image": "https://fastly.4sqi.net/img/general/original/376887_NwZ0NfnJvfikYCGeRv3RkmMsdqDfI8qhslTQWFwiWI4.jpg",
    "reason": "The allure of immersing myself in the pivotal events of American history at the hallowed grounds of Saratoga invites me to embark on this adventure."
    }
    ],
    "Villa Italia": [
    {
    "_id": "66226a40c1320f834fc25d23",
    "title": "Villa Italia",
    "location": "226 Broadway, Schenectady, NY 12305",
    "image": "https://fastly.4sqi.net/img/general/original/85554789_xc1kxmlJNqyeMSFV7vvRXqXO4N3bYFgFDrvLCN5ztuA.jpg",
    "reason": "To experience the vibrant flavors and convivial ambiance of authentic Italian cuisine, the journey culminates at Villa Italia, a culinary haven promising a delectable feast."
    }
    ]
    });
    return

  try {
    const uri = process.env.NIKUL_MONGO;
    const client = new MongoClient(uri);
    const database = client.db('bored');
    const collection = database.collection('LikedPlaces');
    let data = await collection.find({}).toArray();

    let formattedLocations = "";

    data.forEach(location => {
      formattedLocations += `
          Title: ${location.title}
          Location: ${location.location}
          \t`;
    });

    let prompt = `Imagine yourself basking in the warmth of the sun, ready to embark on an unforgettable journey to your favorite destinations. Begin by selecting two top places from the list below and explain why they're beckoning you right now:

    ${formattedLocations}

    For your first choice, envision the excitement of starting your adventure at this place, where you can [mention an activity or attraction]. Then, after exploring the wonders of your first destination, describe the allure of journeying to the next place and why it's the perfect continuation of your adventure in JUST 1 SENTENCE. ONLY 1 SENTENCE.

    Share your responses in JSON format, listing your top choices along with compelling reasons for each, like this: MAKE SURE IT IS IN A JSON FORMAT:
    {
      "topChoices": [
        {"place": "Place1", "reason": "Reason for choosing Place1"},
        {"place": "Place2", "reason": "Reason for choosing Place2"}
      ]
    }`;

    // Assuming GoogleGenerativeAI is set up correctly and can make API calls
    const genAI = new GoogleGenerativeAI(process.env.NIKUL_GEMINI);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generation_config: generation_config,
      safety_settings: safety_settings,
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    data = JSON.parse(text);

    const dataToPrint = {};

    async function fetchAndPrintPlaces() {
      for (const choice of data.topChoices) {
        const result = database.collection('LikedPlaces').find({ title: choice.place });
        const documents = await result.toArray();
        const updatedDocuments = documents.map(doc => ({ ...doc, reason: choice.reason }));
        dataToPrint[choice.place] = updatedDocuments;
      }
      return dataToPrint;
    }

    const response = await fetchAndPrintPlaces();
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
    outdoorRouter,
};