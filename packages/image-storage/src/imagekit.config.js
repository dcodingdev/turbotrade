import ImageKit from "@imagekit/nodejs";
// import dotenv from "dotenv";
// dotenv.config();
console.log("PUBLIC:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("PRIVATE:", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("URL:", process.env.IMAGEKIT_URL_ENDPOINT);
export const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
//# sourceMappingURL=imagekit.config.js.map