import React, { useState, useRef, useEffect } from "react";

export default function MultiCamControlPanel() {
  const CAM_COUNT = 6;
  const [mode, setMode] = useState(Array(CAM_COUNT).fill("Live"));
  const [peopleCount, setPeopleCount] = useState(Array(CAM_COUNT).fill(0));
  const [density, setDensity] = useState(Array(CAM_COUNT).fill(50));
  const [riskCount, setRiskCount] = useState(Array(CAM_COUNT).fill(1));
  const videoRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPeopleCount((prev) => prev.map((_, i) => Math.floor((density[i] / 100) * 25)));
      setRiskCount((prev) =>
        prev.map((_, i) => (density[i] < 40 ? 1 : density[i] < 70 ? 2 : 3))
      );
    }, 1200);
    return () => clearInterval(interval);
  }, [density]);

  useEffect(() => {
    mode.forEach((m, i) => {
      if (m === "Cam") {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            const el = videoRefs.current[i];
            if (el) el.srcObject = stream;
          })
          .catch(() => {});
      } else {
        const el = videoRefs.current[i];
        if (el && el.srcObject) {
          const tracks = el.srcObject.getTracks();
          tracks.forEach((t) => t.stop());
          el.srcObject = null;
        }
      }
    });

    return () => {
      videoRefs.current.forEach((el) => {
        if (el && el.srcObject) {
          el.srcObject.getTracks().forEach((t) => t.stop());
        }
      });
    };
  }, [mode]);

  const getRiskColor = (risk) => {
    if (risk === 1) return "bg-green-500";
    if (risk === 2) return "bg-yellow-400 text-black";
    if (risk === 3) return "bg-red-600";
    return "bg-gray-400";
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '#142930' }}>
      <h1 className="text-2xl font-semibold mb-4 text-white">Multi-Cam Control Panel (Preview)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: CAM_COUNT }).map((_, i) => (
          <div key={i} className="rounded-2xl shadow bg-white/10 backdrop-blur-sm overflow-hidden border border-white/20">
            <div className="px-4 py-3 border-b border-white/20 text-white">
              <div className="flex items-center justify-between">
                <div className="font-medium">Camera {i + 1}</div>
                <div className="text-sm text-gray-300">Panel</div>
              </div>
            </div>

            <div className="p-4">
              <div className="relative aspect-video bg-[#1c3943] rounded-lg overflow-hidden flex flex-col justify-between">
                <div className="relative flex-1 flex items-center justify-center text-gray-200">
                  {mode[i] === "Cam" ? (
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      autoPlay
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">Live View</div>
                  )}

                  <div className="absolute top-3 left-3 bg-black/60 text-white text-sm px-2 py-1 rounded">People: {peopleCount[i]}</div>

                  <div className={`absolute top-3 right-3 text-sm px-2 py-1 rounded ${getRiskColor(riskCount[i])}`}>
                    Risk: {riskCount[i] === 1 ? 'Low' : riskCount[i] === 2 ? 'Medium' : 'High'}
                  </div>

                  <div className="absolute left-0 right-0 bottom-0 bg-black/55 backdrop-blur-sm p-2 flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m8 0H8" />
                      </svg>
                      <span>Upload</span>
                      <input type="file" className="hidden" />
                    </label>

                    <button
                      onClick={() => {
                        const nm = [...mode];
                        nm[i] = nm[i] === 'Cam' ? 'Live' : 'Cam';
                        setMode(nm);
                      }}
                      className="text-sm px-3 py-1 rounded bg-white/20 text-white hover:bg-white/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h4l2-3h6l2 3h4v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                      </svg>
                      {mode[i]}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">Density</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={density[i]}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          const nd = [...density];
                          nd[i] = Number.isNaN(v) ? 0 : v;
                          setDensity(nd);
                        }}
                        className="w-20 text-black rounded px-2 py-0.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-300">Preview is interactive. For full app behaviour wire up your backend and replace simulated counters with live analytics.</div>
    </div>
  );
}
