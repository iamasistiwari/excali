import React from "react";

export default async function page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = await params
  return <div>{slug}</div>;
}
