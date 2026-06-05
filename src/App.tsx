import React, { useState } from 'react';
import { 
  Folder, FileText, Terminal, ArrowRight, ShieldCheck, 
  Activity, Type, Download, Code, CheckCircle, Database 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [ticketText, setTicketText] = useState("My payment was deducted twice.");
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<{category?: string, priority?: string, confidence_score?: number, error?: string} | null>(null);

  const handlePredict = async () => {
    if (!ticketText.trim()) return;
    setIsPredicting(true);
    setPrediction(null);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket: ticketText })
      });
      const data = await res.json();
      setPrediction(data);
    } catch (e) {
      setPrediction({ error: 'Failed to connect to ML prediction service' });
    }
    setIsPredicting(false);
  };

  const fileStructure = [
    { name: "dataset", type: "folder", children: [{ name: "sample_tickets.csv", icon: <Database className="w-4 h-4 text-emerald-500" /> }] },
    { name: "models", type: "folder", children: [
      { name: "category_model.pkl", icon: <Activity className="w-4 h-4 text-purple-500" /> },
      { name: "priority_model.pkl", icon: <Activity className="w-4 h-4 text-purple-500" /> },
      { name: "tfidf_vectorizer.pkl", icon: <Code className="w-4 h-4 text-amber-500" /> }
    ]},
    { name: "notebook", type: "folder", children: [{ name: "ML_Pipeline.ipynb", icon: <Code className="w-4 h-4 text-orange-500" /> }] },
    { name: "src", type: "folder", children: [
      { name: "data_preprocessing.py", icon: <Code className="w-4 h-4 text-blue-500" /> },
      { name: "model_training.py", icon: <Code className="w-4 h-4 text-blue-500" /> },
      { name: "inference.py", icon: <Code className="w-4 h-4 text-blue-500" /> }
    ]},
    { name: "app.py", icon: <Code className="w-4 h-4 text-blue-500" /> },
    { name: "requirements.txt", icon: <FileText className="w-4 h-4 text-gray-500" /> },
    { name: "README.md", icon: <FileText className="w-4 h-4 text-gray-500" /> }
  ];

  const renderTree = (nodes: any[], paddingLeft = 0) => {
    return nodes.map((node, index) => (
      <div key={index}>
        <div 
          className="flex items-center gap-2 py-1.5 px-3 hover:bg-gray-50 rounded-md cursor-default text-sm"
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
        >
          {node.type === "folder" ? (
            <Folder className="w-4 h-4 text-blue-400" />
          ) : (
            node.icon || <FileText className="w-4 h-4 text-gray-400" />
          )}
          <span className={node.type === "folder" ? "font-medium text-gray-700" : "text-gray-600"}>
            {node.name}
          </span>
        </div>
        {node.children && renderTree(node.children, paddingLeft + 16)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-lg text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-sans tracking-tight text-gray-900">Support Ticket Classifier</h1>
              <p className="text-xs text-indigo-600 font-semibold tracking-wide uppercase mt-0.5">ML & NLP Pipeline Project Ready</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Workspace Delivered
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Presentation Details & File Tree */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-emerald-500" />
                   Project Assets Generated
                </h2>
             </div>
             <p className="text-sm text-gray-600 mb-6 leading-relaxed">
               All requested source files for your internship project have been generated in the workspace under the <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-600 text-xs">/Support-Ticket-Classification</code> directory. 
               Use the <strong>export tools</strong> in your AI Studio editor to download the complete archive.
             </p>

             <div className="bg-white border border-gray-200 rounded-lg overflow-hidden font-mono mt-4">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                  <Folder className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-semibold text-gray-700">Support-Ticket-Classification/</span>
                </div>
                <div className="py-2">
                   {renderTree(fileStructure)}
                </div>
             </div>
          </section>

          <section className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-32 h-32 text-indigo-500" />
             </div>
             <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-2 flex items-center gap-2">
               <Terminal className="w-4 h-4" /> Usage Instructions
             </h3>
             <ul className="space-y-3 text-sm text-indigo-800 mt-4 relative z-10">
               <li className="flex gap-2 leading-relaxed">
                 <span className="font-bold">1.</span> 
                 <span>Run Jupyter notebook locally: <code className="bg-white/50 px-1.5 py-0.5 rounded border border-indigo-200 block mt-1 w-max">jupyter notebook notebook/ML_Pipeline.ipynb</code></span>
               </li>
               <li className="flex gap-2 leading-relaxed">
                 <span className="font-bold">2.</span> 
                 <span>Launch the Python Streamlit app: <code className="bg-white/50 px-1.5 py-0.5 rounded border border-indigo-200 block mt-1 w-max">streamlit run app.py</code></span>
               </li>
             </ul>
          </section>
        </div>

        {/* Right Column - Live NLP Demonstration (Gemini Mock) */}
        <div className="lg:col-span-7">
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-medium flex items-center gap-2">
                 <Activity className="w-5 h-5 text-indigo-400" />
                 Live Inference Simulation
              </h2>
              <span className="text-gray-400 text-xs font-mono uppercase bg-gray-800 px-2 py-1 rounded">API Connected</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
               <p className="text-sm text-gray-500 mb-6 flex items-start gap-2">
                 <Type className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                 Test the model's simulated classification capabilities. Simply enter a dummy customer support ticket text below and submit it to the remote inference handler.
               </p>

               <div className="relative mb-6 flex-1 flex flex-col">
                 <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">Ticket Content</label>
                 <textarea 
                   className="w-full flex-1 min-h-[160px] bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-relaxed transition-all"
                   value={ticketText}
                   onChange={(e) => setTicketText(e.target.value)}
                   spellCheck="false"
                 />
                 <div className="mt-4 flex justify-end">
                    <button 
                      onClick={handlePredict}
                      disabled={isPredicting || !ticketText.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      {isPredicting ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           Analyzing NLP...
                        </>
                      ) : (
                        <>
                           Predict Ticket Class
                           <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                 </div>
               </div>

               {/* Results Area */}
               <div className="bg-gray-50 rounded-xl border border-gray-200 min-h-[140px] flex flex-col justify-center hide-scrollbars">
                 <AnimatePresence mode="wait">
                   {!prediction && (
                     <motion.div 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 1 }} 
                       exit={{ opacity: 0 }}
                       className="text-center p-6"
                     >
                       <p className="text-sm text-gray-400 font-medium font-mono uppercase tracking-widest">Awaiting Input Sequence...</p>
                     </motion.div>
                   )}
                   
                   {prediction && prediction.error && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }} 
                       className="p-6 text-center text-red-600 font-medium text-sm"
                     >
                       {prediction.error}
                     </motion.div>
                   )}

                   {prediction && !prediction.error && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.95 }} 
                       animate={{ opacity: 1, scale: 1 }} 
                       className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6"
                     >
                        <div className="bg-white border text-center border-gray-200 rounded-lg p-4 shadow-sm flex items-center gap-3">
                           <div className="bg-blue-50 p-2.5 rounded-md self-start mt-0.5">
                              <Folder className="w-5 h-5 text-blue-600" />
                           </div>
                           <div className="text-left">
                              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Category</p>
                              <p className="text-lg font-bold text-gray-900">{prediction.category}</p>
                           </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center gap-3">
                           <div className={`p-2.5 rounded-md self-start mt-0.5 ${prediction.priority === 'High' ? 'bg-red-50 text-red-600' : prediction.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                              <Activity className="w-5 h-5" />
                           </div>
                           <div className="text-left">
                              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Priority</p>
                              <p className="text-lg font-bold text-gray-900">{prediction.priority}</p>
                           </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center gap-3">
                           <div className="bg-indigo-50 p-2.5 text-indigo-600 rounded-md self-start mt-0.5">
                              <CheckCircle className="w-5 h-5" />
                           </div>
                           <div className="text-left">
                              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Confidence</p>
                              <p className="text-lg font-bold text-gray-900 font-mono">{(prediction.confidence_score! * 100).toFixed(1)}%</p>
                           </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

