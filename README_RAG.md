# AutomationX Gallery + RAG Setup Guide

## 1. ติดตั้ง Dependencies

```bash
npm install langchain @langchain/ollama @langchain/core
```

## 2. ติดตั้ง Ollama

ดาวน์โหลดจาก https://ollama.com แล้วรัน:

```bash
# ดึง LLM model
ollama pull llama3

# ดึง Embedding model
ollama pull nomic-embed-text

# ตรวจสอบว่า Ollama รันอยู่
ollama serve
```

## 3. สร้างไฟล์ข้อมูลบริษัท

```bash
mkdir data
```

สร้างไฟล์ `data/avalant_media.txt` แล้วใส่ข้อมูลบริษัท เช่น:

```
บริษัท Avalant Media ก่อตั้งในปี 2020 ...
บริการของเรา: AutomationX, AI Chatbot, ...
ติดต่อ: contact@avalant.co.th ...
```

## 4. โครงสร้างโฟลเดอร์

```
avalant_chat_bot/
├── server.js
├── image-gallery.html
├── data/
│   └── avalant_media.txt   ← ข้อมูลบริษัท
├── images/
│   ├── anu.png
│   └── cat.jpg ...
└── node_modules/
```

## 5. รัน Server

```bash
node server.js
```

## 6. ตรวจสอบสถานะ RAG

เปิด browser ไปที่:
```
http://localhost:3000/status
```

ถ้าพร้อมจะได้:
```json
{ "rag": "ready", "model": "llama3" }
```

## 7. Logic การตอบ

```
User ส่งข้อความ
       ↓
RAG ค้นหาใน avalant_media.txt
       ↓
มีคำตอบ? → ตอบด้วย Ollama AI
ไม่มี?   → ตรวจว่าเป็นชื่อรูปภาพ
               มีรูป? → เพิ่มแกลเลอรี
               ไม่มี? → แจ้ง not found
```

## เปลี่ยน Model

แก้ใน `server.js` บรรทัด CONFIG:

```js
llmModel:       'mistral',   // หรือ llama3, llama2, gemma
embeddingModel: 'nomic-embed-text',
```
