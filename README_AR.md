# أداة اختبار LLM API

**Read this in other languages**: [English](README.md) | [中文](README_CN.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

أداة لاختبار ومقارنة أداء واجهات برمجة التطبيقات المختلفة لنماذج اللغة الكبيرة.

## الميزات

- 🚀 **دعم متعدد لواجهات برمجة التطبيقات**: متوافق مع OpenAI و Google Gemini وواجهات برمجة التطبيقات الرئيسية الأخرى
- ⚡ **اختبار الأداء**: يقيس وقت استجابة الرمز الأول وسرعة الإخراج ومعدل النجاح
- 📊 **تصور البيانات**: عرض في الوقت الفعلي لنتائج الاختبار والإحصائيات
- 🌍 **دعم متعدد اللغات**: متوفر بالإنجليزية والصينية والفرنسية واليابانية والألمانية والإسبانية والعربية
- 📱 **تصميم متجاوب**: يتكيف مع أجهزة سطح المكتب والأجهزة المحمولة
- 💾 **سجلات التاريخ**: حفظ تلقائي لتاريخ الاختبارات مع خيارات تصدير البيانات
- ☁️ **Cloudflare Workers**: يدعم النشر على منصات الحوسبة الطرفية

## البدء السريع

### الإعداد المحلي

1. استنساخ المستودع
```bash
git clone https://github.com/your-username/llm-api-test.git
cd llm-api-test
```

2. بدء خادم محلي
```bash
python -m http.server 8000
```

3. افتح المتصفح وانتقل إلى `http://localhost:8000`

### تكوين واجهة برمجة التطبيقات

1. اختر مزود واجهة برمجة التطبيقات الذي تريد اختباره في منطقة التكوين
2. أدخل مفتاح واجهة برمجة التطبيقات ونقطة النهاية المقابلة
3. تعيين معاملات الاختبار (عدد الجولات، التزامن، إلخ)
4. انقر على زر "بدء الاختبار"

## واجهات برمجة التطبيقات المدعومة

- **OpenAI**: نماذج سلسلة GPT-3.5 و GPT-4
- **Google Gemini**: Gemini Pro و Gemini Pro Vision
- **واجهات برمجة التطبيقات المخصصة**: دعم لواجهات برمجة التطبيقات الأخرى المتوافقة مع تنسيق OpenAI

## النشر

### نشر Cloudflare Workers

1. تثبيت Wrangler CLI
```bash
npm install -g wrangler
```

2. تسجيل الدخول إلى Cloudflare
```bash
wrangler login
```

3. البناء والنشر
```bash
node build-worker.js
wrangler deploy
```

للحصول على تعليمات النشر التفصيلية، يرجى الرجوع إلى [DEPLOYMENT.md](DEPLOYMENT.md)

## هيكل المشروع

```
llm-api-test/
├── index.html          # الصفحة الرئيسية
├── app.js             # منطق التطبيق الرئيسي
├── api-handlers.js    # معالجات واجهة برمجة التطبيقات
├── styles.css         # ورقة الأنماط
├── i18n.js           # تكوين التدويل
├── worker.js         # نص Cloudflare Workers
├── build-worker.js   # نص بناء Workers
└── wrangler.toml     # تكوين Cloudflare
```

## المكدس التقني

- **الواجهة الأمامية**: HTML/CSS/JavaScript الأصلي
- **النشر**: Cloudflare Workers
- **واجهات برمجة التطبيقات**: دعم لواجهات برمجة تطبيقات LLM متعددة
- **التدويل**: دعم متعدد اللغات

## المساهمة

المساهمات مرحب بها! لا تتردد في تقديم Issues و Pull Requests.

1. عمل fork للمشروع
2. إنشاء فرع الميزة الخاص بك (`git checkout -b feature/AmazingFeature`)
3. تنفيذ commit للتغييرات (`git commit -m 'Add some AmazingFeature'`)
4. دفع إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص

رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل