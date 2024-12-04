```bash
npm install locale-wizard
```

## Usage

```typescript
import { LocaleWizard } from 'locale-wizard';

const wizard = new LocaleWizard({
sourceLocale: 'en',
targetLocales: ['ru', 'es'],
sourcePath: './locales/en',
outputPath: './locales'
});

await wizard.translate();
```

## License

MIT