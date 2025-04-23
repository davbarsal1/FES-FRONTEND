// src/pages/Radio.jsx
import { useEffect } from "react";

export default function Radio() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.cloud.caster.fm//widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">📻 Radio en Vivo</h2>

      <div
        data-type="newStreamPlayer"
        data-publicToken="8d51b065-8754-45c5-93d5-9adbbfc844a5"
        data-theme="dark"
        data-color="e81e4d"
        data-channelId=""
        data-rendered="false"
        className="cstrEmbed w-full max-w-xl"
      >
        <a href="https://www.caster.fm">Shoutcast Hosting</a>
        <a href="https://www.caster.fm">Stream Hosting</a>
        <a href="https://www.caster.fm">Radio Server Hosting</a>
      </div>
    </div>
  );
}
