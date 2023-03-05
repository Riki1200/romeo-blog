import { useRegisterActions } from 'kbar';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const useCommandPaletteLocaleActions = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { t } = useTranslation(['common']);

  const changeLocale = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  useRegisterActions(
    [
      {
        id: 'language-english',
        name: 'English',
        keywords: 'locale language translation english',
        perform: () => changeLocale('en'),
        icon: <span className="p-1">🇺🇸</span>,
        parent: 'language',
        section: t('operation'),
      },
      {
        id: 'language-chinese',
        name: 'Spanish',
        keywords: 'locale language translation spanis',
        perform: () => changeLocale('es'),
        icon: <span className="p-1">🇩🇴</span>,
        parent: 'language',
        section: t('operation'),
      },
    ],
    [asPath]
  );
};
