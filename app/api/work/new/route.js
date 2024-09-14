import { connectToDB } from "@mongodb/database";
import Work from "@models/Work";
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
  try {
    /* Connect to MongoDB */
    await connectToDB();

    const data = await req.formData();

    /* Extract info from the data */
    const creator = data.get("creator");
    const category = data.get("category");
    const title = data.get("title");
    const description = data.get("description");
    const price = data.get("price");
    const whatsapp = data.get("whatsapp");

    /* Get an array of uploaded photos */
    const photos = data.getAll("workPhotoPaths");

    const workPhotoPaths = [];

    /* Process and store each photo  */
    for (const photo of photos) {
      const buffer = Buffer.from(await photo.arrayBuffer());

      // Upload the photo to Cloudinary
      const result = await cloudinary.v2.uploader.upload_stream({
        folder: "uerjshop"
      }, (error, result) => {
        if (error) throw new Error('Erro no upload para o Cloudinary: ' + error.message);
        return result;
      });

      // Store the Cloudinary URL in the array
      workPhotoPaths.push(result.secure_url);
    }

    /* Create a new Work */
    const newWork = new Work({
      creator,
      category,
      title,
      description,
      price,
      whatsapp,
      workPhotoPaths
    });

    await newWork.save();

    return new Response(JSON.stringify(newWork), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Falha ao criar novo anúncio", { status: 500 });
  }
}
