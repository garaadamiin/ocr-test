import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { imageUrl, text } = req.body;
      
      const result = await prisma.ocrResult.create({
        data: { text, imageUrl }
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Qalad ayaa dhacay' });
    }
  }
}