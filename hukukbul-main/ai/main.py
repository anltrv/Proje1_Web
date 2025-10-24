from fastapi import FastAPI
from pydantic import BaseModel
import os, httpx

app = FastAPI()

# Provider config via ENV
PROVIDER = os.getenv("LLM_PROVIDER", "").lower()           # "openai" | "openrouter" | "" (vllm/openai-compatible)
API_BASE = os.getenv("LLM_API_BASE", "").rstrip("/")       # e.g. http(s)://vllm:8001/v1  or https://api.openai.com/v1
API_KEY  = os.getenv("LLM_API_KEY", "")                    # if needed
MODEL    = os.getenv("LLM_MODEL", "gpt-4o-mini")           # default; override per provider

HEADERS = {"Content-Type": "application/json"}
if API_KEY:
    HEADERS["Authorization"] = f"Bearer {API_KEY}"

class Ask(BaseModel):
    query: str
    mode: str | None = "halk"

SYSTEM_HALK = (
    "Sen HukukBul adlı yardımcı asistanısın. Türkçe, sade ve anlaşılır konuş."
    " Mevzuat ve Yargıtay emsal kararlarına atıf yapmaya özen göster."
    " Kaynak vermeden kesin hüküm verme; emin değilsen 'bilgi yetersiz' de."
)
SYSTEM_PRO = (
    "Sen HukukBul profesyonel modundasın. Kısa özet + kaynaklı teknik açıklama üret."
    " Maddeleri (md./fıkra) ve E./K. bilgileriyle referansla."
)

def build_messages(query: str, mode: str | None):
    system = SYSTEM_PRO if (mode or "").lower() == "pro" else SYSTEM_HALK
    return [
        {"role":"system","content":system},
        {"role":"user","content":query}
    ]

async def call_openai_compatible(messages: list[dict], model: str):
    # Expect: OpenAI-compatible /v1/chat/completions endpoint
    url = f"{API_BASE}/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.2,
    }
    async with httpx.AsyncClient(timeout=60) as client:
        r = await client.post(url, headers=HEADERS, json=payload)
        r.raise_for_status()
        data = r.json()
        content = data["choices"][0]["message"]["content"]
        return content

@app.post("/answer")
async def answer(payload: Ask):
    # SELECT PROVIDER
    messages = build_messages(payload.query, payload.mode)

    # If no provider specified but API_BASE set, still try compatible
    if PROVIDER in ("openai","openrouter") or API_BASE:
        try:
            text = await call_openai_compatible(messages, MODEL)
            return {"answer": text, "sources": []}
        except Exception as e:
            return {"answer": f"Üzgünüm, model isteği başarısız: {e}", "sources": []}

    # Fallback (mock) if nothing configured
    return {
        "answer": f"(mock) '{payload.query}' sorusuna geçici yanıt. LLM yapılandırıldığında gerçek yanıt dönecek.",
        "sources": []
    }
