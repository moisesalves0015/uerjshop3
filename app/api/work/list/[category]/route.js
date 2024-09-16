import { connectToDB } from "@mongodb/database";
import Work from "@models/Work";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { category } = params;
    let workList;

    if (category !== "Todas") {
      workList = await Work.find({ category }).populate("creator");
    } else {
      workList = await Work.find().populate("creator");
    }

    return new Response(JSON.stringify(workList), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Failed to fetch Work List" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
