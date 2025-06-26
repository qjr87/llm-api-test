# LLM API Test

أداة لاختبار ومقارنة أداء واجهات برمجة التطبيقات المختلفة لنماذج اللغة الكبيرة.

## الميزات

- **دعم متعدد الواجهات**: متوافق مع واجهة OpenAI وواجهة Google Gemini
- **مقاييس الأداء**: قياس وقت الرمز الأول وسرعة الإخراج
- **اختبار مجمع**: اختبار نماذج ومطالبات متعددة في وقت واحد
- **دعم متعدد اللغات**: متوفر بالإنجليزية والصينية والفرنسية واليابانية والألمانية والإسبانية والعربية
- **نتائج فورية**: عرض مباشر لتقدم الاختبار والنتائج
- **تصميم متجاوب**: يعمل على أجهزة سطح المكتب والأجهزة المحمولة
- **تخزين محلي**: يحفظ إعداداتك تلقائياً

## البدء السريع

### التطوير المحلي

1. استنساخ المستودع:
```bash
git clone https://github.com/qjr87/llm-api-test.git
cd llm-api-test
```

2. تثبيت التبعيات:
```bash
npm install
```

3. بدء خادم التطوير المحلي:
```bash
npm run dev
```

4. افتح متصفحك وزر `http://localhost:8000`

### إعداد واجهة برمجة التطبيقات

1. **واجهات متوافقة مع OpenAI**:
   - رابط الواجهة: `https://api.openai.com/v1/chat/completions`
   - مفتاح الواجهة: مفتاح OpenAI الخاص بك (يبدأ بـ `sk-`)
   - النماذج: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, إلخ.

2. **واجهة Google Gemini**:
   - رابط الواجهة: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - مفتاح الواجهة: مفتاح Google AI الخاص بك
   - النماذج: `gemini-pro`, `gemini-pro-vision`, إلخ.

## الواجهات المدعومة

- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **واجهات متوافقة**: أي نقطة نهاية لواجهة متوافقة مع OpenAI

## النشر

### Cloudflare Workers

1. بناء العامل:
```bash
npm run build
```

2. النشر على Cloudflare Workers:
```bash
npm run deploy
```

3. تكوين نطاقك المخصص (اختياري)

## هيكل المشروع

```
llm-api-test/
├── index.html          # ملف HTML الرئيسي
├── app.js             # منطق التطبيق
├── api-handlers.js    # فئات معالجة الواجهات
├── styles.css         # التنسيق
├── i18n.js           # التدويل
├── worker.js         # سكريبت Cloudflare Worker
├── worker-complete.js # عامل كامل مع الأصول المدمجة
├── build-worker.js   # سكريبت البناء
├── package.json      # التبعيات والسكريبتات
├── wrangler.toml     # إعداد Cloudflare Workers
└── README.md         # التوثيق
```

## المكدس التقني

- **الواجهة الأمامية**: Vanilla JavaScript, HTML5, CSS3
- **النشر**: Cloudflare Workers
- **أدوات البناء**: Node.js, Wrangler CLI
- **الواجهات**: واجهة OpenAI، واجهة Google Gemini

## المساهمة

1. عمل fork للمستودع
2. إنشاء فرع الميزة الخاص بك (`git checkout -b feature/amazing-feature`)
3. تأكيد تغييراتك (`git commit -m 'Add some amazing feature'`)
4. دفع إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## التواصل

- GitHub: [@qjr87](https://github.com/qjr87)
- رابط المشروع: [https://github.com/qjr87/llm-api-test](https://github.com/qjr87/llm-api-test)

---

**ملاحظة**: هذه الأداة مخصصة لأغراض الاختبار والمقارنة. يرجى التأكد من الامتثال لشروط خدمة الواجهات التي تختبرها.