import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // API Route for the ML system simulation (Web Preview fallback)
  app.post('/api/predict', async (req, res) => {
    try {
      const { ticket } = req.body;
      if (!ticket) return res.status(400).json({ error: 'Ticket text required' });
      
      // Simple rules-based NLP mock to avoid Gemini API Quota failures in the UI simulation
      const lower = ticket.toLowerCase();
      let category = "General";
      let priority = "Low";
      let confidence = 0.85 + (Math.random() * 0.1);

      if (lower.includes('pay') || lower.includes('bill') || lower.includes('charge') || lower.includes('deduct')) {
        category = "Billing";
        priority = "High";
      } else if (lower.includes('crash') || lower.includes('error') || lower.includes('bug') || lower.includes('slow')) {
        category = "Technical";
        priority = lower.includes('crash') || lower.includes('error') ? "High" : "Medium";
      } else if (lower.includes('password') || lower.includes('login') || lower.includes('account') || lower.includes('auth')) {
        category = "Account";
        priority = lower.includes('auth') || lower.includes('locked') ? "High" : "Medium";
      }

      // Simulate a small delay for inference
      await new Promise(resolve => setTimeout(resolve, 800));

      res.json({
        category,
        priority,
        confidence_score: parseFloat(confidence.toFixed(4))
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to predict ticket' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
