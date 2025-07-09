import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const detectionSessions = pgTable("detection_sessions", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  modelName: text("model_name").notNull(),
  totalDetections: integer("total_detections").default(0),
  capturedImages: integer("captured_images").default(0),
});

export const detectionResults = pgTable("detection_results", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => detectionSessions.id),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  className: text("class_name").notNull(),
  confidence: real("confidence").notNull(),
  bbox: jsonb("bbox").notNull(), // [x1, y1, x2, y2]
  imageData: text("image_data"), // base64 encoded image
});

export const modelConfigurations = pgTable("model_configurations", {
  id: serial("id").primaryKey(),
  modelName: text("model_name").notNull(),
  confidenceThreshold: real("confidence_threshold").notNull().default(0.5),
  iouThreshold: real("iou_threshold").notNull().default(0.45),
  enabledClasses: jsonb("enabled_classes").notNull().default(['plastic', 'glass', 'cans', 'organic']),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  filePath: text("file_path").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDetectionSessionSchema = createInsertSchema(detectionSessions).pick({
  modelName: true,
});

export const insertDetectionResultSchema = createInsertSchema(detectionResults).pick({
  sessionId: true,
  className: true,
  confidence: true,
  bbox: true,
  imageData: true,
});

export const insertModelConfigurationSchema = createInsertSchema(modelConfigurations).pick({
  modelName: true,
  confidenceThreshold: true,
  iouThreshold: true,
  enabledClasses: true,
  filePath: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDetectionSession = z.infer<typeof insertDetectionSessionSchema>;
export type DetectionSession = typeof detectionSessions.$inferSelect;

export type InsertDetectionResult = z.infer<typeof insertDetectionResultSchema>;
export type DetectionResult = typeof detectionResults.$inferSelect;

export type InsertModelConfiguration = z.infer<typeof insertModelConfigurationSchema>;
export type ModelConfiguration = typeof modelConfigurations.$inferSelect;
