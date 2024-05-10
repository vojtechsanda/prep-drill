const fs = await import("fs");

const LANG_PATH = "./src/lang/messages";

const PRIMARY_LOCALE = "en";
const SECONDARY_LOCALES = ["cs", "sk"];

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = obj[key];
      return sorted;
    }, {});
}

function readTranslations(locale) {
  try {
    return JSON.parse(fs.readFileSync(`${LANG_PATH}/${locale}.json`, "utf8"));
  } catch {
    return {};
  }
}

function writeSortedTranslations(locale, json) {
  const sorted = sortObject(json);

  fs.writeFileSync(
    `${LANG_PATH}/${locale}.json`,
    JSON.stringify(sorted, null, 2) + "\n",
  );
}

function filterObsoleteKeys({ template, withObsoleteKeys }) {
  const templateKeys = Object.keys(template);

  Object.keys(withObsoleteKeys).forEach((key) => {
    if (!templateKeys.includes(key)) {
      delete withObsoleteKeys[key];
    }
  });
}

function clearKeys(obj) {
  const cleared = {};
  Object.keys(obj).forEach((key) => {
    cleared[key] = "";
  });

  return cleared;
}

function main() {
  const primaryTranslations = readTranslations(PRIMARY_LOCALE);
  writeSortedTranslations(PRIMARY_LOCALE, primaryTranslations);

  const emptyPrimaryTranslations = clearKeys(primaryTranslations);

  for (const locale of SECONDARY_LOCALES) {
    let translations = readTranslations(locale);

    filterObsoleteKeys({
      template: primaryTranslations,
      withObsoleteKeys: translations,
    });

    writeSortedTranslations(locale, {
      ...emptyPrimaryTranslations,
      ...translations,
    });
  }
}

main();
