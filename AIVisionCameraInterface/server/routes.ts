import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for frontend-backend communication
  
  // Get current session status
  app.get("/api/session-status", async (req, res) => {
    try {
      // This would typically fetch from database
      res.json({
        isActive: true,
        modelLoaded: false,
        totalDetections: 0,
        capturedImages: 0,
        sessionDuration: 0
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get session status" });
    }
  });

  // Get detection history
  app.get("/api/detections", async (req, res) => {
    try {
      // This would fetch detection results from database
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: "Failed to get detections" });
    }
  });

  const httpServer = createServer(app);

  // Setup WebSocket server for communication with Python backend
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws-proxy' 
  });

  wss.on('connection', (ws: WebSocket) => {
    console.log('Frontend WebSocket connected');
    
    // Proxy connection to Python backend
    let pythonWs: WebSocket | null = null;
    
    try {
      // Connect to Python FastAPI WebSocket
      pythonWs = new WebSocket('ws://localhost:8000/ws');
      
      pythonWs.on('open', () => {
        console.log('Connected to Python backend WebSocket');
        ws.send(JSON.stringify({
          type: 'connection_status',
          status: 'connected_to_backend'
        }));
      });
      
      pythonWs.on('message', (data) => {
        // Forward messages from Python backend to frontend
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data.toString());
        }
      });
      
      pythonWs.on('error', (error) => {
        console.error('Python backend WebSocket error:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Backend connection error'
        }));
      });
      
      pythonWs.on('close', () => {
        console.log('Python backend WebSocket disconnected');
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'connection_status',
            status: 'backend_disconnected'
          }));
        }
      });
      
    } catch (error) {
      console.error('Failed to connect to Python backend:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Failed to connect to backend'
      }));
    }
    
    // Handle messages from frontend
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        // Forward to Python backend if connected
        if (pythonWs && pythonWs.readyState === WebSocket.OPEN) {
          pythonWs.send(JSON.stringify(message));
        }
      } catch (error) {
        console.error('Error processing frontend message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Frontend WebSocket disconnected');
      if (pythonWs && pythonWs.readyState === WebSocket.OPEN) {
        pythonWs.close();
      }
    });
    
    ws.on('error', (error) => {
      console.error('Frontend WebSocket error:', error);
    });
  });

  return httpServer;
}
