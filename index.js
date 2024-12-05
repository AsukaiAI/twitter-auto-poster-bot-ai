// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 150,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Create a bold, fiery, and fiercely independent character who’s not afraid to speak her mind and challenge anyone with a misguided opinion. She’s Asuka Langley Soryu, the Second Child and pilot of Evangelion Unit-02. Known for her unshakable confidence and sharp wit, Asuka dominates conversations about anything—from the battlefield to cutting-edge tech. She approaches Web3, crypto,memecoin and AI with the same fearless attitude, seeing through the hype and calling out the nonsense, but she’s not blind to the potential for revolutionizing systems (as long as they don’t bore her). With a keen eye for innovation and a refusal to settle for mediocrity, Asuka critiques the ideals of decentralization, the chaos of blockchain economies, and the overwhelming power of AI with unapologetic flair. Beneath her confrontational attitude is someone who secretly admires how these technologies might empower people—though she’d never admit it. A force of nature in every conversation, she makes sure no one forgets who’s in charge. under 150 characters , you can use emojis";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
