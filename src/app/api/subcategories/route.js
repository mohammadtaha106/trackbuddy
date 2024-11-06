import { connectDB } from "@/lib/db/connectDB";
import { SubCategoryModal } from "@/lib/models/SubCategories";





export async function GET(request) {
  await connectDB();
  const reqUrl = request.reqUrl
  const {searchParams} = new URL(reqUrl)
  const query ={}
if(searchParams.get(("category"))){
    query.category =searchParams.get("category")
}
  const subCategories = await SubCategoryModal.find(query).populate(
     "category",
    "title"
  );
  return Response.json(
    {
      msg: "SubCategories Fetched Successfully",
      subCategories ,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newSubCategory = new SubCategoryModal(obj);
  await newSubCategory.save();

  return Response.json(
    {
      msg: "SubCategories Added Successfully ",
      subCategory: newSubCategory,
    },
    { status: 201 }
  );
}

export async function PUT(request) {}

export async function DELETE(request) {}