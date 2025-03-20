// pages/api/history.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const results = await prisma.ocrResult.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Ku celi status 200 haddii data la heli karo
    res.status(200).json(results || []);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Qalad ayaa dhacay', 
      details: error.message 
    });
  }
}