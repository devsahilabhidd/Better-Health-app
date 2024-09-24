export const dummyChats = [
  {
    role: 'user',
    parts: [{text: 'hii'}],
  },
  {
    role: 'model',
    parts: [{text: 'Hello! 👋 \n'}],
  },
  {
    role: 'user',
    parts: [
      {
        inlineData: {
          data: 'https://i.ibb.co/SQLB39N/car.jpg',
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
        text: `The colors are green, red, and white. and the company name I don't know `,
      },
    ],
  },
];
