import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Image as ImageIcon, Loader2, Download, Info, ChevronDown, ChevronUp, RefreshCw, Sparkles, Box } from 'lucide-react';
import { getAI, MODELS } from '@/lib/gemini';

export function FloorPlan3D() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Reset result on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;

    setIsGenerating(true);
    setResult(null);

    try {
      // Extract base64 data (remove data:image/png;base64, prefix)
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: MODELS.image,
        contents: [
          {
            role: 'user',
            parts: [
              { text: `Generate a high-quality, realistic 3D floor plan visualization based on this 2D floor plan image. The view should be isometric or top-down 3D. Style: ${prompt || 'Modern, clean, professional real estate style'}.` },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              }
            ]
          }
        ],
      });

      // Extract image from response
      // The response structure for image generation might vary, but typically it's in candidates[0].content.parts
      // For gemini-3-pro-image-preview, it returns inlineData or text.
      // Let's check all parts.
      const parts = response.candidates?.[0]?.content?.parts;
      let foundImage = false;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            setResult(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
        if (!foundImage) {
          // Check for text response (error or clarification)
          const textPart = parts.find(p => p.text);
          if (textPart) {
            alert(`AI Response: ${textPart.text}`);
          } else {
            console.error("No image or text found in response");
            alert("Nepodařilo se vygenerovat obrázek. Zkuste to prosím znovu.");
          }
        }
      } else {
        console.error("No image found in response");
        alert("Nepodařilo se vygenerovat obrázek. Zkuste to prosím znovu.");
      }

    } catch (error) {
      console.error("Generation error:", error);
      alert("Došlo k chybě při generování. Zkontrolujte prosím své připojení a zkuste to znovu.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Generátor 3D Půdorysů</h1>
          <p className="text-slate-500">Převod 2D náčrtů na profesionální 3D vizualizace pomocí AI.</p>
        </div>
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
        >
          <Info size={18} />
          {showGuide ? 'Skrýt návod' : 'Zobrazit návod'}
        </button>
      </div>

      {/* Guide Section */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900 text-sm leading-relaxed">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Info size={20} /> Jak používat tento nástroj:
              </h3>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Nahrajte obrázek vašeho 2D půdorysu (náčrt tužkou nebo technický výkres).</li>
                <li>(Volitelné) Do pole "Styl a poznámky" napište požadavky (např. "světlé dřevo, moderní nábytek").</li>
                <li>Klikněte na tlačítko <strong>Generovat 3D Půdorys</strong>.</li>
                <li>Počkejte cca 10-20 sekund na vygenerování vizualizace.</li>
                <li>Výsledek si můžete stáhnout kliknutím na tlačítko Stáhnout.</li>
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group ${
              image
                ? 'border-amber-500 bg-amber-50/50'
                : 'border-slate-300 hover:border-amber-500 hover:bg-slate-50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            {image ? (
              <div className="relative">
                <img src={image} alt="Uploaded plan" className="max-h-64 mx-auto rounded-lg shadow-md" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <span className="text-white font-medium flex items-center gap-2">
                    <RefreshCw size={20} /> Změnit obrázek
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-12">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                  <Upload size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-1">Nahrajte 2D půdorys</h3>
                <p className="text-slate-500 text-sm">Klikněte nebo přetáhněte obrázek sem</p>
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Styl a poznámky (volitelné)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Např.: Moderní skandinávský styl, světlé dřevěné podlahy, béžové stěny..."
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all min-h-[100px]"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!image || isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
              !image || isGenerating
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/20 hover:shadow-amber-900/30 hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={24} className="animate-spin" /> Generuji vizualizaci...
              </>
            ) : (
              <>
                <Sparkles size={24} /> Generovat 3D Půdorys
              </>
            )}
          </button>
        </div>

        {/* Result Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Box size={20} className="text-amber-600" /> Výsledek
          </h3>
          
          <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden relative group">
            {result ? (
              <>
                <img src={result} alt="Generated 3D Plan" className="w-full h-full object-contain" />
                <a
                  href={result}
                  download="3d-pudorys-arkemax.png"
                  className="absolute bottom-4 right-4 px-4 py-2 bg-white text-slate-900 font-medium rounded-lg shadow-lg flex items-center gap-2 hover:bg-slate-50 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-200"
                >
                  <Download size={18} /> Stáhnout
                </a>
              </>
            ) : (
              <div className="text-center text-slate-400 p-8">
                {isGenerating ? (
                  <div className="space-y-4">
                    <Loader2 size={48} className="animate-spin mx-auto text-amber-500" />
                    <p>Vytvářím 3D model...<br/><span className="text-xs opacity-70">To může trvat několik sekund.</span></p>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Zde se zobrazí vygenerovaný 3D půdorys</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
