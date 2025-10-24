# HukukBul Platformu

HukukBul, Türkçe hukuk bilgisi arayanlar için hazırlanmış çok katmanlı bir yapay zekâ destekli danışman prototipidir. Ana hedef; kullanıcı sorularını mevzuat ve emsal kararlarla ilişkilendirerek okunabilir cevaplar üretmek ve aynı zamanda profesyonel kullanıcılar için daha teknik çıktıların önünü açmaktır.

## ✨ Öne Çıkanlar
- Next.js tabanlı modern sohbet arayüzü
- Fastify ile hafif API katmanı ve FastAPI ile LLM köprüsü
- vLLM üzerinde çalışan Qwen serisi modeller (varsayılan 1.5B instruct)
- Postgres, Qdrant ve Redis ile hazır veri/embedding altyapı iskeleti
- Docker Compose ile tek komutla ayağa kalkabilen modüler mimari

## Mimari Genel Bakış
```
                +-------------------+
                |   Next.js UI      |
                |   (frontend)      |
                +---------+---------+
                          |
                          v
+-------------------------+-------------------------+
|              Fastify API (api)                    |
+-------------------------+-------------------------+
                          |
                          v
                +-------------------+
                | FastAPI LLM Proxy |
                |      (ai)         |
                +---------+---------+
                          |
                          v
                +-------------------+
                |   vLLM + Qwen     |
                |      (vllm)       |
                +-------------------+
```

Destek servisleri:
- **postgres**: ileride mevzuat verisinin saklanması için hazır
- **qdrant**: vektör arama altyapısı
- **redis**: hızlı cache / kuyruk işlemleri
- **ingest**: henüz iskelet; belge işleme pipeline’ı burada geliştirilecek
- **nginx**: frontend ve API için tek giriş noktası (`http://localhost:8088`)

## Gereksinimler
- Docker ve Docker Compose (GPU erişimi için NVIDIA Container Toolkit)
- Ortalama 8 GB VRAM’li GPU (Qwen 7B için daha fazla gerekebilir)
- İlk çalıştırmada internet bağlantısı (model dosyalarını indirmek için)

## Hızlı Başlangıç
```bash
# servislere yeni başladıysanız
./start.sh

# durum kontrolü
docker compose ps

# log takip (LLM uzun sürede açılabilir)
docker logs -f hukukbul-vllm-1
```

Arayüz: `http://localhost:8088`

API test örneği:
```bash
curl -s \
  -X POST http://localhost:8088/api/ask \
  -H 'Content-Type: application/json' \
  -d '{"query":"Boşanma davasında nafaka nasıl belirlenir?"}'
```

## Yapılandırma İpuçları
- `docker-compose.yml` içinde:
  - `LLM_MODEL` ile farklı Qwen modelleri seçilebilir
  - `--max-model-len`, `--gpu-memory-utilization` gibi argümanlarla GPU kullanımı ayarlanabilir
- `.env` (oluşturulmalı): Postgres kullanıcı adı, şifresi ve portlar için gerekli

### Model Dosyaları
İlk çalıştırmada HuggingFace üzerinden model ağırlıkları `models/hub` klasörüne indirilir. Bu indirmenin her makinede yalnızca bir kez yapılması gerekir; klasör silinirse tekrar indirilir. Büyük modeller için disk alanını kontrol etmeyi unutmayın.

## Geliştirici Akışı
1. **Frontend**: `frontend/app/page.tsx` üzerinde Next.js bileşenleri ile sohbet arayüzü.
2. **API (Node)**: `api/server.js` Fastify ile `/ask` uç noktasını vLLM servisine yönlendirir.
3. **AI Servisi (Python)**: `ai/main.py` gelen soruları LLM’e OpenAI uyumlu istek olarak aktarır.
4. **LLM (vLLM)**: `vllm` servisi GPU üzerinden modeli çalıştırır.
5. **Ingest Pipeline**: `ingest/worker.py` ileride veri toplama ve embedding süreci için hazır bekler.

Güncelleme veya geliştirme sırasında:
```bash
# tek servis yeniden başlatma
docker compose restart api

# logları yakından takip etmek için
docker logs -f hukukbul-ai-1
```

## Sorun Giderme
| Belirti | Muhtemel Sebep | Çözüm |
| --- | --- | --- |
| `/api/ask` yanıtı “All connection attempts failed” | vLLM henüz hazır değil | `docker logs -f hukukbul-vllm-1` ile yükleme sürecini bekleyin |
| vLLM konteyneri GPU belleği hatası ile çıkıyor | Model VRAM’e sığmıyor | `docker-compose.yml` içinde daha küçük model veya daha düşük `--max-model-len` ayarlayın |
| Model her başlatmada yeniden indiriliyor | `models/hub` klasörü silinmiş | Klasörü koruyun veya paylaşılan bir disk kullanın |

## Dizin Yapısı
```
.
├── ai/            # FastAPI tabanlı LLM proxy
├── api/           # Fastify API katmanı
├── frontend/      # Next.js sohbet arayüzü
├── ingest/        # İleride kullanılacak belge pipeline iskeleti
├── models/        # HuggingFace cache (LLM ağırlıkları)
├── deploy/nginx/  # Reverse proxy ayarları
├── docker-compose.yml
├── start.sh / restart.sh
└── README.md
```

## Yol Haritası
- Ingest pipeline’ının tamamlanması ve Qdrant entegrasyonu
- Mevzuat ve emsal karar referanslarının sohbet çıktısına eklenmesi
- Kullanıcı modlarına göre (Halk / Pro) farklı yanıt stratejilerinin zenginleştirilmesi
- Gelişmiş loglama ve gözlemlenebilirlik eklenmesi

---

Sorular veya geri bildirimler için issues açabilir ya da doğrudan proje yöneticisiyle iletişime geçebilirsiniz. Keyifli keşifler! 🚀
