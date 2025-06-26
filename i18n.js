// Internationalization support
const translations = {
    en: {
        title: "llm api test",
        configuration: "Configuration",
        protocol: "Protocol",
        apiUrl: "API URL",
        apiKey: "API Key",
        models: "Models (one per line)",
        prompts: "Custom Prompts (1-5, one per line)",
        rounds: "Test Rounds",
        startTest: "Start Test",
        results: "Results",
        model: "Model",
        prompt: "Prompt",
        round: "Round",
        firstTokenTime: "First Token (ms)",
        outputSpeed: "Output Speed (t/s)",
        result: "Result",
        error: "Error",
        status: "Status",
        footer: "llm api test - Compare and analyze AI model performance",
        testing: "Testing",
        completed: "Completed",
        failed: "Failed",
        clickToExpand: "Click to expand",
        invalidConfig: "Please fill in all required fields",
        testStarted: "Test started",
        testCompleted: "All tests completed",
        noModels: "Please enter at least one model",
        noPrompts: "Please enter at least one prompt",
        maxPrompts: "Maximum 5 prompts allowed",
        showRealTimeViewer: "Show Real-time Viewer",
        hideRealTimeViewer: "Hide Real-time Viewer",
        realtimeViewer: "Real-time Result Viewer",
        resultDetailViewer: "Test Result Detail",
        tokens: "Tokens",
        viewResult: "View Result",
        clickToViewInViewer: "Click to view in real-time viewer",
        clickToViewProgress: "Click to view current progress",
        error: "Error",
        statistics: "Statistics",
        averageFirstToken: "Avg First Token (ms)",
        averageOutputSpeed: "Avg Output Speed (t/s)",
        successRate: "Success Rate",
        history: "History Records",
        showHistory: "Show History",
        clearHistory: "Clear History",
        historyEmpty: "No history records found",
        historyCleared: "History records cleared",
        testDate: "Test Date",
        apiEndpoint: "API Endpoint",
        totalModels: "Total Models",
        totalTests: "Total Tests",
        successfulTests: "Successful Tests"
    },
    zh: {
        title: "AI API 性能测试器",
        configuration: "配置",
        protocol: "协议",
        apiUrl: "API 地址",
        apiKey: "API 密钥",
        models: "模型（每行一个）",
        prompts: "自定义提示词（1-5个，每行一个）",
        rounds: "测试轮数",
        startTest: "开始测试",
        results: "结果",
        model: "模型",
        prompt: "提示词",
        round: "轮次",
        firstTokenTime: "首字响应 (ms)",
        outputSpeed: "输出速度 (t/s)",
        result: "结果",
        error: "异常",
        status: "状态",
        footer: "AI API 性能测试器 - 比较和分析AI模型性能",
        testing: "检测中",
        completed: "完成",
        failed: "失败",
        clickToExpand: "点击展开",
        invalidConfig: "请填写所有必填字段",
        testStarted: "测试已开始",
        testCompleted: "所有测试已完成",
        noModels: "请输入至少一个模型",
        noPrompts: "请输入至少一个提示词",
        maxPrompts: "最多允许5个提示词",
        showRealTimeViewer: "显示实时查看器",
        hideRealTimeViewer: "隐藏实时查看器",
        realtimeViewer: "实时结果查看器",
        resultDetailViewer: "测试结果详情",
        tokens: "令牌数",
        viewResult: "查看结果",
        clickToViewInViewer: "点击在实时查看器中查看",
        clickToViewProgress: "点击查看当前进度",
        error: "错误",
        statistics: "统计信息",
        averageFirstToken: "平均首字响应 (ms)",
        averageOutputSpeed: "平均输出速度 (t/s)",
        successRate: "成功率",
        history: "历史记录",
        showHistory: "显示历史",
        clearHistory: "清除历史",
        historyEmpty: "没有找到历史记录",
        historyCleared: "历史记录已清除",
        testDate: "测试日期",
        apiEndpoint: "API 接口",
        totalModels: "模型总数",
        totalTests: "测试总数",
        successfulTests: "成功测试数"
    },
    fr: {
        title: "Testeur de Performance API IA",
        configuration: "Configuration",
        protocol: "Protocole",
        apiUrl: "URL de l'API",
        apiKey: "Clé API",
        models: "Modèles (un par ligne)",
        prompts: "Invites personnalisées (1-5, une par ligne)",
        rounds: "Tours de test",
        startTest: "Commencer le test",
        results: "Résultats",
        model: "Modèle",
        prompt: "Invite",
        round: "Tour",
        firstTokenTime: "Premier token (ms)",
        outputSpeed: "Vitesse de sortie (t/s)",
        result: "Résultat",
        error: "Erreur",
        status: "Statut",
        footer: "Testeur de Performance API IA - Comparer et analyser les performances des modèles IA",
        testing: "Test en cours",
        completed: "Terminé",
        failed: "Échec",
        clickToExpand: "Cliquer pour développer",
        invalidConfig: "Veuillez remplir tous les champs requis",
        testStarted: "Test commencé",
        testCompleted: "Tous les tests terminés",
        noModels: "Veuillez entrer au moins un modèle",
        noPrompts: "Veuillez entrer au moins une invite",
        maxPrompts: "Maximum 5 invites autorisées"
    },
    ja: {
        title: "AI API パフォーマンステスター",
        configuration: "設定",
        protocol: "プロトコル",
        apiUrl: "API URL",
        apiKey: "API キー",
        models: "モデル（1行に1つ）",
        prompts: "カスタムプロンプト（1-5個、1行に1つ）",
        rounds: "テストラウンド",
        startTest: "テスト開始",
        results: "結果",
        model: "モデル",
        prompt: "プロンプト",
        round: "ラウンド",
        firstTokenTime: "初回トークン (ms)",
        outputSpeed: "出力速度 (t/s)",
        result: "結果",
        error: "エラー",
        status: "ステータス",
        footer: "AI API パフォーマンステスター - AIモデルのパフォーマンスを比較・分析",
        testing: "テスト中",
        completed: "完了",
        failed: "失敗",
        clickToExpand: "クリックして展開",
        invalidConfig: "すべての必須フィールドを入力してください",
        testStarted: "テストが開始されました",
        testCompleted: "すべてのテストが完了しました",
        noModels: "少なくとも1つのモデルを入力してください",
        noPrompts: "少なくとも1つのプロンプトを入力してください",
        maxPrompts: "最大5つのプロンプトまで許可されています"
    },
    de: {
        title: "AI API Leistungstester",
        configuration: "Konfiguration",
        protocol: "Protokoll",
        apiUrl: "API URL",
        apiKey: "API Schlüssel",
        models: "Modelle (eines pro Zeile)",
        prompts: "Benutzerdefinierte Prompts (1-5, eines pro Zeile)",
        rounds: "Test-Runden",
        startTest: "Test starten",
        results: "Ergebnisse",
        model: "Modell",
        prompt: "Prompt",
        round: "Runde",
        firstTokenTime: "Erstes Token (ms)",
        outputSpeed: "Ausgabegeschwindigkeit (t/s)",
        result: "Ergebnis",
        error: "Fehler",
        status: "Status",
        footer: "AI API Leistungstester - Vergleichen und analysieren Sie AI-Modell-Leistung",
        testing: "Testen",
        completed: "Abgeschlossen",
        failed: "Fehlgeschlagen",
        clickToExpand: "Klicken zum Erweitern",
        invalidConfig: "Bitte füllen Sie alle erforderlichen Felder aus",
        testStarted: "Test gestartet",
        testCompleted: "Alle Tests abgeschlossen",
        noModels: "Bitte geben Sie mindestens ein Modell ein",
        noPrompts: "Bitte geben Sie mindestens einen Prompt ein",
        maxPrompts: "Maximal 5 Prompts erlaubt"
    },
    es: {
        title: "Probador de Rendimiento API IA",
        configuration: "Configuración",
        protocol: "Protocolo",
        apiUrl: "URL de la API",
        apiKey: "Clave API",
        models: "Modelos (uno por línea)",
        prompts: "Prompts personalizados (1-5, uno por línea)",
        rounds: "Rondas de prueba",
        startTest: "Iniciar prueba",
        results: "Resultados",
        model: "Modelo",
        prompt: "Prompt",
        round: "Ronda",
        firstTokenTime: "Primer token (ms)",
        outputSpeed: "Velocidad de salida (t/s)",
        result: "Resultado",
        error: "Error",
        status: "Estado",
        footer: "Probador de Rendimiento API IA - Comparar y analizar el rendimiento de modelos IA",
        testing: "Probando",
        completed: "Completado",
        failed: "Fallido",
        clickToExpand: "Hacer clic para expandir",
        invalidConfig: "Por favor complete todos los campos requeridos",
        testStarted: "Prueba iniciada",
        testCompleted: "Todas las pruebas completadas",
        noModels: "Por favor ingrese al menos un modelo",
        noPrompts: "Por favor ingrese al menos un prompt",
        maxPrompts: "Máximo 5 prompts permitidos"
    },
    ar: {
        title: "مختبر أداء واجهة برمجة تطبيقات الذكاء الاصطناعي",
        configuration: "التكوين",
        protocol: "البروتوكول",
        apiUrl: "رابط واجهة برمجة التطبيقات",
        apiKey: "مفتاح واجهة برمجة التطبيقات",
        models: "النماذج (واحد في كل سطر)",
        prompts: "المطالبات المخصصة (1-5، واحدة في كل سطر)",
        rounds: "جولات الاختبار",
        startTest: "بدء الاختبار",
        results: "النتائج",
        model: "النموذج",
        prompt: "المطالبة",
        round: "الجولة",
        firstTokenTime: "الرمز الأول (مللي ثانية)",
        outputSpeed: "سرعة الإخراج (ر/ث)",
        result: "النتيجة",
        error: "خطأ",
        status: "الحالة",
        footer: "مختبر أداء واجهة برمجة تطبيقات الذكاء الاصطناعي - مقارنة وتحليل أداء نماذج الذكاء الاصطناعي",
        testing: "جاري الاختبار",
        completed: "مكتمل",
        failed: "فشل",
        clickToExpand: "انقر للتوسيع",
        invalidConfig: "يرجى ملء جميع الحقول المطلوبة",
        testStarted: "بدأ الاختبار",
        testCompleted: "اكتملت جميع الاختبارات",
        noModels: "يرجى إدخال نموذج واحد على الأقل",
        noPrompts: "يرجى إدخال مطالبة واحدة على الأقل",
        maxPrompts: "الحد الأقصى 5 مطالبات مسموح"
    }
};

class I18n {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && translations[langParam]) {
            return langParam;
        }

        // Check localStorage
        const savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            return browserLang;
        }

        // Default to English
        return 'en';
    }

    init() {
        this.updateLanguageSelector();
        this.updateTexts();
        this.updateDirection();
        this.setupEventListeners();
    }

    updateLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = this.currentLanguage;
        }
    }

    updateTexts() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
                element.textContent = translations[this.currentLanguage][key];
            }
        });

        // Update page title
        document.title = translations[this.currentLanguage].title;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', translations[this.currentLanguage].footer);
        }
    }

    updateDirection() {
        // Set text direction for RTL languages
        if (this.currentLanguage === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', this.currentLanguage);
        }
    }

    setupEventListeners() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    changeLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.updateTexts();
            this.updateDirection();
            
            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.replaceState({}, '', url);
        }
    }

    t(key) {
        return translations[this.currentLanguage][key] || translations.en[key] || key;
    }
}

// Initialize i18n when DOM is loaded
let i18n;
document.addEventListener('DOMContentLoaded', () => {
    i18n = new I18n();
});