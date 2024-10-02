export const dummyChats = [
  {
    role: 'user',
    parts: [{text: 'hii'}],
  },
  {
    role: 'model',
    parts: [{text: 'Hello! 👋 How can I help you today!'}],
  },
  {
    role: 'user',
    parts: [
      {
        inlineData: {
          data: 'https://i.ibb.co/SQLB39N/car.jpg',
          // data: 'https://i.ibb.co/ZcB1twf/minimalist-and-inviting-gaming-setup-1-1024x683.jpg',
          mimeType: 'image/jpeg',
        },
      },
      {text: 'color and what is the name of the companys?'},
    ],
  },

  {
    role: 'model',
    parts: [
      {
        text: {
          product_guess: '',
          isRelevent: true,
          isVisible: true,
          ingredients: [
            {
              ingredient: '',
              description: '',
              good_bad_neutral: '',
              advice: '',
            },
            {
              ingredient: '',
              description: '',
              good_bad_neutral: '',
              advice: '',
            },
            {
              ingredient: '',
              description: '',
              good_bad_neutral: '',
              advice: '',
            },
          ],
          summary: '',
        },
      },
    ],
  },
  {
    role: 'user',
    parts: [
      {
        inlineData: {
          // data: 'https://i.ibb.co/SQLB39N/car.jpg',
          data: 'https://i.ibb.co/ZcB1twf/minimalist-and-inviting-gaming-setup-1-1024x683.jpg',
          mimeType: 'image/jpeg',
        },
      },
      {text: 'color and what is the name of the companys?'},
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: {
          product_guess: '',
          isRelevent: true,
          isVisible: true,
          ingredients: [
            {
              ingredient: '',
              description: '',
              good_bad_neutral: '',
              advice: '',
            },
            {
              ingredient: '',
              description: '',
              good_bad_neutral: '',
              advice: '',
            },
            {
              ingredient: '',
              description: '',
              good_bad_neutral: '',
              advice: '',
            },
          ],
          summary: '',
        },
      },
    ],
  },
];

export const dummyJsonFoodData = {
  ingredients_table: [
    {
      ingredient: 'Sugar',
      description:
        'Provides sweetness but can contribute to added sugars in the diet.',
      impact: 'Harmful',
      advice:
        'Look for products with less added sugar or choose natural sweeteners like stevia or honey in moderation.',
    },
    {
      ingredient: 'Nonfat Milk',
      description:
        'A good source of calcium and protein, but may contain lactose which some people are intolerant to.',
      impact: 'Neutral',
      advice:
        'If you are lactose intolerant, look for lactose-free milk alternatives like almond milk or soy milk.',
    },
    {
      ingredient: 'Whey',
      description:
        'A milk protein that is a good source of amino acids, but some people may be allergic to it.',
      impact: 'Neutral',
      advice:
        'If you have a whey allergy, choose products that use alternative protein sources like soy protein or pea protein.',
    },
    {
      ingredient: 'Partially Hydrogenated Soybean Oil',
      description:
        'A type of oil that is solid at room temperature. It contains trans fats, which are harmful to your health.',
      impact: 'Harmful',
      advice:
        'Look for products that use healthier oils like olive oil, avocado oil, or coconut oil.',
    },
    {
      ingredient: 'Cornstarch',
      description:
        'A common thickener and stabilizer. It is a good source of carbohydrates but can contribute to added sugars.',
      impact: 'Neutral',
      advice:
        'Choose products with less added cornstarch or opt for natural thickeners like arrowroot powder or tapioca starch.',
    },
    {
      ingredient: 'Cocoa Processed with Alkali',
      description:
        'A type of cocoa powder that has been treated with alkali to reduce its acidity. It has a less intense flavor and may have less antioxidants.',
      impact: 'Neutral',
      advice:
        'Choose products with natural cocoa powder if you prefer a more intense chocolate flavor and higher antioxidant content.',
    },
    {
      ingredient: 'Marshmallows',
      description:
        'Made from sugar, gelatin, and corn syrup. They are high in sugar and calories and should be consumed in moderation.',
      impact: 'Harmful',
      advice:
        'Enjoy marshmallows occasionally as a treat. Look for products with reduced sugar content or opt for homemade marshmallows made with natural sweeteners.',
    },
    {
      ingredient: 'Modified Corn Starch',
      description:
        'A type of cornstarch that has been chemically modified to improve its properties. It is safe for consumption but can contribute to added sugars.',
      impact: 'Neutral',
      advice:
        'Choose products with less added modified cornstarch or opt for natural thickeners like arrowroot powder or tapioca starch.',
    },
    {
      ingredient: 'Sodium Hexametaphosphate',
      description:
        'A food additive that is used to prevent discoloration and improve texture. It is generally considered safe for consumption.',
      impact: 'Neutral',
      advice: 'None.',
    },
    {
      ingredient: 'Corn Syrup Solids',
      description:
        'A type of sugar that is derived from corn. It is high in fructose and should be consumed in moderation.',
      impact: 'Harmful',
      advice:
        'Choose products with less added corn syrup solids or opt for natural sweeteners like stevia or honey in moderation.',
    },
    {
      ingredient: 'Artificial Flavors',
      description:
        'Chemicals that are added to food to enhance or mimic natural flavors. They can be controversial, as some may be linked to health concerns.',
      impact: 'Neutral',
      advice:
        'Choose products with natural flavors or avoid them altogether if you are concerned about their potential effects.',
    },
    {
      ingredient: 'Blue 1',
      description:
        'A synthetic food coloring that is often used to give food a blue hue. It has been linked to some health concerns.',
      impact: 'Harmful',
      advice:
        'Choose products with natural food colorings or avoid them altogether if you are concerned about their potential effects.',
    },
    {
      ingredient: 'Corn Syrup',
      description:
        'A type of sugar that is derived from corn. It is high in fructose and should be consumed in moderation.',
      impact: 'Harmful',
      advice:
        'Choose products with less added corn syrup or opt for natural sweeteners like stevia or honey in moderation.',
    },
    {
      ingredient: 'Natural and Artificial Flavors',
      description:
        'A combination of natural and artificial flavors. This can be a confusing ingredient as it can be difficult to know the exact composition of the flavors.',
      impact: 'Neutral',
      advice:
        'Choose products with natural flavors or avoid them altogether if you are concerned about their potential effects.',
    },
    {
      ingredient: 'Sodium Caseinate',
      description:
        'A milk protein that is often used as a thickener and emulsifier. It is generally considered safe for consumption.',
      impact: 'Neutral',
      advice: 'None.',
    },
    {
      ingredient: 'Carboxymethylcellulose',
      description:
        'A type of cellulose that is used as a thickener and stabilizer. It is generally considered safe for consumption.',
      impact: 'Neutral',
      advice: 'None.',
    },
    {
      ingredient: 'Salt',
      description:
        'An essential mineral that is necessary for human health. However, excessive salt intake can contribute to high blood pressure.',
      impact: 'Neutral',
      advice:
        'Choose products with less added salt or opt for unprocessed foods.',
    },
    {
      ingredient: 'Artificial Flavor',
      description:
        'Chemicals that are added to food to enhance or mimic natural flavors. They can be controversial, as some may be linked to health concerns.',
      impact: 'Neutral',
      advice:
        'Choose products with natural flavors or avoid them altogether if you are concerned about their potential effects.',
    },
  ],
  summary:
    "This product contains a lot of sugar and processed ingredients. It is important to be mindful of the amount of sugar you consume and choose healthier alternatives when possible. You can try to reduce your sugar intake by opting for products with less added sugar or by choosing natural sweeteners like stevia or honey in moderation.  You can also try to reduce your intake of processed foods by choosing more whole, unprocessed foods. It's always a good idea to read food labels carefully and make informed choices about what you eat. This product appears to be some type of hot chocolate mix.",
  product_guess: 'Hot Chocolate Mix',
};

export const dummyJsonFoodData1 = {
  ingredients_table: [
    {
      ingredient: 'Sugar',
      description:
        "A simple carbohydrate that provides quick energy. It's a source of calories but lacks essential nutrients.",
      good_bad_neutral: 'Bad',
      advice:
        "While sugar is fine in moderation, it's best to limit your intake and choose whole, unprocessed foods for sustained energy.",
    },
    {
      ingredient: 'Nonfat Milk',
      description:
        "A good source of protein, calcium, and vitamin D. It's low in fat, making it a healthier choice than whole milk.",
      good_bad_neutral: 'Good',
      advice:
        'Milk is a great source of nutrients, especially for bone health.',
    },
    {
      ingredient: 'Whey',
      description:
        "A protein derived from milk. It's a complete protein, meaning it contains all nine essential amino acids.",
      good_bad_neutral: 'Good',
      advice:
        'Whey protein is a popular choice for athletes and those looking to increase their protein intake.',
    },
    {
      ingredient: 'Partially Hydrogenated Soybean Oil',
      description:
        'A type of vegetable oil that has been processed to make it more solid at room temperature. It contains trans fats, which are unhealthy and have been linked to heart disease.',
      good_bad_neutral: 'Harmful',
      advice:
        'Try to avoid trans fats as much as possible. Look for products that use healthier oils like olive oil or avocado oil.',
    },
    {
      ingredient: 'Corn Syrup',
      description:
        "A type of high-fructose corn syrup, which is a highly processed sweetener. It's linked to weight gain, type 2 diabetes, and other health problems.",
      good_bad_neutral: 'Harmful',
      advice:
        'Limit your intake of added sugars, including corn syrup. Choose natural sweeteners like honey or maple syrup in moderation.',
    },
    {
      ingredient: 'Marshmallows',
      description:
        'A confectionery made from sugar, gelatin, and corn syrup. They are high in sugar and low in nutritional value.',
      good_bad_neutral: 'Neutral',
      advice:
        'Marshmallows are a treat that can be enjoyed in moderation. Be mindful of their sugar content and choose them as an occasional indulgence.',
    },
    {
      ingredient: 'Modified Corn Starch',
      description:
        "A type of starch that has been chemically modified to alter its properties. It's used as a thickener and stabilizer in food.",
      good_bad_neutral: 'Bad',
      advice:
        "Modified food starch is generally safe in moderation, but it's important to be aware of its processed nature.",
    },
    {
      ingredient: 'Sodium Hexametaphosphate',
      description:
        'A food additive used as a sequestrant, meaning it helps to prevent the breakdown of food products.',
      good_bad_neutral: 'Neutral',
      advice:
        'Sodium hexametaphosphate is generally considered safe in small amounts. However, some people may be sensitive to it.',
    },
    {
      ingredient: 'Artificial Flavors',
      description:
        'Synthetic compounds that mimic the taste of natural flavors. They are often used to reduce production costs.',
      good_bad_neutral: 'Neutral',
      advice:
        'While artificial flavors are generally safe, some people may prefer natural flavors. Read ingredient lists carefully and choose products with fewer artificial ingredients.',
    },
    {
      ingredient: 'Corn Syrup Solids',
      description:
        "A type of dried corn syrup. It's used as a sweetener and thickener in food.",
      good_bad_neutral: 'Neutral',
      advice:
        'Corn syrup solids are a type of processed sugar. Limit your intake of added sugars for optimal health.',
    },
    {
      ingredient: 'Sodium Caseinate',
      description:
        "A protein derivative from milk. It's used as a thickener, emulsifier, and stabilizer in food.",
      good_bad_neutral: 'Neutral',
      advice:
        'Sodium caseinate is generally safe for most people. However, those with milk allergies should avoid it.',
    },
    {
      ingredient: 'Carboxymethylcellulose',
      description:
        "A food additive used as a thickener and stabilizer. It's also used as a dietary fiber supplement.",
      good_bad_neutral: 'Neutral',
      advice:
        "Carboxymethylcellulose is generally safe, but it's important to be aware of its potential effects on digestion.",
    },
    {
      ingredient: 'Salt',
      description:
        'An essential mineral that plays a role in regulating body fluids. However, too much salt can lead to high blood pressure.',
      good_bad_neutral: 'Neutral',
      advice:
        'Moderate salt intake is essential for good health. Choose foods that are naturally low in sodium and avoid adding extra salt to your meals.',
    },
    {
      ingredient: 'Artificial Flavor',
      description:
        "A synthetic compound that mimics the taste of natural flavors. It's often used to reduce production costs.",
      good_bad_neutral: 'Neutral',
      advice:
        'While artificial flavors are generally safe, some people may prefer natural flavors. Read ingredient lists carefully and choose products with fewer artificial ingredients.',
    },
    {
      ingredient: 'Cocoa',
      description:
        "A powder made from roasted and ground cocoa beans. It's a source of antioxidants and flavonoids, which may have health benefits.",
      good_bad_neutral: 'Good',
      advice:
        'Cocoa is a delicious and healthy treat. Choose dark chocolate with a high cocoa content for maximum benefits.',
    },
    {
      ingredient: 'Gelatin',
      description:
        "A protein derived from animal collagen. It's used as a thickener and stabilizer in food.",
      good_bad_neutral: 'Neutral',
      advice:
        'Gelatin is generally safe for most people. However, those with vegetarian or vegan diets should avoid it.',
    },
    {
      ingredient: 'Soy Oil',
      description:
        "A type of vegetable oil extracted from soybeans. It's a good source of polyunsaturated fatty acids, including omega-3 fatty acids.",
      good_bad_neutral: 'Good',
      advice:
        'Soy oil is a healthy choice for cooking. Choose organic soy oil to avoid genetically modified organisms (GMOs).',
    },
  ],
  summary:
    "This product contains a lot of sugar and processed ingredients. It is important to be mindful of the amount of sugar you consume and choose healthier alternatives when possible. You can try to reduce your sugar intake by opting for products with less added sugar or by choosing natural sweeteners like stevia or honey in moderation.  You can also try to reduce your intake of processed foods by choosing more whole, unprocessed foods. It's always a good idea to read food labels carefully and make informed choices about what you eat. This product appears to be some type of hot chocolate mix.",
  product_guess: 'Hot Chocolate Mix',
};

export const dummyJsonFoodData2 = {
  isRelevent: true,
  isVisible: true,
  product_guess: 'Marshmallow Fluff',
  ingredients: [
    {
      ingredient: 'Sugar',
      description:
        'A simple carbohydrate that provides quick energy but can contribute to weight gain and other health problems if consumed in excess.',
      good_bad_neutral: 'NEUTRAL',
      advice:
        'While sugar is a source of energy, limiting your intake is crucial for overall health. Look for options with less added sugar or choose natural sweeteners like honey or maple syrup in moderation.',
    },
    {
      ingredient: 'Nonfat Milk Whey',
      description:
        'A protein powder derived from milk. It is a good source of protein and essential amino acids.',
      good_bad_neutral: 'GOOD',
      advice:
        "Nonfat milk whey is a valuable protein source for building and repairing tissues. If you're lactose intolerant, look for alternatives like soy protein or pea protein.",
    },
    {
      ingredient: 'Partially Hydrogenated Soybean Oil',
      description:
        'A type of vegetable oil that has been processed to make it more solid at room temperature. It contains trans fats, which are known to raise bad cholesterol levels and increase the risk of heart disease.',
      good_bad_neutral: 'BAD',
      advice:
        'Partially hydrogenated oils should be avoided due to their unhealthy trans fat content. Choose healthier oils like olive oil, avocado oil, or coconut oil instead.',
    },
    {
      ingredient: 'Alkali',
      description:
        'A substance that can neutralize acids. In this context, it is likely used to adjust the pH of the mixture during processing.',
      good_bad_neutral: 'NEUTRAL',
      advice:
        'Alkali is a common food additive and generally considered safe. However, some individuals may have sensitivities to certain types of alkali.',
    },
    {
      ingredient:
        'Marshmallow (Sugar, Corn Syrup, Food Starch - Modified, Gelatin, Sodium Hexametaphosphate, Corn Syrup Solids, Flavors, Blue 1), Corn and Natural Flavors',
      description:
        'A mixture of ingredients that create the marshmallow component. The ingredients include sugar, corn syrup, gelatin, and food coloring. It is a source of sugar and calories.',
      good_bad_neutral: 'NEUTRAL',
      advice:
        "Marshmallows are a sugary treat that can be enjoyed in moderation. If you're looking for a healthier alternative, try making your own marshmallows with natural sweeteners or opt for fruit-based snacks.",
    },
    {
      ingredient: 'Artificial Flavor',
      description:
        'A synthetic compound used to enhance or mimic natural flavors.',
      good_bad_neutral: 'NEUTRAL',
      advice:
        'Artificial flavors are generally safe but can be used in excess by manufacturers.  If you prefer natural flavors, opt for products with fewer additives.',
    },
    {
      ingredient: 'Sodium Caseinate',
      description:
        'A protein derived from milk that is used as an emulsifier and stabilizer. It is often used in processed foods to improve texture and consistency.',
      good_bad_neutral: 'NEUTRAL',
      advice:
        'Sodium caseinate is generally safe for most people. However, individuals with milk allergies should avoid it.  If you are sensitive to dairy, try plant-based alternatives.',
    },
    {
      ingredient: 'Carboxymethylcellulose',
      description:
        'A thickener and stabilizer that is often used in processed foods to improve texture and prevent ingredients from separating.',
      good_bad_neutral: 'NEUTRAL',
      advice:
        'Carboxymethylcellulose is generally safe for most people. However, some individuals may experience digestive issues when consuming large amounts.',
    },
    {
      ingredient: 'Sodium Salt, Artificial Flavor',
      description:
        'These ingredients are used to enhance the flavor and preserve the product. Sodium salt is a common seasoning, and artificial flavors are synthetic compounds used to enhance or mimic natural flavors.',
      good_bad_neutral: 'NEUTRAL',
      advice:
        'Sodium salt should be consumed in moderation to prevent high blood pressure. Choose low-sodium options when possible. Artificial flavors are generally safe but can be used in excess by manufacturers.  If you prefer natural flavors, opt for products with fewer additives.',
    },
    {
      ingredient: 'Loose',
      description:
        "This term likely refers to the product's consistency and texture.",
      good_bad_neutral: 'NEUTRAL',
      advice:
        "Loose refers to the texture of the product. It's important to check the instructions for storage and use.",
    },
  ],
  summary:
    'This product is a treat that contains a mix of good, bad, and neutral ingredients. It is high in sugar and contains partially hydrogenated oils, which are not considered healthy choices.  The nonfat milk whey is a good source of protein, but the product is not a good choice for a balanced diet. To make healthier choices, look for snacks that are low in sugar, trans fats, and artificial ingredients. Consider choosing foods with natural sweeteners, whole grains, and healthy fats.',
};

const formate = {
  product_guess: '',
  isRelevent: true,
  isVisible: true,
  ingredients: [
    {
      ingredient: '',
      description: '',
      good_bad_neutral: '',
      advice: '',
    },
    {
      ingredient: '',
      description: '',
      good_bad_neutral: '',
      advice: '',
    },
    {
      ingredient: '',
      description: '',
      good_bad_neutral: '',
      advice: '',
    },
  ],
  summary: '',
};
