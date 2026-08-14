import React, { useState } from "react";

export default function CreativeStudio() {
  const [prompt, setPrompt] = useState("");
  const [layers, setLayers] = useState([
    { id: 1, type: "background", content: "AI Generated Base Image" }
  ]);

  const handleGenerate = () => {
    const cleanPrompt = prompt.trim() || "Untitled concept";
    setLayers([
      {
        id: Date.now(),
        type: "background",
        content: `Generated Image for: "${cleanPrompt}"`
      }
    ]);
  };

  const addLayer = (type) => {
    setLayers((current) => [
      ...current,
      { id: Date.now(), type, content: `New ${type} Layer` }
    ]);
  };

  const removeLayer = (id) => {
    setLayers((current) => current.filter((layer) => layer.id !== id));
  };

  return (
    <section>
      <div className="section-heading">
        <h2 className="purple-title">AI Creative Studio</h2>
      </div>

      <div className="glass prompt-bar">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Describe the image or logo you want to generate..."
        />
        <button className="primary-btn purple-btn" onClick={handleGenerate}>
          Generate ✨
        </button>
      </div>

      <div className="studio-layout">
        <div className="glass canvas">
          <span className="canvas-label">Editor Canvas</span>
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className={index === 0 ? "canvas-layer base-layer" : "canvas-layer floating-layer"}
            >
              {layer.content}
            </div>
          ))}
        </div>

        <div className="glass layer-manager">
          <h3>Layer Editing</h3>
          <div className="layer-actions">
            <button onClick={() => addLayer("Text")}>+ Text</button>
            <button onClick={() => addLayer("Shape")}>+ Shape</button>
            <button onClick={() => addLayer("Image")}>+ Upload</button>
          </div>

          <div className="layer-list">
            {layers.slice().reverse().map((layer, index) => (
              <div className="layer-row" key={layer.id}>
                <span>Layer {layers.length - index}: {layer.type}</span>
                <button onClick={() => removeLayer(layer.id)} aria-label="Delete layer">
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}