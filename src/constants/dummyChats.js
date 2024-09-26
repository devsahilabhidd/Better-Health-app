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
        text: `The colors are green, red, and white. and the company name I don't know `,
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
        text: `     Barcodes encode product information into bars and alphanumeric characters, making it much faster and easier to ring up items at a store or track inventory in a warehouse. Besides ease and speed, bar codes' major business benefits include accuracy, inventory control and cost savings.
        
        Barcodes encode product information into bars and alphanumeric characters, making it much faster and easier to ring up items at a store or track inventory in a warehouse. Besides ease and speed, bar codes' major business benefits include accuracy, inventory control and cost savings.`,
      },
    ],
  },
];
