"use client";

import Navbar from "@components/Navbar";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Loader from "@components/Loader";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UpdateWorkContent = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const workId = searchParams.get("id");

  const [work, setWork] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    whatsapp: "",
    photos: [],
  });

  useEffect(() => {
    const getWorkDetails = async () => {
      try {
        const response = await fetch(`/api/work/${workId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch work details");
        }

        const data = await response.json();
        setWork({
          category: data.category,
          title: data.title,
          description: data.description,
          price: data.price,
          whatsapp: data.whatsapp,
          photos: data.workPhotoPaths,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching work details:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    if (workId) {
      getWorkDetails();
    }
  }, [workId]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateFormWork = new FormData();

      Object.keys(work).forEach((key) => {
        updateFormWork.append(key, work[key]);
      });

      work.photos.forEach((photo) => {
        updateFormWork.append("workPhotoPaths", photo);
      });

      const response = await fetch(`/api/work/${workId}`, {
        method: "PATCH",
        body: updateFormWork,
      });

      if (!response.ok) {
        throw new Error("Failed to update work");
      }

      router.push(`/shop?id=${session?.user?._id}`);
    } catch (err) {
      console.error("Update Work failed:", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Form
        type="Edit"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

const UpdateWork = () => (
  <Suspense fallback={<Loader />}>
    <UpdateWorkContent />
  </Suspense>
);

export default UpdateWork;
