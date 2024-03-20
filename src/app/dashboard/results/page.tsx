import { cookies } from "next/headers";
import Results from "./index";

async function Page() {
  const cookieStore = cookies();
  let accessToken: string | null = null;
  let data = [];

  cookieStore.getAll().forEach(({ name, value }) => {
    if (name.endsWith(".accessToken")) {
      accessToken = value;
    }
  });

  const metadata = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BNA_API_URL}/bnas/results`,
      metadata
    );

    if (!resp.ok) {
      console.error(resp.text());
      return {
        success: false,
        errors: { message: "oops! something went wrong!" },
      };
    }

    data = await resp.json();
  } catch (error) {
    console.error(error);
    throw new Error("Fetch failed!");
  }

  return <Results data={data} />;
}

export default Page;
