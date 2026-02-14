import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await readFile(TASKS_FILE, 'utf-8');
      const tasks = JSON.parse(data);
      res.status(200).json(tasks);
    } catch (e) {
      res.status(200).json([]);
    }
  } else if (req.method === 'POST') {
    try {
      const tasks = req.body;
      await writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
