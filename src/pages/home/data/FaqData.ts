interface DataType {
  id: number;
  page: string;
  title: string;
  desc: string;
  showAnswer: boolean;
}

const faq_data: DataType[] = [
  {
    id: 1,
    page: "home_2",
    showAnswer: false,
    title: "What is blockchain technology?",
    desc: "Blockchain technology is a decentralized, distributed ledger technology that records transactions on multiple computers.",
  },
  {
    id: 2,
    page: "home_2",
    showAnswer: false,
    title: "What is the value of FOX tokens?",
    desc: "The value of FOX tokens is determined by market demand and supply. They can be used within the ecosystem for various services.",
  },
  {
    id: 3,
    page: "home_2",
    showAnswer: false,
    title: "What is Bitcoin?",
    desc: "Bitcoin is a type of digital currency that uses peer-to-peer technology to facilitate instant payments.",
  },
  {
    id: 4,
    page: "home_2",
    showAnswer: false,
    title: "What is cryptocurrency?",
    desc: "Cryptocurrency is a digital or virtual currency that uses cryptography for security.",
  },
  {
    id: 5,
    page: "home_2",
    showAnswer: false,
    title: "How does cryptocurrency work?",
    desc: "Cryptocurrency works through a technology called blockchain, which is a decentralized technology spread across many computers.",
  },
];

export default faq_data;
