// Internationalization support
const translations = {
    en: {
        title: "llm api test",
        toolDescription: "Compare performance across multiple AI model API providers and models with comprehensive testing and analytics.",
        configuration: "Configuration",
        protocol: "Protocol",
        apiUrl: "API URL",
        apiKey: "API Key",
        models: "Models (one per line)",
        prompts: "Custom Prompts (one per line)",
        rounds: "Test Rounds",
        startTest: "Start Test",
        results: "Results",
        model: "Model",
        prompt: "Prompt",
        round: "Round",
        firstTokenTime: "First Token (ms)",
        firstTokenTooltip: "Time from request start to receiving the first token of the response",
        outputSpeed: "Output Speed (t/s)",
        outputSpeedTooltip: "Rate of token generation measured in tokens per second (TPS). Higher values indicate faster text generation",
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
        
        // Performance Metrics Explanation
        metricsExplanation: "Performance Metrics Explanation",
        firstTokenTitle: "First Token",
        firstTokenDesc: "Time from request sent to receiving the first token of the response. Lower values indicate faster response initiation.",
        outputSpeedTitle: "Output Speed",
        outputSpeedDesc: "Rate of token generation measured in tokens per second (TPS). Higher values indicate faster text generation.",
        totalTimeTitle: "Total Time",
        totalTimeDesc: "Complete duration from request initiation to response completion. Includes network latency and processing time.",
        throughputTitle: "Throughput",
        throughputDesc: "Overall processing efficiency measured as total tokens divided by total time. Indicates model's sustained performance.",
        latencyTitle: "Latency",
        latencyDesc: "Network and processing delay before response begins. Critical for real-time applications and user experience.",
        reliabilityTitle: "Reliability",
        reliabilityDesc: "Success rate and consistency of API responses. Higher reliability indicates more stable service performance.",
        historyCleared: "History records cleared",
        testDate: "Test Date",
        apiEndpoint: "API Endpoint",
        totalModels: "Total Models",
        totalTests: "Total Tests",
        successfulTests: "Successful Tests",
        record: "Record",
        tokensPerSecond: "tokens/s",
        confirmClearHistory: "Are you sure you want to clear all history records? This action cannot be undone."
    },
    zh: {
        title: "AI API 性能测试器",
        toolDescription: "对比多个AI模型API提供商和模型的性能，提供全面的测试和分析。",
        configuration: "配置",
        protocol: "协议",
        apiUrl: "API 地址",
        apiKey: "API 密钥",
        models: "模型（每行一个）",
        prompts: "自定义提示词（每行一个）",
        rounds: "测试轮数",
        startTest: "开始测试",
        results: "结果",
        model: "模型",
        prompt: "提示词",
        round: "轮次",
        firstTokenTime: "首字响应 (ms)",
        firstTokenTooltip: "从请求开始到接收到响应第一个token的时间",
        outputSpeed: "输出速度 (t/s)",
        outputSpeedTooltip: "令牌生成速率，以每秒令牌数(TPS)衡量。数值越高表示文本生成越快",
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
        
        // 性能指标解释
        metricsExplanation: "性能指标解释",
        firstTokenTitle: "首字响应",
        firstTokenDesc: "从发送请求到接收到响应第一个令牌的时间。数值越低表示响应启动越快。",
        outputSpeedTitle: "输出速度",
        outputSpeedDesc: "令牌生成速率，以每秒令牌数(TPS)衡量。数值越高表示文本生成越快。",
        totalTimeTitle: "总耗时",
        totalTimeDesc: "从请求发起到响应完成的完整持续时间。包括网络延迟和处理时间。",
        throughputTitle: "吞吐量",
        throughputDesc: "整体处理效率，以总令牌数除以总时间衡量。表示模型的持续性能。",
        latencyTitle: "延迟",
        latencyDesc: "响应开始前的网络和处理延迟。对实时应用和用户体验至关重要。",
        reliabilityTitle: "可靠性",
        reliabilityDesc: "API响应的成功率和一致性。可靠性越高表示服务性能越稳定。",
        historyCleared: "历史记录已清除",
        testDate: "测试日期",
        apiEndpoint: "API 接口",
        totalModels: "模型总数",
        totalTests: "测试总数",
        successfulTests: "成功测试数",
        record: "记录",
        tokensPerSecond: "令牌/秒",
        confirmClearHistory: "您确定要清除所有历史记录吗？此操作无法撤销。"
    },
    fr: {
        title: "Testeur de Performance API IA",
        toolDescription: "Comparez les performances de plusieurs fournisseurs d'API et modèles IA avec des tests et analyses complets.",
        configuration: "Configuration",
        protocol: "Protocole",
        apiUrl: "URL de l'API",
        apiKey: "Clé API",
        models: "Modèles (un par ligne)",
        prompts: "Invites personnalisées (une par ligne)",
        rounds: "Tours de test",
        startTest: "Commencer le test",
        results: "Résultats",
        model: "Modèle",
        prompt: "Invite",
        round: "Tour",
        firstTokenTime: "Premier token (ms)",
        firstTokenTooltip: "Temps depuis le début de la requête jusqu'à la réception du premier token de la réponse",
        outputSpeed: "Vitesse de sortie (t/s)",
        outputSpeedTooltip: "Taux de génération de tokens mesuré en tokens par seconde (TPS). Des valeurs plus élevées indiquent une génération de texte plus rapide",
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

        showRealTimeViewer: "Afficher le visualiseur en temps réel",
        hideRealTimeViewer: "Masquer le visualiseur en temps réel",
        realtimeViewer: "Visualiseur de résultats en temps réel",
        resultDetailViewer: "Détail des résultats de test",
        tokens: "Jetons",
        viewResult: "Voir le résultat",
        clickToViewInViewer: "Cliquer pour voir dans le visualiseur en temps réel",
        clickToViewProgress: "Cliquer pour voir le progrès actuel",
        statistics: "Statistiques",
        averageFirstToken: "Premier jeton moyen (ms)",
        averageOutputSpeed: "Vitesse de sortie moyenne (j/s)",
        successRate: "Taux de réussite",
        history: "Historique des enregistrements",
        showHistory: "Afficher l'historique",
        clearHistory: "Effacer l'historique",
        historyEmpty: "Aucun enregistrement d'historique trouvé",
        historyCleared: "Historique des enregistrements effacé",
        testDate: "Date du test",
        apiEndpoint: "Point de terminaison API",
        totalModels: "Total des modèles",
        totalTests: "Total des tests",
        successfulTests: "Tests réussis",
        record: "Enregistrement",
        tokensPerSecond: "jetons/s",
        confirmClearHistory: "Êtes-vous sûr de vouloir effacer tous les enregistrements d'historique ? Cette action ne peut pas être annulée."
    },
    ja: {
        title: "AI API パフォーマンステスター",
        toolDescription: "複数のAIモデルAPIプロバイダーとモデルのパフォーマンスを包括的なテストと分析で比較。",
        configuration: "設定",
        protocol: "プロトコル",
        apiUrl: "API URL",
        apiKey: "API キー",
        models: "モデル（1行に1つ）",
        prompts: "カスタムプロンプト（1行に1つ）",
        rounds: "テストラウンド",
        startTest: "テスト開始",
        results: "結果",
        model: "モデル",
        prompt: "プロンプト",
        round: "ラウンド",
        firstTokenTime: "初回トークン (ms)",
        firstTokenTooltip: "リクエスト開始からレスポンスの最初のトークンを受信するまでの時間",
        outputSpeed: "出力速度 (t/s)",
        outputSpeedTooltip: "1秒あたりのトークン数（TPS）で測定されるトークン生成率。値が高いほどテキスト生成が高速",
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

        showRealTimeViewer: "リアルタイムビューアーを表示",
        hideRealTimeViewer: "リアルタイムビューアーを非表示",
        realtimeViewer: "リアルタイム結果ビューアー",
        resultDetailViewer: "テスト結果詳細",
        tokens: "トークン",
        viewResult: "結果を表示",
        clickToViewInViewer: "リアルタイムビューアーで表示するにはクリック",
        clickToViewProgress: "現在の進行状況を表示するにはクリック",
        statistics: "統計",
        averageFirstToken: "平均初回トークン (ms)",
        averageOutputSpeed: "平均出力速度 (t/s)",
        successRate: "成功率",
        history: "履歴記録",
        showHistory: "履歴を表示",
        clearHistory: "履歴をクリア",
        historyEmpty: "履歴記録が見つかりません",
        historyCleared: "履歴記録がクリアされました",
        testDate: "テスト日",
        apiEndpoint: "APIエンドポイント",
        totalModels: "総モデル数",
        totalTests: "総テスト数",
        successfulTests: "成功テスト数",
        record: "記録",
        tokensPerSecond: "トークン/秒",
        confirmClearHistory: "すべての履歴記録をクリアしてもよろしいですか？この操作は元に戻せません。"
    },
    de: {
        title: "AI API Leistungstester",
        toolDescription: "Vergleichen Sie die Leistung mehrerer KI-Modell-API-Anbieter und Modelle mit umfassenden Tests und Analysen.",
        configuration: "Konfiguration",
        protocol: "Protokoll",
        apiUrl: "API URL",
        apiKey: "API Schlüssel",
        models: "Modelle (eines pro Zeile)",
        prompts: "Benutzerdefinierte Prompts (einer pro Zeile)",
        rounds: "Test-Runden",
        startTest: "Test starten",
        results: "Ergebnisse",
        model: "Modell",
        prompt: "Prompt",
        round: "Runde",
        firstTokenTime: "Erstes Token (ms)",
        firstTokenTooltip: "Zeit vom Anfrage-Start bis zum Empfang des ersten Tokens der Antwort",
        outputSpeed: "Ausgabegeschwindigkeit (t/s)",
        outputSpeedTooltip: "Token-Generierungsrate gemessen in Tokens pro Sekunde (TPS). Höhere Werte zeigen schnellere Textgenerierung an",
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

        showRealTimeViewer: "Echtzeit-Viewer anzeigen",
        hideRealTimeViewer: "Echtzeit-Viewer ausblenden",
        realtimeViewer: "Echtzeit-Ergebnis-Viewer",
        resultDetailViewer: "Testergebnis-Details",
        tokens: "Token",
        viewResult: "Ergebnis anzeigen",
        clickToViewInViewer: "Klicken Sie, um im Echtzeit-Viewer anzuzeigen",
        clickToViewProgress: "Klicken Sie, um den aktuellen Fortschritt anzuzeigen",
        statistics: "Statistiken",
        averageFirstToken: "Durchschn. erstes Token (ms)",
        averageOutputSpeed: "Durchschn. Ausgabegeschwindigkeit (t/s)",
        successRate: "Erfolgsrate",
        history: "Verlaufsdatensätze",
        showHistory: "Verlauf anzeigen",
        clearHistory: "Verlauf löschen",
        historyEmpty: "Keine Verlaufsdatensätze gefunden",
        historyCleared: "Verlaufsdatensätze gelöscht",
        testDate: "Testdatum",
        apiEndpoint: "API-Endpunkt",
        totalModels: "Gesamtmodelle",
        totalTests: "Gesamttests",
        successfulTests: "Erfolgreiche Tests",
        record: "Datensatz",
        tokensPerSecond: "Token/s",
        confirmClearHistory: "Sind Sie sicher, dass Sie alle Verlaufsdatensätze löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden."
    },
    es: {
        title: "Probador de Rendimiento API IA",
        toolDescription: "Compare el rendimiento de múltiples proveedores de API y modelos de IA con pruebas y análisis integrales.",
        configuration: "Configuración",
        protocol: "Protocolo",
        apiUrl: "URL de la API",
        apiKey: "Clave API",
        models: "Modelos (uno por línea)",
        prompts: "Prompts personalizados (uno por línea)",
        rounds: "Rondas de prueba",
        startTest: "Iniciar prueba",
        results: "Resultados",
        model: "Modelo",
        prompt: "Prompt",
        round: "Ronda",
        firstTokenTime: "Primer token (ms)",
        firstTokenTooltip: "Tiempo desde el inicio de la solicitud hasta recibir el primer token de la respuesta",
        outputSpeed: "Velocidad de salida (t/s)",
        outputSpeedTooltip: "Tasa de generación de tokens medida en tokens por segundo (TPS). Valores más altos indican generación de texto más rápida",
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

        showRealTimeViewer: "Mostrar visor en tiempo real",
        hideRealTimeViewer: "Ocultar visor en tiempo real",
        realtimeViewer: "Visor de resultados en tiempo real",
        resultDetailViewer: "Detalle de resultados de prueba",
        tokens: "Tokens",
        viewResult: "Ver resultado",
        clickToViewInViewer: "Hacer clic para ver en el visor en tiempo real",
        clickToViewProgress: "Hacer clic para ver el progreso actual",
        statistics: "Estadísticas",
        averageFirstToken: "Primer token promedio (ms)",
        averageOutputSpeed: "Velocidad de salida promedio (t/s)",
        successRate: "Tasa de éxito",
        history: "Registros de historial",
        showHistory: "Mostrar historial",
        clearHistory: "Limpiar historial",
        historyEmpty: "No se encontraron registros de historial",
        historyCleared: "Registros de historial limpiados",
        testDate: "Fecha de prueba",
        apiEndpoint: "Punto final de API",
        totalModels: "Total de modelos",
        totalTests: "Total de pruebas",
        successfulTests: "Pruebas exitosas",
        record: "Registro",
        tokensPerSecond: "tokens/s",
        confirmClearHistory: "¿Está seguro de que desea limpiar todos los registros de historial? Esta acción no se puede deshacer."
    },
    ar: {
        title: "مختبر أداء واجهة برمجة تطبيقات الذكاء الاصطناعي",
        toolDescription: "قارن أداء مقدمي واجهات برمجة التطبيقات ونماذج الذكاء الاصطناعي المتعددة مع اختبارات وتحليلات شاملة.",
        configuration: "التكوين",
        protocol: "البروتوكول",
        apiUrl: "رابط واجهة برمجة التطبيقات",
        apiKey: "مفتاح واجهة برمجة التطبيقات",
        models: "النماذج (واحد في كل سطر)",
        prompts: "المطالبات المخصصة (واحدة في كل سطر)",
        rounds: "جولات الاختبار",
        startTest: "بدء الاختبار",
        results: "النتائج",
        model: "النموذج",
        prompt: "المطالبة",
        round: "الجولة",
        firstTokenTime: "الرمز الأول (مللي ثانية)",
        firstTokenTooltip: "الوقت من بداية الطلب إلى استقبال أول رمز من الاستجابة",
        outputSpeed: "سرعة الإخراج (ر/ث)",
        outputSpeedTooltip: "معدل توليد الرموز مقاساً بالرموز في الثانية (RPS). القيم الأعلى تشير إلى توليد نص أسرع",
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

        showRealTimeViewer: "إظهار العارض في الوقت الفعلي",
        hideRealTimeViewer: "إخفاء العارض في الوقت الفعلي",
        realtimeViewer: "عارض النتائج في الوقت الفعلي",
        resultDetailViewer: "تفاصيل نتائج الاختبار",
        tokens: "الرموز",
        viewResult: "عرض النتيجة",
        clickToViewInViewer: "انقر للعرض في العارض في الوقت الفعلي",
        clickToViewProgress: "انقر لعرض التقدم الحالي",
        statistics: "الإحصائيات",
        averageFirstToken: "متوسط الرمز الأول (مللي ثانية)",
        averageOutputSpeed: "متوسط سرعة الإخراج (ر/ث)",
        successRate: "معدل النجاح",
        history: "سجلات التاريخ",
        showHistory: "إظهار التاريخ",
        clearHistory: "مسح التاريخ",
        historyEmpty: "لم يتم العثور على سجلات تاريخ",
        historyCleared: "تم مسح سجلات التاريخ",
        testDate: "تاريخ الاختبار",
        apiEndpoint: "نقطة نهاية واجهة برمجة التطبيقات",
        totalModels: "إجمالي النماذج",
        totalTests: "إجمالي الاختبارات",
        successfulTests: "الاختبارات الناجحة",
        record: "سجل",
        tokensPerSecond: "رموز/ث",
        confirmClearHistory: "هل أنت متأكد من أنك تريد مسح جميع سجلات التاريخ؟ لا يمكن التراجع عن هذا الإجراء."
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
        
        // Update tooltip titles
        const tooltipElements = document.querySelectorAll('[data-i18n-title]');
        tooltipElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
                element.title = translations[this.currentLanguage][key];
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