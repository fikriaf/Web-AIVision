# AI Vision Waste Classification System

![Hasil Demo](https://github.com/fikriaf/Web-AIVision/blob/main/Preview.png)

## Overview

This is an AI-powered waste classification application that uses computer vision to detect and categorize different types of waste materials. The system combines a React frontend with a Node.js/Express backend and a Python FastAPI service for AI processing, utilizing YOLO models for real-time object detection.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Primary Backend**: Node.js with Express server
- **AI Processing**: Separate Python FastAPI service for YOLO model inference
- **Communication**: WebSocket connections for real-time data streaming
- **Session Management**: In-memory storage with plans for database integration

### Database Architecture
- **ORM**: Drizzle with PostgreSQL support
- **Schema**: Comprehensive tables for users, detection sessions, results, and model configurations
- **Migration Strategy**: Drizzle Kit for schema management

## Key Components

### Frontend Components
1. **CameraFeed**: Handles webcam access and real-time video streaming
2. **ControlPanel**: Configuration interface for detection parameters and model settings
3. **PerformanceMetrics**: Real-time system performance monitoring
4. **UI Components**: Complete Shadcn/ui component library for consistent interface

### Backend Services
1. **Express Server**: Main application server handling HTTP requests and WebSocket connections
2. **Python Backend**: FastAPI service with YOLO model integration
3. **WebSocket Manager**: Real-time communication between frontend and AI processing
4. **Performance Monitor**: System resource monitoring (CPU, memory, GPU usage)
5. **File Handler**: Manages model uploads and data exports

### AI/ML Components
1. **YOLO Detector**: Ultralytics YOLO implementation for waste classification
2. **Model Configuration**: Configurable confidence thresholds and class filtering
3. **Real-time Processing**: Frame-by-frame analysis with performance optimization

## Data Flow

1. **Camera Feed**: User webcam captures video frames
2. **Frame Processing**: Frames sent via WebSocket to Python backend
3. **AI Inference**: YOLO model processes frames and detects waste objects
4. **Results Streaming**: Detection results sent back to frontend via WebSocket
5. **Data Storage**: Results optionally stored in PostgreSQL database
6. **Performance Monitoring**: System metrics continuously monitored and displayed

### Waste Classification Categories
- Plastic (Plastik)
- Glass (Kaca) 
- Cans (Kaleng)

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, Lucide icons
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS, class-variance-authority
- **Build Tools**: Vite, TypeScript

### Backend Dependencies
- **Server Framework**: Express.js, WebSocket support
- **Database**: Drizzle ORM, PostgreSQL driver (@neondatabase/serverless)
- **Validation**: Zod for schema validation
- **Session Management**: Connect-pg-simple for PostgreSQL sessions

### Python AI Backend
- **Web Framework**: FastAPI with uvicorn
- **Computer Vision**: OpenCV, Ultralytics YOLO
- **Performance**: NumPy, psutil for system monitoring
- **File Handling**: aiofiles for async file operations

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with hot reload
- **Database**: Neon PostgreSQL or local PostgreSQL instance
- **AI Service**: FastAPI with uvicorn in development mode

### Production Build
- **Frontend**: Static build output served by Express
- **Backend**: Compiled TypeScript bundle with ESBuild
- **Database**: Production PostgreSQL instance
- **AI Service**: Production FastAPI deployment
- **Environment**: NODE_ENV-based configuration

### Database Migration
- Command: `npm run db:push` for schema deployment
- Drizzle Kit handles PostgreSQL schema synchronization
- Migration files stored in `./migrations` directory

## Recent Changes

- **July 07, 2025 - Theme and Camera Selection Added**
  - Added dark/light mode toggle with theme provider
  - Implemented camera selection dropdown for multiple cameras
  - Updated all components to use theme-aware styling (surface/muted colors)
  - Enhanced camera hook to support device enumeration and switching
  - Improved responsive design for better light/dark mode contrast

## Changelog
- July 07, 2025. Initial setup with AI waste classification system
- July 07, 2025. Added theme toggle and camera selection features

## User Preferences

Preferred communication style: Simple, everyday language.
UI Preferences: Dark/light theme toggle, camera selection support, theme-aware styling
