import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { NextResponse } from "next/server";

// Инициализация Firebase Admin SDK
admin.initializeApp();
const db = getFirestore();

// Получить все заметки
export const getNotes = onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("notes").get();
    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(notes);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Ошибка получения заметок");
  }
});

// Добавить новую заметку
export const addNote = onRequest(async (req, res) => {
  try {
    const note = req.body;
    const docRef = await db.collection("notes").add(note);
    res.status(201).json({ id: docRef.id, ...note });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Ошибка добавления заметки");
  }
});

// Получить заметку по id
export const getNoteById = onRequest(async (req, res) => {
  try {
    const { id } = req.query;
    const doc = await db.collection("notes").doc(String(id)).get();
    if (!doc.exists) {
      res.status(404).send("Заметка не найдена");
      return;
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Ошибка получения заметки");
  }
});
