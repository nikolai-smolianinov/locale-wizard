export interface TranslationConfig {
    sourceLocale: string;
    targetLocales: string[];
    sourcePath: string;
    outputPath: string;
}

export class LocaleWizard {
    constructor(private config?: TranslationConfig) {}

    async translate(): Promise<void> {
        // Здесь будет основная логика перевода
        console.log('Not implemented');
    }
}