// Internationalization (i18n) support
const i18n = {
    currentLanguage: 'en',
    
    translations: {
        en: {
            title: 'llm api test',
            configuration: 'Configuration',
            protocol: 'Protocol',
            apiUrl: 'API URL',
            apiKey: 'API Key',
            models: 'Models (one per line)',
            prompts: 'Custom Prompts (1-5, one per line)',
            rounds: 'Test Rounds',
            startTest: 'Start Test',
            results: 'Results',
            model: 'Model',
            prompt: 'Prompt',
            round: 'Round',
            firstTokenTime: 'First Token (ms)',
            outputSpeed: 'Output Speed (t/s)',
            result: 'Result',
            error: 'Error',
            status: 'Status',
            footer: 'llm api test - Compare and analyze AI model performance'
        },
        zh: {
            title: 'llm api test',
            configuration: '配置',
            protocol: '协议',
            apiUrl: 'API 地址',
            apiKey: 'API 密钥',
            models: '模型（每行一个）',
            prompts: '自定义提示词（1-5个，每行一个）',
            rounds: '测试轮数',
            startTest: '开始测试',
            results: '结果',
            model: '模型',
            prompt: '提示词',
            round: '轮次',
            firstTokenTime: '首字符时间 (ms)',
            outputSpeed: '输出速度 (字符/秒)',
            result: '结果',
            error: '错误',
            status: '状态',
            footer: 'llm api test - 比较和分析AI模型性能'
        },
        fr: {
            title: 'llm api test',
            configuration: 'Configuration',
            protocol: 'Protocole',
            apiUrl: 'URL de l\'API',
            apiKey: 'Clé API',
            models: 'Modèles (un par ligne)',
            prompts: 'Invites personnalisées (1-5, une par ligne)',
            rounds: 'Tours de test',
            startTest: 'Commencer le test',
            results: 'Résultats',
            model: 'Modèle',
            prompt: 'Invite',
            round: 'Tour',
            firstTokenTime: 'Premier jeton (ms)',
            outputSpeed: 'Vitesse de sortie (t/s)',
            result: 'Résultat',
            error: 'Erreur',
            status: 'Statut',
            footer: 'llm api test - Comparer et analyser les performances des modèles IA'
        },
        ja: {
            title: 'llm api test',
            configuration: '設定',
            protocol: 'プロトコル',
            apiUrl: 'API URL',
            apiKey: 'API キー',
            models: 'モデル（1行に1つ）',
            prompts: 'カスタムプロンプト（1-5個、1行に1つ）',
            rounds: 'テストラウンド',
            startTest: 'テスト開始',
            results: '結果',
            model: 'モデル',
            prompt: 'プロンプト',
            round: 'ラウンド',
            firstTokenTime: '最初のトークン (ms)',
            outputSpeed: '出力速度 (t/s)',
            result: '結果',
            error: 'エラー',
            status: 'ステータス',
            footer: 'llm api test - AIモデルのパフォーマンスを比較・分析'
        },
        de: {
            title: 'llm api test',
            configuration: 'Konfiguration',
            protocol: 'Protokoll',
            apiUrl: 'API-URL',
            apiKey: 'API-Schlüssel',
            models: 'Modelle (eines pro Zeile)',
            prompts: 'Benutzerdefinierte Eingabeaufforderungen (1-5, eine pro Zeile)',
            rounds: 'Testrunden',
            startTest: 'Test starten',
            results: 'Ergebnisse',
            model: 'Modell',
            prompt: 'Eingabeaufforderung',
            round: 'Runde',
            firstTokenTime: 'Erstes Token (ms)',
            outputSpeed: 'Ausgabegeschwindigkeit (t/s)',
            result: 'Ergebnis',
            error: 'Fehler',
            status: 'Status',
            footer: 'llm api test - KI-Modell-Performance vergleichen und analysieren'
        },
        es: {
            title: 'llm api test',
            configuration: 'Configuración',
            protocol: 'Protocolo',
            apiUrl: 'URL de la API',
            apiKey: 'Clave de API',
            models: 'Modelos (uno por línea)',
            prompts: 'Indicaciones personalizadas (1-5, una por línea)',
            rounds: 'Rondas de prueba',
            startTest: 'Iniciar prueba',
            results: 'Resultados',
            model: 'Modelo',
            prompt: 'Indicación',
            round: 'Ronda',
            firstTokenTime: 'Primer token (ms)',
            outputSpeed: 'Velocidad de salida (t/s)',
            result: 'Resultado',
            error: 'Error',
            status: 'Estado',
            footer: 'llm api test - Comparar y analizar el rendimiento de modelos de IA'
        },
        ar: {
            title: 'llm api test',
            configuration: 'التكوين',
            protocol: 'البروتوكول',
            apiUrl: 'رابط API',
            apiKey: 'مفتاح API',
            models: 'النماذج (واحد في كل سطر)',
            prompts: 'المطالبات المخصصة (1-5، واحدة في كل سطر)',
            rounds: 'جولات الاختبار',
            startTest: 'بدء الاختبار',
            results: 'النتائج',
            model: 'النموذج',
            prompt: 'المطالبة',
            round: 'الجولة',
            firstTokenTime: 'أول رمز (ms)',
            outputSpeed: 'سرعة الإخراج (t/s)',
            result: 'النتيجة',
            error: 'خطأ',
            status: 'الحالة',
            footer: 'llm api test - مقارنة وتحليل أداء نماذج الذكاء الاصطناعي'
        }
    },
    
    init() {
        this.updateContent();
    },
    
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            this.updateContent();
            
            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.replaceState({}, '', url);
            
            // Update HTML lang attribute
            document.documentElement.lang = lang;
            
            // Update direction for RTL languages
            if (lang === 'ar') {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = 'ltr';
            }
        }
    },
    
    t(key) {
        return this.translations[this.currentLanguage]?.[key] || 
               this.translations['en'][key] || 
               key;
    },
    
    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update page title
        document.title = this.t('title') + ' - Test LLM APIs Speed & Quality';
    }
};