export const uploadImageToCloud = async (imageUrl) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKNEND_URL}/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const secureURL = data.url;
    return secureURL;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const uploadToTempURL = async (file) => {
  const body = new FormData();
  body.append("file", file);
  console.log("ready to upload file", body);
  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  console.log("get temp file");

  const resultUrl = (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
  // console.log("resultUrl", resultUrl);

  return resultUrl;
};
