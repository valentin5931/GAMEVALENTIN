import React, { useState } from 'react';
import { editImage } from '../services/geminiService';

interface ImageEditorProps {
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;
    setLoading(true);
    setError(null);
    try {
      const result = await editImage(selectedImage, prompt);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("The wild AI fled! (No image returned)");
      }
    } catch (err) {
      setError("Communication error with the AI!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-[#9bbc0f] z-50 flex flex-col p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4 border-b-2 border-[#0f380f] pb-2">
        <h2 className="text-xl font-bold text-[#0f380f]">POKé-EDITOR</h2>
        <button onClick={onClose} className="text-[#0f380f] hover:text-[#306230]">X</button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-[#8bac0f] p-4 border-2 border-[#0f380f] rounded">
          <p className="mb-2 text-xs">1. UPLOAD IMAGE</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="text-xs w-full mb-2"
          />
        </div>

        {selectedImage && (
          <div className="bg-[#8bac0f] p-4 border-2 border-[#0f380f] rounded flex flex-col items-center">
             <p className="mb-2 text-xs w-full text-left">PREVIEW</p>
             <img src={selectedImage} alt="Original" className="max-h-32 object-contain border border-[#0f380f]" />
          </div>
        )}

        <div className="bg-[#8bac0f] p-4 border-2 border-[#0f380f] rounded">
          <p className="mb-2 text-xs">2. COMMAND (e.g. "Add a retro filter")</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 p-2 text-xs bg-[#9bbc0f] border border-[#0f380f] placeholder-[#306230] text-[#0f380f] outline-none"
              placeholder="What should Gemini do?"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !selectedImage || !prompt}
              className={`px-4 py-2 text-xs text-white font-bold border-b-4 border-r-4 active:border-b-0 active:border-r-0 active:translate-y-1 ${loading || !selectedImage ? 'bg-gray-500 border-gray-700' : 'bg-[#0f380f] border-[#306230] hover:bg-[#306230]'}`}
            >
              {loading ? '...' : 'GO!'}
            </button>
          </div>
        </div>

        {error && (
            <div className="p-2 bg-red-100 text-red-900 border border-red-500 text-xs">
                {error}
            </div>
        )}

        {generatedImage && (
          <div className="bg-[#8bac0f] p-4 border-2 border-[#0f380f] rounded flex flex-col items-center animate-pulse-once">
            <p className="mb-2 text-xs w-full text-left">RESULT (GEMINI FLASH)</p>
            <img src={generatedImage} alt="Generated" className="w-full object-contain border-2 border-[#0f380f]" />
            <a href={generatedImage} download="valentin-edited.png" className="mt-2 text-xs underline text-[#0f380f]">Download</a>
          </div>
        )}
      </div>
      
      <p className="mt-4 text-[10px] text-center text-[#306230]">POWERED BY GEMINI 2.5 FLASH IMAGE</p>
    </div>
  );
};

export default ImageEditor;