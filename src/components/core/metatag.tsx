import Head from "next/head";
import React from "react";
import { useCustomRouter } from "@/core/helper/general";

export interface IMeta {
  title: string;
  description?: string;
  image?: string;
}

export const MetaTag: React.FC<IMeta> = ({
  title,
  description = "Default description",
  image = ""
}) => {
  const route = useCustomRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* <!-- Twitter Card data --> */}
      <meta name="twitter:card" content="summary"/>
      {/* <meta name="twitter:site" content="@namaakun"/> */}
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      {/* <meta name="twitter:creator" content="@namaakun"/> */}
      <meta name="twitter:image:src" content={image}/>
      <link rel="manifest" href="/manifest.json" />
      
      {/* <!-- Open Graph data --> */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={route.pathname} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description}/>
      <meta property="og:site_name" content="Nama Website" />
      <meta property="article:published_time" content="waktu tampil/publish" />
      <meta property="article:modified_time" content="waktu modifikasi halaman" />
      <meta property="article:tag" content="Tag berita/artikel/produk" />
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </Head>
  )
};