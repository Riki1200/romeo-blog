const formatDate = (date: string, locale = 'zh-TW') => {
  //locales from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

  //get current locale from browser

  const now = new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return now;
};

export default formatDate;
